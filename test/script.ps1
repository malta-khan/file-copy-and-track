# Define variables
$targetFolder = "E:\Safdar\Learning\Github\ps-Sctipt-copier\test\target"
$destinationFolder = "E:\Safdar\Learning\Github\ps-Sctipt-copier\test\destination"
$exportHistoryFile = "E:\Safdar\Learning\Github\ps-Sctipt-copier\test\export_history.csv"

# Function to read export history
function Read-ExportHistory {
    $history = @{}
    if (Test-Path $exportHistoryFile) {
        Import-Csv $exportHistoryFile | ForEach-Object {
            $history["$($_.subfolderName),$($_.fileName)"] = $true
        }
    }
    return $history
}

# Function to scan target folder
function Scan-TargetFolder {
    param ($history)
    $result = @{}
    Get-ChildItem $targetFolder -Directory | ForEach-Object {
        $subfolderName = $_.Name
        $files = Get-ChildItem $_.FullName -File | Where-Object {
            -not $history["$subfolderName,$($_.Name)"]
        } | Select-Object -ExpandProperty Name
        $result[$subfolderName] = $files
    }
    return $result
}

# Function to display results
function Display-Results {
    param ($scanResult)
    foreach ($subfolder in $scanResult.Keys) {
        Write-Host "${subfolder}: $($scanResult[$subfolder].Count) files"
    }
}

# Function to get user input
function Get-UserInput {
    param ($subfolder, $maxFiles)
    do {
        $input = Read-Host "How many files to copy from $subfolder ($maxFiles)"
        if ($input -match '^\d+$') {
            $num = [int]$input
            if ($num -eq 0) { return 0 }
            return [Math]::Min($num, $maxFiles)
        }
        Write-Host "Please enter a valid number."
    } while ($true)
}

# Function to copy files
function Copy-Files {
    param ($scanResult)
    $today = Get-Date -Format "yyyy-MM-dd"
    $newFolder = Join-Path $destinationFolder $today
    New-Item -ItemType Directory -Path $newFolder -Force | Out-Null

    foreach ($subfolder in $scanResult.Keys) {
        $files = $scanResult[$subfolder]
        $numFiles = Get-UserInput $subfolder $files.Count
        for ($i = 0; $i -lt $numFiles; $i++) {
            $file = $files[$i]
            $source = Join-Path -Path $targetFolder -ChildPath $subfolder -AdditionalChildPath $file
            $dest = Join-Path -Path $newFolder -ChildPath $file
            Copy-Item -Path $source -Destination $dest
            Add-Content -Path $exportHistoryFile -Value "$subfolder,$file,$today"
            Write-Host "Copied $($i+1)/$numFiles from $subfolder"
        }
        Write-Host "Finished copying files from $subfolder"
    }
    Write-Host "All folders finished"
}

# Main script
$exportHistory = Read-ExportHistory
$scanResult = Scan-TargetFolder $exportHistory
Display-Results $scanResult
Copy-Files $scanResult

Read-Host "Press Enter to exit..."