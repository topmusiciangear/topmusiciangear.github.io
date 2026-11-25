const fs = require('fs');
let r = fs.readFileSync('guides/best-monitors-for-small-rooms.html', 'utf8');
// Insert SPL info before </body>
const splSection = '<!-- SPL Info -->\n<div style="margin:20px 0;padding:12px;background:#f8f9fa;border:1px solid #dee2e6;border-radius:4px;font-size:12px;color:#333;">\n<strong>Nivel de Presión Sonora (SPL):</strong><br/>\n• <strong>ADAM Audio D3V:</strong> 96 dB continuous / 97 dB peak (par @ 1m)<br/>\n• <strong>Kali Audio LP-UNF:</strong> 103 dB max SPL (par @ 0.8m)<br/>\n<i>Los valores de SPL continuo miden el promedio, mientras que los valores de pico pueden ser 3-5 dB más altos. Las mediciones se realizan a 1 metro (ADAM) o 0.8m (Kali).</i>\n</div>\n';
r = r.replace('</body>', splSection + '</body>');
fs.writeFileSync('guides/best-monitors-for-small-rooms.html', r);
console.log('SPL info added before </body>');