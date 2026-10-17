# Run locally with GitHub CLI. Nothing is sent to OpenAI by this script.
[CmdletBinding()]
param(
    [string]$Owner = 'FatemehKare1',
    [ValidateSet('private', 'public', 'all')][string]$Visibility = 'private',
    [string[]]$Repository = @(),
    [switch]$OpenReport,
    [string]$OutputDirectory = (Join-Path $env:TEMP ('portfolio-repos-' + [guid]::NewGuid().ToString('N'))),
    [ValidateRange(1, 30)][int]$MaxDocumentationFiles = 8,
    [ValidateRange(1, 20)][int]$MaxSourceFiles = 6,
    [ValidateRange(1000, 100000)][int]$MaxTextCharacters = 24000
)

$ErrorActionPreference = 'Stop'
if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
    throw 'Install GitHub CLI first: winget install --id GitHub.cli'
}
if ($Owner -notmatch '^[a-zA-Z0-9-]+$') { throw 'Owner must be a GitHub username or organization name.' }
$excluded = @('lumacue', 'exhibition-registration-platform')

function Invoke-GhJson {
    param([string[]]$Arguments)
    # Windows PowerShell treats native stderr as errors, even for optional 404s.
    $previousPreference = $ErrorActionPreference
    try {
        $ErrorActionPreference = 'Continue'
        $responseLines = & gh @Arguments 2>$null
        $commandExitCode = $LASTEXITCODE
    } finally { $ErrorActionPreference = $previousPreference }
    if ($commandExitCode -ne 0) { throw 'GitHub request failed (missing resource, insufficient access, or network/API limit).' }
    ConvertFrom-Json -InputObject ($responseLines -join "`n")
}

function Get-ApiJson {
    param([string]$Path)
    Invoke-GhJson -Arguments @('api', '--hostname', 'github.com', '--method', 'GET', $Path)
}

function Get-TextContent {
    param($Content)
    if ($Content.encoding -ne 'base64' -or -not $Content.content) { return '' }
    [Text.Encoding]::UTF8.GetString([Convert]::FromBase64String(($Content.content -replace '\s', '')))
}

function Limit-Text {
    param([string]$Text)
    if ($Text.Length -gt $MaxTextCharacters) { return $Text.Substring(0, $MaxTextCharacters) }
    return $Text
}

function Get-CleanHtmlText {
    param([string]$Text)
    [Net.WebUtility]::HtmlDecode(($Text -replace '<[^>]+>', ' ' -replace '\s+', ' ')).Trim()
}

function Get-SourceOverview {
    param([string]$Text, [string]$Path)
    $patterns = if ($Path -match '\.py$') {
        @('(?m)^\s*(?:async\s+)?(?:def|class)\s+([\w]+)', '(?m)^\s*(?:from|import)\s+([\w.]+)')
    } else {
        @('(?m)\b(?:function|class|interface|type)\s+([A-Za-z_$][\w$]*)', '(?m)\b(?:export\s+)?const\s+([A-Za-z_$][\w$]*)\s*=', '(?m)\bfrom\s+[''"]([^''"]+)[''"]')
    }
    $symbols = @($patterns[0..($patterns.Count - 2)] | ForEach-Object {
        [regex]::Matches($Text, $_) | ForEach-Object { $_.Groups[1].Value }
    } | Select-Object -Unique -First 50)
    $imports = @([regex]::Matches($Text, $patterns[-1]) | ForEach-Object { $_.Groups[1].Value } | Select-Object -Unique -First 40)
    [PSCustomObject]@{ path = $Path; declaredSymbols = $symbols; imports = $imports }
}

