$moduleID = "studio-vtt-bastler-tools"
$temp = "../temp"

$module = (Get-Content "./module.json" | Out-String | ConvertFrom-Json)
Write-Output "Found version ", $module.version

$version = $module.version -replace "\.", "_"
$dest = "./releases/v$version"

Write-Output "Testing path $dest"
if (Test-Path -Path $dest) {
  Write-Host "This version already got packed. Press anything to exit" -foregroundcolor red
  Read-Host
  exit
}

$downloadUrl = $module.download
$downloadFileName = "studio-vtt-bastler-tools-$version.zip"

if ($downloadUrl -notmatch $module.version) {
  Write-Host "The download URL in module.json is not correct: Tag not found $version" -foregroundcolor red
  Read-Host
  exit
}
if ($downloadUrl -notmatch $downloadFileName) {
  Write-Host "The download URL in module.json is not correct: Filename not found $downloadFileName" -foregroundcolor red
  Read-Host
  exit
}
if ($downloadUrl -cne "https://github.com/Studio-VTT-Bastler/studio-vtt-bastler-tools/releases/download/v$($module.version)/$downloadFileName") {
  Write-Host "The download URL in module.json is not correct: Should be 'https://github.com/Studio-VTT-Bastler/studio-vtt-bastler-tools/releases/download/v$($module.version)/$downloadFileName'" -foregroundcolor red
  Read-Host
  exit
}

if ((Read-Host -Prompt "Continue packing version $version? (Y/N)") -eq "N") {
  exit
}

Write-Host "Started copying module"
Copy-Item -Path "./" -Destination "$temp/$moduleID" -Recurse
Write-Host "Successfully copied module to temporary folder" -foregroundcolor green

Write-Host "Now removing unwanted directories and files"
Remove-Item -Path "$temp/$moduleID/.github" -Recurse -Force -WhatIf -ErrorAction Ignore
Remove-Item -Path "$temp/$moduleID/.git" -Recurse -Force -WhatIf -ErrorAction Ignore
Remove-Item -Path "$temp/$moduleID/releases" -Recurse -Force -WhatIf -ErrorAction Ignore
Remove-Item -Path "$temp/$moduleID/.gitignore" -Recurse -Force -WhatIf -ErrorAction Ignore
Remove-Item -Path "$temp/$moduleID/$moduleID.lock" -Recurse -Force -WhatIf -ErrorAction Ignore
Remove-Item -Path "$temp/$moduleID/packVersion.ps1" -Recurse -Force -WhatIf -ErrorAction Ignore
Write-Host "Successfully removed" -ForegroundColor Green

Write-Host "Now compressing Archive and finishing routine"
New-Item $dest -ItemType "directory"
Compress-Archive -Path "$temp/$moduleID" -DestinationPath "$dest/$downloadFileName"
Copy-Item -Path "./module.json" -Destination "$dest/manifest.json"

Write-Host "Now deleting temp directory"
Remove-Item -Path $temp -Recurse -Force
Write-Host "Finished!" -foregroundcolor darkgreen
