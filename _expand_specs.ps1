$json = Get-Content "data/guides.json" -Raw | ConvertFrom-Json
$g = $json | Where-Object { $_.id -eq "xr18-vs-cq18t" }

$newSpecs = @()

$newSpecs += @{label_es="Entradas"; label_en="Inputs"; val1="18 (16 XLR + 2 line)"; val2="18 (16 XLR + 2 line)"}
$newSpecs += @{label_es="Preamps Mic"; label_en="Mic Preamps"; val1="16 Midas diseñados"; val2="16 Allen & Heath"}
$newSpecs += @{label_es="Canales de Procesamiento"; label_en="Processing Channels"; val1="18"; val2="18"}
$newSpecs += @{label_es="Buses de Mezcla"; label_en="Mix Buses"; val1="12"; val2="14"}
$newSpecs += @{label_es="Frecuencia de Muestreo"; label_en="Sample Rate"; val1="48 kHz"; val2="96 kHz"}
$newSpecs += @{label_es="Motores FX"; label_en="FX Engines"; val1="4 efectos internos"; val2="SmartFX (8 estéreo)"}
$newSpecs += @{label_es="Pantalla"; label_en="Display"; val1="Ninguna (requiere tablet)"; val2='7" táctil capacitiva'}
$newSpecs += @{label_es="Bluetooth"; label_en="Bluetooth"; val1="No"; val2="Sí (streaming audio)"}
$newSpecs += @{label_es="Wi-Fi"; label_en="Wi-Fi"; val1="Integrado"; val2="Integrado"}
$newSpecs += @{label_es="Grabación"; label_en="Recording"; val1="18x18 USB a computadora"; val2="Multipista SD + USB 2x2"}
$newSpecs += @{label_es="Herramientas Inteligentes"; label_en="Smart Tools"; val1="Mezcla automática básica"; val2="Gain Assistant + Feedback Assistant"}
$newSpecs += @{label_es="Control por App"; label_en="App Control"; val1="iPad/Android (obligatorio)"; val2="Pantalla táctil + CQ MixPad app"}
$newSpecs += @{label_es="Montaje en Rack"; label_en="Rack Mountable"; val1="Sí (3U)"; val2="No (cabe en mochila)"}
$newSpecs += @{label_es="Grupos DCA"; label_en="DCA Groups"; val1="No"; val2="Sí (4)"}
$newSpecs += @{label_es="Grupos de Mute"; label_en="Mute Groups"; val1="No"; val2="Sí (4)"}
$newSpecs += @{label_es="Memoria de Escenas"; label_en="Scene Memory"; val1="Sí"; val2="Sí"}
$newSpecs += @{label_es="Salidas Principales"; label_en="Main Outputs"; val1="2 XLR + 2 TRS"; val2="2 XLR"}
$newSpecs += @{label_es="Salidas Auxiliares"; label_en="Aux Outputs"; val1="6"; val2="4"}
$newSpecs += @{label_es="Salida de Auriculares"; label_en="Headphone Output"; val1='Sí (1/4")'; val2='Sí (1/4")'}
$newSpecs += @{label_es="Ethernet"; label_en="Ethernet"; val1="Sí"; val2="No (Wi-Fi/Bluetooth)"}
$newSpecs += @{label_es="Dimensiones"; label_en="Dimensions"; val1='19" x 5.2" x 7.5" (3U rack)'; val2='14.2" x 10.6" x 3.9"'}
$newSpecs += @{label_es="Peso"; label_en="Weight"; val1="5.1 lbs"; val2="4.6 lbs"}
$newSpecs += @{label_es="Año de Lanzamiento"; label_en="Year Released"; val1="2014"; val2="2023"}
$newSpecs += @{label_es="Precio"; label_en="Price"; val1="$739"; val2="$1,199"}

$g.featuredSnippet.specs = $newSpecs