# Keep exports separate from the static website. This does not alter GitHub repositories.
$previousConsoleEncoding = [Console]::OutputEncoding
try {
    [Console]::OutputEncoding = New-Object Text.UTF8Encoding
    $listArguments = @('repo', 'list', $Owner, '--limit', '1000', '--json', 'name,nameWithOwner,description,primaryLanguage,isPrivate,isArchived,homepageUrl,createdAt,pushedAt,defaultBranchRef')
    if ($Visibility -ne 'all') { $listArguments += @('--visibility', $Visibility) }
    try { $repositoryList = Invoke-GhJson -Arguments $listArguments }
    catch { throw 'Cannot list repositories. Run gh auth login --hostname github.com --web in your terminal, then retry. Check account access if already signed in.' }
    # Assign first, then pipe: ConvertFrom-Json does not enumerate its top-level array in PowerShell 5.1.
    $selectedRepos = @($repositoryList | Where-Object {
        $_.name -notin $excluded -and ($Repository.Count -eq 0 -or $_.name -in $Repository)
    } | Sort-Object name)
    if ($selectedRepos.Count -eq 0) { throw 'No matching repositories were found. Check the owner, visibility, and repository names.' }

    $allDetails = New-Object 'System.Collections.Generic.List[object]'
    foreach ($repo in $selectedRepos) {
        Write-Host ('Reading {0} ...' -f $repo.name)
        $repoBase = 'repos/' + $Owner + '/' + [Uri]::EscapeDataString($repo.name)
        $notes = New-Object 'System.Collections.Generic.List[string]'
        $metadata = $null
        $readme = $null
        $tree = $null
        $languageDetails = @()
        try { $metadata = Get-ApiJson -Path $repoBase }
        catch { $notes.Add('Repository topics and license could not be retrieved.') }
        try {
            $languageData = Get-ApiJson -Path ($repoBase + '/languages')
            $languageEntries = @($languageData.PSObject.Properties)
            $totalBytes = ($languageEntries | Measure-Object -Property Value -Sum).Sum
            $languageDetails = @($languageEntries | Sort-Object Value -Descending | ForEach-Object {
                [PSCustomObject]@{ name = $_.Name; bytes = $_.Value; percent = $(if ($totalBytes -gt 0) { [math]::Round(100 * $_.Value / $totalBytes, 1) } else { 0 }) }
            })
        } catch { $notes.Add('Language breakdown could not be retrieved.') }
        try {
            $readmeData = Get-ApiJson -Path ($repoBase + '/readme')
            $readmeText = Get-TextContent -Content $readmeData
            $readme = [PSCustomObject]@{ path = $readmeData.path; text = (Limit-Text $readmeText); truncated = ($readmeText.Length -gt $MaxTextCharacters) }
        } catch { $notes.Add('No accessible README was found.') }

        $branch = if ($repo.defaultBranchRef.name) { $repo.defaultBranchRef.name } elseif ($metadata.default_branch) { $metadata.default_branch } else { $null }
        if ($branch) {
            try { $tree = Get-ApiJson -Path ($repoBase + '/git/trees/' + [Uri]::EscapeDataString($branch) + '?recursive=1') }
            catch { $notes.Add('The file tree could not be retrieved (the repository may be empty).') }
        }
        # Do not fetch environment files, keys, credentials, datasets, or generated/vendor files.
        $files = @($tree.tree | Where-Object {
            $_.type -eq 'blob' -and $_.mode -ne '120000' -and
            $_.path -notmatch '(?i)(^|/)(node_modules|vendor|dist|build|\.git|\.venv|venv|__pycache__|\.aws|\.ssh|\.next)(/|$)' -and
            $_.path -notmatch '(?i)(^|/)(\.env[^/]*|[^/]*(?:secret|credential|private[_-]?key)[^/]*)(/|$)' -and
            $_.path -notmatch '(?i)\.(pem|key|p12|pfx)$'
        } | Sort-Object path)
        if ($tree.truncated) { $notes.Add('GitHub returned a truncated file tree; the inventory is partial.') }

        $docs = New-Object 'System.Collections.Generic.List[object]'
        $dependencies = New-Object 'System.Collections.Generic.List[object]'
        $sourceOverviews = New-Object 'System.Collections.Generic.List[object]'
        $htmlOverviews = New-Object 'System.Collections.Generic.List[object]'
        $docFiles = @($files | Where-Object {
            $_.path -ne $readme.path -and $_.size -le 262144 -and
            $_.path -match '(?i)(^|/)(readme[^/]*\.(md|rst|txt)|(?:overview|architecture|features|about|project[-_]brief)[^/]*\.(md|rst|txt))$|(^|/)(docs|documentation)/.*\.(md|rst|txt)$'
        } | Select-Object -First $MaxDocumentationFiles)
        $manifestFiles = @($files | Where-Object { $_.size -le 262144 -and $_.path -match '(?i)(^|/)(package\.json|requirements[^/]*\.txt|pyproject\.toml)$' } | Select-Object -First 12)
        $htmlFiles = @($files | Where-Object { $_.size -le 524288 -and $_.path -match '(?i)\.html?$' } | Sort-Object @{Expression = { if ($_.path -match '(^|/)index\.html$') { 0 } else { 1 } }}, path | Select-Object -First 6)
        $sourceFiles = @($files | Where-Object { $_.size -le 262144 -and $_.path -match '(?i)\.(py|js|jsx|ts|tsx)$' -and $_.path -notmatch '(?i)(\.min\.|\.d\.ts$|(^|/)(test|tests|fixtures)/)' } | Sort-Object @{Expression = { if ($_.path -match '(?i)(^|/)(app|main|index|server|analysis|pipeline)\.') { 0 } else { 1 } }}, path | Select-Object -First $MaxSourceFiles)
        $toRead = @(@($docFiles) + @($manifestFiles) + @($htmlFiles) + @($sourceFiles) | Sort-Object path -Unique)
        foreach ($file in $toRead) {
            try {
                $blob = Get-ApiJson -Path ($repoBase + '/git/blobs/' + $file.sha)
                $text = Get-TextContent -Content $blob
                if ($text.Length -eq 0) { $notes.Add('No readable text: ' + $file.path); continue }
                if ($file.path -in $docFiles.path) {
                    $docs.Add([PSCustomObject]@{ path = $file.path; text = (Limit-Text $text); truncated = ($text.Length -gt $MaxTextCharacters) })
                }
                if ($file.path -in $manifestFiles.path) {
                    $names = @()
                    if ($file.path -match '(?i)package\.json$') {
                        $package = ConvertFrom-Json -InputObject $text
                        $names = @(@($package.dependencies.PSObject.Properties.Name) + @($package.devDependencies.PSObject.Properties.Name) + @($package.peerDependencies.PSObject.Properties.Name) | Where-Object { $_ } | Sort-Object -Unique)
                    } elseif ($file.path -match '(?i)requirements[^/]*\.txt$') {
                        $names = @($text -split '\r?\n' | ForEach-Object {
                            if ($_ -match '^\s*([A-Za-z0-9][A-Za-z0-9._-]*)(?:\[|\s|[<>=!~]|$)') { $matches[1] }
                        } | Sort-Object -Unique)
                    } else {
                        $names = @([regex]::Matches($text, '(?m)^\s*["'']([A-Za-z0-9][A-Za-z0-9._-]*)(?:\[|\s|[<>=!~]|["''])') | ForEach-Object { $_.Groups[1].Value })
                        $names += @([regex]::Matches($text, '(?m)^\s*([A-Za-z0-9][A-Za-z0-9._-]*)\s*=\s*["'']') | ForEach-Object { $_.Groups[1].Value } | Where-Object { $_ -notin @('name', 'version', 'description', 'requires-python', 'build-backend') })
                        $names = @($names | Sort-Object -Unique)
                    }
                    $dependencies.Add([PSCustomObject]@{ path = $file.path; packageNames = $names; extraction = $(if ($file.path -match 'pyproject\.toml$') { 'Heuristic; verify against the manifest.' } else { 'Dependency names only.' }) })
                }
                if ($file.path -in $htmlFiles.path) {
                    # Extract headings instead of exporting HTML source, embedded data, or scripts.
                    $htmlText = $text -replace '(?is)<!--.*?-->|<(script|style)\b[^>]*>.*?</\1>', ''
                    $titleMatch = [regex]::Match($htmlText, '(?is)<title[^>]*>(.*?)</title>')
                    $headings = @([regex]::Matches($htmlText, '(?is)<h[1-3]\b[^>]*>(.*?)</h[1-3]>') | ForEach-Object { Get-CleanHtmlText $_.Groups[1].Value } | Where-Object { $_ } | Select-Object -Unique -First 60)
                    $htmlOverviews.Add([PSCustomObject]@{ path = $file.path; title = (Get-CleanHtmlText $titleMatch.Groups[1].Value); headings = $headings })
                }
                if ($file.path -in $sourceFiles.path) { $sourceOverviews.Add((Get-SourceOverview -Text $text -Path $file.path)) }
            } catch { $notes.Add('Could not read or parse: ' + $file.path) }
        }
        $extensionCounts = @($files | Group-Object { [IO.Path]::GetExtension($_.path).ToLowerInvariant() } | Sort-Object Count -Descending | ForEach-Object {
            [PSCustomObject]@{ extension = $(if ($_.Name) { $_.Name } else { '(no extension)' }); count = $_.Count }
        })
        $allDetails.Add([PSCustomObject][ordered]@{
            name = $repo.name; description = $repo.description; private = $repo.isPrivate; archived = $repo.isArchived
            homepage = $repo.homepageUrl; createdAt = $repo.createdAt; lastPushedAt = $repo.pushedAt; defaultBranch = $branch
            topics = @($metadata.topics | Where-Object { $_ }); license = $metadata.license.spdx_id; primaryLanguage = $repo.primaryLanguage.name
            languages = $languageDetails; readme = $readme; documentation = @($docs.ToArray()); dependencies = @($dependencies.ToArray())
            htmlPages = @($htmlOverviews.ToArray()); sourceOverview = @($sourceOverviews.ToArray())
            fileOverview = [PSCustomObject]@{ count = $files.Count; extensions = $extensionCounts; paths = @($files.path | Select-Object -First 500); pathsLimited = ($files.Count -gt 500); githubTreeTruncated = [bool]$tree.truncated }
            portfolioNotes = [PSCustomObject]@{ yourRole = ''; audienceAndProblem = ''; keyFeatures = ''; outcomes = ''; approvedPublicSummary = '' }
            collectionNotes = @($notes.ToArray())
        })
    }
    New-Item -ItemType Directory -Path $OutputDirectory -Force | Out-Null
    $jsonPath = Join-Path $OutputDirectory 'repo-details.json'
    $reportPath = Join-Path $OutputDirectory 'portfolio-report.md'
    $payload = [PSCustomObject]@{
        owner = $Owner; visibility = $Visibility; exportedAtUtc = [DateTime]::UtcNow.ToString('o'); excludedRepositories = $excluded
        collectionLimits = [PSCustomObject]@{ documentationFilesPerRepo = $MaxDocumentationFiles; sourceFilesPerRepo = $MaxSourceFiles; textCharactersPerDocument = $MaxTextCharacters; repositoryLimit = 1000 }
        repositories = @($allDetails.ToArray())
    }
    $payload | ConvertTo-Json -Depth 15 | Set-Content -LiteralPath $jsonPath -Encoding UTF8
    $report = New-Object Text.StringBuilder
    [void]$report.AppendLine('# Repository evidence for portfolio copy')
    [void]$report.AppendLine('Local review draft. Documentation can include private business information: edit before sharing. This is collected evidence, not automatically approved website copy.')
    [void]$report.AppendLine('Roles and measurable outcomes must be supplied by you. PDF, Office, image, notebook, and dataset contents are not extracted. File and text limits are recorded in the JSON.')
    foreach ($detail in $allDetails) {
        [void]$report.AppendLine("`n## " + $detail.name)
        [void]$report.AppendLine('Description: ' + $detail.description)
        [void]$report.AppendLine('Languages: ' + (($detail.languages | ForEach-Object { $_.name + ' (' + $_.percent + '%)' }) -join ', '))
        [void]$report.AppendLine('Topics: ' + ($detail.topics -join ', '))
        [void]$report.AppendLine('Your role: [fill in]')
        [void]$report.AppendLine('Audience and problem: [fill in]')
        [void]$report.AppendLine('Outcomes: [fill in; use measured results only]')
        [void]$report.AppendLine('Approved public summary: [fill in or let me draft from reviewed evidence]')
        if ($detail.readme) {
            [void]$report.AppendLine("`n### README: " + $detail.readme.path)
            [void]$report.AppendLine($detail.readme.text)
            if ($detail.readme.truncated) { [void]$report.AppendLine('[README shortened by export limit.]') }
        }
        foreach ($doc in $detail.documentation) {
            [void]$report.AppendLine("`n### Documentation: " + $doc.path)
            [void]$report.AppendLine($doc.text)
            if ($doc.truncated) { [void]$report.AppendLine('[Document shortened by export limit.]') }
        }
        [void]$report.AppendLine("`n### Dependencies")
        foreach ($manifest in $detail.dependencies) { [void]$report.AppendLine('- ' + $manifest.path + ': ' + ($manifest.packageNames -join ', ') + ' (' + $manifest.extraction + ')') }
        [void]$report.AppendLine("`n### HTML pages and report headings")
        foreach ($page in $detail.htmlPages) { [void]$report.AppendLine('- ' + $page.path + ': ' + $page.title + ' | ' + ($page.headings -join '; ')) }
        [void]$report.AppendLine("`n### Source overview (sample; names do not prove behavior)")
        foreach ($source in $detail.sourceOverview) { [void]$report.AppendLine('- ' + $source.path + ': ' + ($source.declaredSymbols -join ', ') + ' | Imports: ' + ($source.imports -join ', ')) }
        [void]$report.AppendLine("`n### File overview")
        [void]$report.AppendLine('Files: ' + $detail.fileOverview.count + ' | Types: ' + (($detail.fileOverview.extensions | ForEach-Object { $_.extension + ': ' + $_.count }) -join ', '))
        foreach ($path in $detail.fileOverview.paths) { [void]$report.AppendLine('- ' + $path) }
        foreach ($note in $detail.collectionNotes) { [void]$report.AppendLine('Collection note: ' + $note) }
    }
    $report.ToString() | Set-Content -LiteralPath $reportPath -Encoding UTF8
    Write-Host ('Exported {0} repositories.' -f $allDetails.Count)
    Write-Host ('Review report: ' + $reportPath)
    Write-Host ('Structured details: ' + $jsonPath)
    if ($OpenReport) { & notepad.exe $reportPath }
} finally { [Console]::OutputEncoding = $previousConsoleEncoding }
