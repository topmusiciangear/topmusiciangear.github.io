const fs = require('fs');
let r = fs.readFileSync('guides/best-monitors-for-small-rooms.html', 'utf8');
// Insert tolerance section before </body>
const toleranceSection = `
<!-- Tolerancia en respuesta frecuencia -->
<div class="guide-frequency-margins" style="margin:12px 0;padding:8px 12px;background:#f8f9fa;border:1px solid #dee2e6;border-radius:4px;font-size:12px;color:#6c757d;">
<strong>Márgenes de medición de respuesta en frecuencia:</strong>
<ul>
<li><strong>±3 dB:</strong> Respuesta plana de alta calidad (Kali LP-6 V2, Neumann KH 80 DSP, KRK Rokit 5 G5, Genelec 8010A, JBL 305P MkII)</li>
<li><strong>-6 dB:</strong> Extensión de graves moderada (Genelec 8030C, ADAM Audio T5V, PreSonus Eris Studio 5)</li>
<li><strong>-10 dB:</strong> Límite de graves, no respuesta plana (iLoud Micro Monitor Pro, iLoud MTM MKII, Yamaha HS5, ADAM Audio D3V)</li>
</ul>
<p style="margin-top:8px;font-size:11px;color:#6c757d;">
<strong>Nota:</strong> Las mediciones a <strong>-10 dB</strong> muestran la extensión límite en graves, mientras que las mediciones a <strong>±3 dB</strong> reflejan respuesta plana útil. Los monitores con caída de -10 dB bajan más en graves que los de ±3 dB, pero eso no los hacen "peores", solo tienen diferente diseño de graves.
</div>
`;
r = r.replace('</body>', toleranceSection + '</body>');
fs.writeFileSync('guides/best-monitors-for-small-rooms.html', r);
console.log('Tolerance section added');