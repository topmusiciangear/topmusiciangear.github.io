const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const G = require(DIR + 'data/guides.json');
let ok = 0, miss = 0;
function setCell(gid, label, col, en, es) {
  const g = G.find(x => x.id === gid);
  if (!g || !g.productTable) { console.log('MISS guide/table ' + gid); miss++; return; }
  const r = g.productTable.rows.find(r => r.label === label);
  const ci = g.productTable.columns.findIndex(c => c.title === col);
  if (!r || ci === -1) { console.log('MISS cell ' + gid + ' [' + label + '] ' + col); miss++; return; }
  r.values[ci].value = en; r.values[ci].value_es = es; ok++;
}
// --- interfaces/mics ---
['budget-interfaces'].forEach(gid => setCell(gid, 'Sample Rate', 'Audient iD14 MkII', '96 kHz / 24-bit', '96 kHz / 24 bits'));
setCell('portable-interfaces', 'Preamps', 'Universal Audio Volt 2', '2, 55 dB gain', '2, 55 dB de ganancia');
['best-mic-for-guitar-amps', 'best-instrument-mics'].forEach(gid => setCell(gid, 'Max SPL', 'Shure SM57', 'Not published', 'No publicado'));
['sm57-vs-sm58', 'sm57-vs-md421'].forEach(gid => setCell(gid, 'Output Impedance', 'Shure SM57', '150 Ω rated (310 Ω actual)', '150 Ω nominales (310 Ω reales)'));
setCell('apollo-vs-babyface', 'Dynamic Range', 'RME Babyface Pro FS', '117 dBA (AD) / 118 dBA (DA)', '117 dBA (AD) / 118 dBA (DA)');
setCell('rme-vs-motu', 'Dynamic Range', 'RME Babyface Pro FS', '117 dBA (AD) / 118 dBA (DA)', '117 dBA (AD) / 118 dBA (DA)');
['best-interface', 'portable-interfaces', 'budget-interfaces'].forEach(gid => setCell(gid, 'Connectivity', 'MOTU M2', 'USB-C (USB 2.0)', 'USB-C (USB 2.0)'));
['best-interface', 'portable-interfaces', 'budget-interfaces'].forEach(gid => setCell(gid, 'Sample Rate', 'SSL 2+ MKII', '192 kHz / 32-bit', '192 kHz / 32 bits'));
['best-interface', 'budget-interfaces'].forEach(gid => setCell(gid, 'Inputs / Outputs', 'Audient iD14 MkII', '2-in / 4-out (+ ADAT)', '2 entradas / 4 salidas (+ ADAT)'));
// --- monitors/headphones ---
['best-monitors', 'budget-monitors', 'best-monitors-for-small-rooms'].forEach(gid => setCell(gid, 'Frequency Response', 'KRK Rokit 7 G5', '45 Hz – 36 kHz (±3 dB)', '45 Hz – 36 kHz (±3 dB)'));
setCell('hs8-vs-rokit-7', 'Frequency Response', 'KRK Rokit 7 G5', '45 Hz – 36 kHz (±3 dB)', '45 Hz – 36 kHz (±3 dB)');
setCell('hs8-vs-rokit-7', 'Max SPL', 'KRK Rokit 7 G5', '110 dB', '110 dB');
['best-monitors', 'budget-monitors', 'best-monitors-for-small-rooms', 'hs8-vs-rokit-7'].forEach(gid => setCell(gid, 'Power', 'KRK Rokit 7 G5', '145W RMS (97W LF + 48W HF)', '145W RMS (97W LF + 48W HF)'));
setCell('hs8-vs-rokit-7', 'Max SPL', 'Yamaha HS8', 'Not published', 'No publicado');
setCell('tracking-headphones', 'Cable', 'Audio-Technica ATH-M50x', 'Detachable, 3 cables included (coiled + 2 straight)', 'Desmontable, 3 cables incluidos (espiral + 2 rectos)');
['m50x-vs-mdr7506', 'k371-vs-mdr7506'].forEach(gid => setCell(gid, 'Cable', 'Sony MDR-7506', 'Fixed coiled cable (3 m extended)', 'Cable fijo en espiral (3 m extendido)'));
setCell('best-monitors-for-small-rooms', 'Power', 'Kali Audio LP-6 V2', '80W (40W + 40W)', '80W (40W + 40W)');
// --- mixers ---
['best-digital-mixers', 'xr18-vs-m32r', 'pro-mixers'].forEach(gid => setCell(gid, 'Weight', 'Midas M32R LIVE', '31.5 lbs (14.3 kg)', '31,5 lb (14,3 kg)'));
setCell('xr18-vs-m32r', 'Year', 'Midas M32R LIVE', '2016', '2016');
setCell('best-compact-mixers', 'Weight', 'Allen & Heath ZEDi-10FX', '2.3 kg (5.1 lb)', '2,3 kg (5,1 lb)');
setCell('best-analog-mixers', 'Weight', 'Mackie ProFX12v3', '7.9 lb (3.6 kg)', '7,9 lb (3,6 kg)');
setCell('best-compact-mixers', 'Aux Sends', 'Allen & Heath ZEDi-10FX', '1 AUX + 1 FX send', '1 envío AUX + 1 envío FX');
setCell('best-compact-mixers', 'Built-in FX', 'Allen & Heath ZEDi-10FX', '61 presets with tap tempo', '61 presets con tap tempo');
setCell('best-compact-mixers', 'Channels', 'Allen & Heath ZEDi-10FX', '10 (4 mono + 2 stereo)', '10 (4 mono + 2 estéreo)');
setCell('xr18-vs-cq18t', 'Wi-Fi', 'Behringer X Air XR18', 'Built-in Tri-Mode Wi-Fi (2.4 GHz)', 'Wi-Fi trimodo integrado (2,4 GHz)');
// --- basses ---
setCell('pro-basses', 'Electronics', 'Fender American Ultra II Precision Bass', 'Active/passive switchable (S-1), 3-band active EQ', 'Conmutable activo/pasivo (S-1), EQ activo de 3 bandas');
['budget-bass-like-expensive', 'beginner-bass-guitars'].forEach(gid => setCell(gid, 'Electronics', 'Ibanez SR300E', 'Active 3-band EQ with 3-way Power Tap', 'EQ activo de 3 bandas con Power Tap de 3 posiciones'));
setCell('best-bass-under-700', 'Frets & Fretboard', 'Sire Marcus Miller V5R', '20 medium frets, rosewood Edgeless', '20 trastes medium, palisandro Edgeless');
['budget-bass-like-expensive', 'beginner-bass-guitars', 'best-bass-under-700'].forEach(gid => setCell(gid, 'Weight', 'Sterling by Music Man StingRay Ray4', 'Not published (varies by unit)', 'No publicado (varía por unidad)'));
['budget-bass-like-expensive', 'beginner-bass-guitars'].forEach(gid => setCell(gid, 'Neck', 'Ibanez SR300E', 'SR4 5-pc maple/walnut, jatoba board, 24 frets', 'SR4 de 5 piezas arce/nogal, diapasón de jatoba, 24 trastes'));
['budget-bass-like-expensive', 'beginner-bass-guitars'].forEach(gid => setCell(gid, 'Pickups', 'Sterling by Music Man StingRay Ray4', '1x ceramic humbucker (Sterling by Music Man)', '1x humbucker cerámico (Sterling by Music Man)'));
['budget-bass-like-expensive', 'beginner-bass-guitars'].forEach(gid => setCell(gid, 'Electronics', 'Sterling by Music Man StingRay Ray4', '2-band active preamp, 9V', 'Preamplificador activo de 2 bandas, 9V'));
setCell('best-bass-under-700', 'Neck', 'ESP LTD B-204SM Bass Guitar', '5-pc maple/jatoba, Thin U, 24 XJ frets', '5 piezas arce/jatoba, Thin U, 24 trastes XJ');
['fender-bass-guide'].forEach(gid => setCell(gid, 'Weight', 'Squier Classic Vibe \'60s Jazz Bass', 'Not published (varies by unit)', 'No publicado (varía por unidad)'));
['budget-bass-like-expensive', 'beginner-bass-guitars'].forEach(gid => setCell(gid, 'Weight', 'Squier Affinity Series Precision Bass PJ', 'Not published (varies by unit)', 'No publicado (varía por unidad)'));
['fender-bass-guide', 'beginner-bass-guitars'].forEach(gid => setCell(gid, 'Weight', 'Fender American Ultra II Precision Bass', 'Not published (varies by unit)', 'No publicado (varía por unidad)'));
['budget-bass-like-expensive', 'beginner-bass-guitars'].forEach(gid => setCell(gid, 'Weight', 'Ibanez SR300E', 'Not published', 'No publicado'));
fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(G, null, 2));
console.log('DONE ok=' + ok + ' miss=' + miss);