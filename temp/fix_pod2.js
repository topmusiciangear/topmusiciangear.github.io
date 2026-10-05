const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const G = require(F);
const g = G.find(x => x.id === 'best-mic-for-podcasting');
function cell(label, i, en, es) {
  const r = g.productTable.rows.find(r => r.label === label);
  if (!r || !r.values[i]) { console.log('MISS ' + label + ' col' + i); process.exitCode = 1; return; }
  r.values[i].value = en; r.values[i].value_es = es;
}
// cols: SM58(0) PodMic(1) Procaster(2) SM7B(3) NT1-5th(4) NT1-Sig(5) XM8500(6) MV7+(7) MELO(8) PodMicUSB(9)
// --- Self-Noise ---
cell('Self-Noise', 0, 'N/A (passive analog capsule, no hiss)', 'N/D (cápsula pasiva analógica sin siseo)');
cell('Self-Noise', 1, 'N/A (passive analog capsule, no hiss)', 'N/D (cápsula pasiva analógica sin siseo)');
cell('Self-Noise', 2, 'N/A (passive analog capsule, no hiss)', 'N/D (cápsula pasiva analógica sin siseo)');
cell('Self-Noise', 3, 'N/A (passive analog capsule, no hiss)', 'N/D (cápsula pasiva analógica sin siseo)');
cell('Self-Noise', 6, 'N/A (passive analog capsule, no hiss)', 'N/D (cápsula pasiva analógica sin siseo)');
cell('Self-Noise', 7, 'N/A (XLR) / DSP-processed (USB)', 'N/D (XLR) / procesado por DSP (USB)');
cell('Self-Noise', 8, '16 dBA', '16 dBA');
cell('Self-Noise', 9, 'N/A (XLR) / 19 dBA (USB-C)', 'N/D (XLR) / 19 dBA (USB-C)');
// --- Max SPL ---
cell('Max SPL', 0, '~160 dB SPL (physical capsule limit)', '~160 dB SPL (límite físico de la cápsula)');
cell('Max SPL', 1, '>140 dB SPL', '>140 dB SPL');
cell('Max SPL', 2, '>140 dB SPL', '>140 dB SPL');
cell('Max SPL', 6, '~150 dB SPL', '~150 dB SPL');
cell('Max SPL', 9, '148 dB SPL (USB) / >140 dB (XLR)', '148 dB SPL (USB) / >140 dB (XLR)');
// --- Output (corrections per Rode datasheet) ---
cell('Output / Preamp', 8, '2.4 GHz digital wireless', 'Inalámbrico digital 2,4 GHz');
cell('Output / Preamp', 9, '460 Ω (XLR)', '460 Ω (XLR)');
// --- SNR ---
[0, 1, 2, 3, 6].forEach(i => cell('Signal-to-Noise Ratio', i, 'N/A (set by your interface/preamp)', 'N/D (lo determina tu interfaz/previo)'));
cell('Signal-to-Noise Ratio', 4, '90 dBA', '90 dBA');
cell('Signal-to-Noise Ratio', 5, '90 dBA', '90 dBA');
cell('Signal-to-Noise Ratio', 8, '78 dB', '78 dB');
// --- Dynamic Range ---
[0, 1, 2, 3, 6].forEach(i => cell('Dynamic Range', i, 'N/A (set by external preamp)', 'N/D (lo determina el previo externo)'));
cell('Dynamic Range', 4, '138 dB (XLR) / virtually infinite (32-bit float USB)', '138 dB (XLR) / prácticamente infinito (USB 32-bit float)');
cell('Dynamic Range', 5, '138 dB', '138 dB');
// --- THD ---
cell('THD at Max SPL', 0, 'N/A (virtually no harmonic saturation)', 'N/D (saturación armónica prácticamente inexistente)');
cell('THD at Max SPL', 1, 'N/A (none in normal voice use)', 'N/D (inexistente en uso de voz normal)');
cell('THD at Max SPL', 2, 'N/A (distortion-free dynamic design)', 'N/D (diseño dinámico libre de distorsión)');
cell('THD at Max SPL', 3, 'N/A (no distortion at voice frequencies)', 'N/D (sin distorsión en frecuencias de voz)');
cell('THD at Max SPL', 6, 'N/A (imperceptible harmonic saturation)', 'N/D (saturación armónica imperceptible)');
cell('THD at Max SPL', 4, '<1% THD', '<1% THD');
cell('THD at Max SPL', 5, '<1% THD', '<1% THD');
cell('THD at Max SPL', 8, '<0.5% THD', '<0.5% THD');
// --- MELO sensitivity ---
cell('Sensitivity', 8, '-36 dBV/Pa (condenser capsule)', '-36 dBV/Pa (cápsula de condensador)');
fs.writeFileSync(F, JSON.stringify(G, null, 2));
console.log('exit=' + (process.exitCode || 0));