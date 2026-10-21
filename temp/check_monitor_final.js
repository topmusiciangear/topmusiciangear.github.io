const fs = require('fs');
const en = fs.readFileSync('guides/monitor-setup.html', 'utf8');
const es = fs.readFileSync('guides/monitor-setup_es.html', 'utf8');

for (const [name, s] of [['EN', en], ['ES', es]]) {
  console.log('\n=== ' + name + ' ===');
  console.log('restos "close the guide":', /close the guide|cierran la guía/i.test(s));
  console.log('restos "Pick by constraint":', /Pick by constraint|Elige por restricción/i.test(s));
  console.log('menciona sección avisos una vez:', (s.match(/Compatibility Warnings|avisos de compatibilidad/gi) || []).length);
  console.log('mojibake (Ã|â€):', /Ã|â€/.test(s));
  console.log('JSON-LD scripts:', (s.match(/application\/ld\+json/g) || []).length);
  console.log('veredicto párrafos:', (s.match(/1\. Calibration|1\. Calibración/g) || []).length);
}

// comprobar orden de secciones ES
const re = /<h2[^>]*class="[^"]*guide-section-heading[^"]*"[^>]*>([\s\S]*?)<\/h2>/g;
let m, i = 0;
console.log('\nORDEN ES:');
while ((m = re.exec(es))) console.log((i++) + '. ' + m[1].replace(/<[^>]+>/g, '').trim());

// validar JSON-LD de la pagina
const blocks = [...en.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
blocks.forEach((b, k) => {
  try { JSON.parse(b[1]); console.log('JSON-LD ' + k + ': OK'); }
  catch (e) { console.log('JSON-LD ' + k + ': ERROR ' + e.message); }
});