$newRows = @()
$newRows += @{label="Inputs"; label_es="Entradas"; val1="18 (16 XLR + 2 line)"; val2="18 (16 XLR + 2 line)"; val1_es="18 (16 XLR + 2 line)"; val2_es="18 (16 XLR + 2 line)"}
$newRows += @{label="Mic Preamps"; label_es="Preamps Mic"; val1="16 Midas-designed"; val2="16 Allen & Heath"; val1_es="16 Midas diseñados"; val2_es="16 Allen & Heath"}
$newRows += @{label="Processing Channels"; label_es="Canales de Procesamiento"; val1="18"; val2="18"; val1_es="18"; val2_es="18"}
$newRows += @{label="Mix Buses"; label_es="Buses de Mezcla"; val1="12"; val2="14"; val1_es="12"; val2_es="14"}
$newRows += @{label="Sample Rate"; label_es="Frecuencia de Muestreo"; val1="48 kHz"; val2="96 kHz"; val1_es="48 kHz"; val2_es="96 kHz"}
$newRows += @{label="FX Engines"; label_es="Motores FX"; val1="4 internal effects"; val2="SmartFX (8 stereo)"; val1_es="4 efectos internos"; val2_es="SmartFX (8 estéreo)"}
$newRows += @{label="Display"; label_es="Pantalla"; val1="None (requires tablet)"; val2='7" capacitive touchscreen'; val1_es="Ninguna (requiere tablet)"; val2_es='7" táctil capacitiva'}
$newRows += @{label="Bluetooth"; label_es="Bluetooth"; val1="No"; val2="Yes (audio streaming)"; val1_es="No"; val2_es="Sí (streaming audio)"}
$newRows += @{label="Wi-Fi"; label_es="Wi-Fi"; val1="Built-in"; val2="Built-in"; val1_es="Integrado"; val2_es="Integrado"}
$newRows += @{label="Recording"; label_es="Grabación"; val1="18x18 USB to computer"; val2="Multitrack SD + USB 2x2"; val1_es="18x18 USB a computadora"; val2_es="Multipista SD + USB 2x2"}
$newRows += @{label="Smart Tools"; label_es="Herramientas Inteligentes"; val1="Basic auto mixing"; val2="Gain Assistant + Feedback Assistant"; val1_es="Mezcla automática básica"; val2_es="Gain Assistant + Feedback Assistant"}
$newRows += @{label="App Control"; label_es="Control por App"; val1="iPad/Android (required)"; val2="Touchscreen + CQ MixPad app"; val1_es="iPad/Android (obligatorio)"; val2_es="Pantalla táctil + CQ MixPad app"}
$newRows += @{label="Rack Mountable"; label_es="Montaje en Rack"; val1="Yes (3U)"; val2="No (backpack size)"; val1_es="Sí (3U)"; val2_es="No (cabe en mochila)"}
$newRows += @{label="DCA Groups"; label_es="Grupos DCA"; val1="No"; val2="Yes (4)"; val1_es="No"; val2_es="Sí (4)"}
$newRows += @{label="Mute Groups"; label_es="Grupos de Mute"; val1="No"; val2="Yes (4)"; val1_es="No"; val2_es="Sí (4)"}
$newRows += @{label="Scene Memory"; label_es="Memoria de Escenas"; val1="Yes"; val2="Yes"; val1_es="Sí"; val2_es="Sí"}
$newRows += @{label="Main Outputs"; label_es="Salidas Principales"; val1="2 XLR + 2 TRS"; val2="2 XLR"; val1_es="2 XLR + 2 TRS"; val2_es="2 XLR"}
$newRows += @{label="Aux Outputs"; label_es="Salidas Auxiliares"; val1="6"; val2="4"; val1_es="6"; val2_es="4"}
$newRows += @{label="Headphone Output"; label_es="Salida de Auriculares"; val1='Yes (1/4")'; val2='Yes (1/4")'; val1_es='Sí (1/4")'; val2_es='Sí (1/4")'}
$newRows += @{label="Ethernet"; label_es="Ethernet"; val1="Yes"; val2="No (Wi-Fi/Bluetooth)"; val1_es="Sí"; val2_es="No (Wi-Fi/Bluetooth)"}
$newRows += @{label="Dimensions"; label_es="Dimensiones"; val1='19" x 5.2" x 7.5" (3U rack)'; val2='14.2" x 10.6" x 3.9"'; val1_es='19" x 5.2" x 7.5" (rack 3U)'; val2_es='14.2" x 10.6" x 3.9"'}
$newRows += @{label="Weight"; label_es="Peso"; val1="5.1 lbs"; val2="4.6 lbs"; val1_es="5.1 lbs"; val2_es="4.6 lbs"}
$newRows += @{label="Year Released"; label_es="Año de Lanzamiento"; val1="2014"; val2="2023"; val1_es="2014"; val2_es="2023"}
$newRows += @{label="Price"; label_es="Precio"; val1="$739"; val2="$1,199"; val1_es="$739"; val2_es="$1,199"}

$g.comparison.rows = $newRows

$json | ConvertTo-Json -Depth 100 | Set-Content "data/guides.json" -Encoding UTF8

Write-Host "Specs expandidas: $($newSpecs.Count) items"
Write-Host "Rows expandidas: $($newRows.Count) items"
