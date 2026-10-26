$i = 0
while ($i -lt 20) {
    Start-Sleep -Seconds 15
    try {
        $r = Invoke-WebRequest -Uri 'https://topmusiciangear.com/guides/at2020-vs-p120.html?cb=verify' -UseBasicParsing -TimeoutSec 20
        if ($r.Content -match 'width.120px.;height.120px.;flex:none') {
            Write-Host "LIVE after " + (($i+1)*15) + "s"
            break
        }
    } catch {
        Write-Host "err"
    }
    $i++
}