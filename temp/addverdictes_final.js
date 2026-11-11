const fs = require('fs');
const p = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
let s = fs.readFileSync(p, 'utf8');
const needle = 'Zynaptiq Unveil</span></strong> — Procesador de eliminación de reverb basado en demix. Quita de forma quirúrgica la acústica de la sala en grabaciones hechas en espacios problemáticos.</p>"';
const insert = 'Zynaptiq Unveil</span></strong> — Procesador de eliminación de reverb basado en demix. Quita de forma quirúrgica la acústica de la sala en grabaciones hechas en espacios problemáticos.</p><p><strong><span class=\\"product-name\\">Waves Clarity Vx Pro</span></strong> — Aislamiento de ruido por IA en tiempo real para diálogos. Limpieza espectral multibanda sin artefactos metálicos.</p>"';
if (s.includes(needle)) {
  s = s.replace(needle, insert);
  fs.writeFileSync(p, s);
  console.log('done');
} else {
  console.log('target not found');
}
