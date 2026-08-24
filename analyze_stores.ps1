 = Get-Content 'C:\Users\Daniel\projects\topmusiciangear\data\products.json' -Raw | ConvertFrom-Json
Write-Host 'Total products in file:' .Count

 =  | Where-Object { .stores -and (.stores.PSObject.Properties | Measure-Object).Count -gt 0 }
Write-Host 'Total products WITH at least one store:' .Count

 = @()
 = @()
 = 0
 = 0

foreach ( in ) {
     = .stores.PSObject.Properties.Name
     =  -contains 'gear4music'
     =  -contains 'musicstore'
    
    if (-not ) {
        ++
         += [PSCustomObject]@{ id = .id; title = .title; brand = .brand; storesPresent = ( -join ', ') }
    }
    if (-not ) {
        ++
         += [PSCustomObject]@{ id = .id; title = .title; brand = .brand; storesPresent = ( -join ', ') }
    }
}

Write-Host ''
Write-Host '=== SUMMARY ==='
Write-Host  Total products with stores: 0 
Write-Host  Missing gear4music: 
Write-Host Missing musicstore: 
Write-Host ''
Write-Host '=== FIRST 50 MISSING gear4music ==='
Write-Host (ID.PadRight(6) + Brand.PadRight(20) + Title.PadRight(50) + 'Stores Present')
Write-Host (---.PadRight(6) + -----.PadRight(20) + -----.PadRight(50) + '-------------')
 = 0
foreach ( in ) {
    if ( -ge 50) { break }
    Write-Host (.id.ToString().PadRight(6) + .brand.PadRight(20) + .title.PadRight(50) + .storesPresent)
    ++
}

Write-Host ''
Write-Host '=== FIRST 50 MISSING musicstore ==='
Write-Host (ID.PadRight(6) + Brand.PadRight(20) + Title.PadRight(50) + 'Stores Present')
Write-Host (---.PadRight(6) + -----.PadRight(20) + -----.PadRight(50) + '-------------')
 = 0
foreach ( in ) {
    if ( -ge 50) { break }
    Write-Host (.id.ToString().PadRight(6) + .brand.PadRight(20) + .title.PadRight(50) + .storesPresent)
    ++
}
