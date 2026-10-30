$lines = Get-Content js/guide-scores.js
$new = @(
'  "best-plugins": {'
'   "FabFilter Paquete Total": 9.8,'
'   "FabFilter Total Bundle": 9.8,'
'   "FabFilter Pro-Q 4": 9.8,'
'   "FabFilter Pro-C 3": 9.7,'
'   "iZotope Ozone 12 Advanced": 9.6,'
'   "Soundtoys 5.5 Bundle": 9.4,'
'   "Celemony Melodyne 5": 9.5,'
'   "Native Instruments Komplete 26 Definitivo": 9.0,'
'   "Native Instruments Komplete 26 Ultimate": 9.0,'
'   "TDR Kotelnikov GE": 9.1,'
'   "Tokyo Dawn Labs TDR Kotelnikov GE": 9.1,'
'   "Universal Audio UAD Ultimate 14": 9.3'
'  },'
)
for ($i=0; $i -lt $new.Count; $i++) {
    $lines[610+$i] = $new[$i]
}
$lines | Set-Content js/guide-scores.js -Encoding utf8
