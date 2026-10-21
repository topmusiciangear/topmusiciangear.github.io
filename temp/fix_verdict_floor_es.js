// Corrige el veredicto de monitor-setup y barre el resto de guías en busca
// de la misma confusión (monitores "en el suelo") y anglicismos "midfield".
const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));

function get(id) { return guides.find(x => x.id === id); }
function rep(obj, key, from, to) {
  if (typeof obj[key] !== 'string' || !obj[key].includes(from)) {
    throw new Error('no encontrado [' + obj.id + '] ' + key + ': ' + from.slice(0, 100));
  }
  obj[key] = obj[key].split(from).join(to);
}
function repIn(obj, key, from, to) {
  if (!Array.isArray(obj[key])) throw new Error('no es array: ' + obj.id + ' ' + key);
  let n = 0;
  obj[key] = obj[key].map(v => {
    if (typeof v === 'string' && v.includes(from)) { n++; return v.split(from).join(to); }
    return v;
  });
  if (!n) throw new Error('no encontrado en array [' + obj.id + '] ' + key + ': ' + from.slice(0, 80));
}

/* ---------- 1. Veredicto monitor-setup ---------- */
const m = get('monitor-setup');

m.verdict = '<p><strong>No single product wins this guide: the ideal setup depends on where and how you place your speakers.</strong> Buy only what your room needs for your layout.</p>' +
  '<p><strong>1. Calibration:</strong> <span class="product-name">Sonarworks SoundID Reference</span> flattens the room response to ±0.5 dB and includes its own calibrated microphone, so you will not need the UMIK-1 or the GLM Kit.</p>' +
  '<p><strong>2. Monitors on floor stands:</strong> <span class="product-name">Yamaha HS8</span> mounted on <span class="product-name">K&amp;M 26722 Monitor Stands</span>. The 8-inch woofer reaches 38 Hz and the floor stands put the tweeters exactly at ear height for about €156 a pair. The MS-100 only earns its price if you are loading much heavier midfield monitors. Remember to keep the HS8 about 40 cm from the wall.</p>' +
  '<p><strong>3. Monitors on the desk:</strong> <span class="product-name">Focal Alpha 65 Evo</span> on <span class="product-name">IsoAcoustics ISO-200 Studio Monitor Stands</span>. The front port tolerates a desk pushed against the wall, and the isolators kill desk resonance far better than foam. The <span class="product-name">Auralex MoPAD-XL</span> is the ideal alternative if your budget is tight.</p>' +
  '<p><strong>Avoid duplicate spending:</strong> the GLM Kit only works if you already own Genelec SAM monitors, and you do not need an extra measurement mic if you already bought SoundID\'s bundle.</p>';

m.verdict_es = '<p><strong>Aquí no gana un solo producto: la configuración ideal depende de dónde y cómo coloques tus altavoces.</strong> Compra solo lo que tu sala necesita según tu distribución.</p>' +
  '<p><strong>1. Calibración:</strong> <span class="product-name">Sonarworks SoundID Reference</span> aplana la respuesta de la sala a ±0,5 dB e incluye su propio micrófono calibrado, por lo que no necesitarás el UMIK-1 ni el kit GLM.</p>' +
  '<p><strong>2. Monitores sobre soportes de suelo:</strong> <span class="product-name">Yamaha HS8</span> montados en <span class="product-name">soportes K&amp;M 26722</span>. El woofer de 8 pulgadas llega a 38 Hz y los soportes de suelo sitúan los tweeters exactamente a la altura del oído por unos €156 el par. El modelo MS-100 solo se justifica si vas a cargar monitores de campo medio mucho más pesados. Recuerda mantener los HS8 a unos 40 cm de la pared.</p>' +
  '<p><strong>3. Monitores en el escritorio:</strong> <span class="product-name">Focal Alpha 65 Evo</span> sobre <span class="product-name">soportes IsoAcoustics ISO-200</span>. El puerto frontal tolera perfectamente un escritorio pegado a la pared, y los aisladores eliminan la resonancia de la mesa mucho mejor que la espuma. El <span class="product-name">Auralex MoPAD-XL</span> es la alternativa ideal si vas con el presupuesto justo.</p>' +
  '<p><strong>Evita duplicar gastos:</strong> el kit GLM solo sirve si ya tienes monitores Genelec SAM, y no necesitas comprar ningún micrófono adicional si ya adquiriste el paquete completo de SoundID.</p>';

/* ---------- 2. Conclusión: nada de "en el suelo" ---------- */
rep(m, 'conclusion', 'if the speakers go on the floor', 'if they go on floor stands');
rep(m, 'conclusion_es', 'si los altavoces van al suelo', 'si van sobre soportes de suelo');

/* ---------- 3. midfield -> campo medio (ES) en monitor-setup ---------- */
rep(m.sections[6], 'content_es', 'monitores midfield pesados', 'monitores de campo medio pesados');
rep(m.sections[6], 'content_es', 'no para nearfields que mueves', 'no para monitores de campo cercano que mueves');
rep(m.sections[7], 'content_es', 'monitores midfield pesados', 'monitores de campo medio pesados');

for (const row of m.productTable.rows) {
  const msCol = m.productTable.columns.findIndex(c => c.title.includes('Ultimate Support MS-100'));
  const val = row.values[msCol];
  if (val.value_es && val.value_es.includes('midfield')) {
    val.value_es = val.value_es.split('midfield').join('de campo medio');
  }
}

/* ---------- 4. Otras guías con "midfield" en español ---------- */
const pro = get('pro-monitors');
if (pro.featuredSnippet.faq_q3_es.includes('midfield')) {
  pro.featuredSnippet.faq_q3_es = '¿A qué distancia se sitúa el oyente de unos monitores de campo medio?';
}
const sub = get('studio-subwoofers-setup');
rep(sub.sections[3], 'content_es', 'monitores midfield Trio11', 'monitores de campo medio Trio11');

/* ---------- 5. studio-furniture: "sobre el suelo" ---------- */
const furn = get('studio-furniture');
rep(furn.sections[2], 'content', 'Ideal for nearfield setups on the floor.', 'Ideal for nearfield setups on floor stands.');
rep(furn.sections[2], 'content_es', 'Ideales para monitoreo de campo cercano sobre el suelo.', 'Ideales para monitoreo de campo cercano con los monitores sobre soportes de suelo.');

fs.writeFileSync('data/guides.json', JSON.stringify(guides, null, 2), 'utf8');

console.log('OK. Veredicto ES:');
console.log(m.verdict_es.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
console.log('\nmidfield restante en ES de monitor-setup:', /midfield/.test(m.verdict_es + m.sections.map(s => s.content_es || '').join(' ') + JSON.stringify(m.productTable)));
