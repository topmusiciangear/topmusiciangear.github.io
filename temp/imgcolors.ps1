Add-Type -AssemblyName System.Drawing
Get-ChildItem 'temp\pimg_*.jpg' | ForEach-Object {
  $bmp = [System.Drawing.Bitmap]::FromFile($_.FullName)
  $w = [int]$bmp.Width
  $h = [int]$bmp.Height
  $coords = @(@(2,2), @(($w - 3),2), @(2,($h - 3)), @(2,($h - 3)), @([int]($w/2),[int]($h/2)), @(2,[int]($h/2)), @([int]($w/2),2))
  $out = @()
  foreach ($pt in $coords) {
    $c = $bmp.GetPixel($pt[0], $pt[1])
    $out += ("{0},{1},{2}" -f $c.R, $c.G, $c.B)
  }
  Write-Output ("{0} {1}x{2} :: {3}" -f $_.Name, $w, $h, ($out -join ' | '))
  $bmp.Dispose()
}
