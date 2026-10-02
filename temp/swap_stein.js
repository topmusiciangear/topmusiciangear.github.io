// 531: Traveler TB-4P -> Steinberger Spirit XT-2 Bass (verified 02/10/2026).
const fs = require('fs');
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const V = (value, value_es) => ({ value, value_es });
const W = (t) => ({ title: t, title_es: t });
const VD = (name, pros, cons, pros_es, cons_es) => ({ name, name_es: name, pros, cons, pros_es, cons_es });
const AW = (mid, clean) => 'https://www.awin1.com/cread.php?awinmid=' + mid + '&awinaffid=2891111&ued=' + encodeURIComponent(clean);

// 1. Catalog
const p = P.find(x => x.id === 531);
p.title = 'Steinberger Spirit XT-2 Bass'; p.title_es = 'Steinberger Spirit XT-2 Bass';
p.brand = 'Steinberger'; p.price = 499;
delete p.rating; delete p.reviews;
p.desc = 'Headless 34-inch-scale travel bass, just 38.5 inches long, with dual Steinberger humbuckers (HB-1 bridge, HB-2 neck), volume plus volume plus master tone, patented DoubleBall bridge with 40:1 direct-pull tuning, folding leg rest and deluxe gig bag included.';
p.desc_es = 'Bajo de viaje headless de escala 34", solo 38,5" de largo, con dobles humbuckers Steinberger (HB-1 puente, HB-2 mástil), volumen más volumen más tono master, puente DoubleBall patentado con afinación direct-pull 40:1, apoyo plegable y funda deluxe incluida.';
p.img = 'https://r2.gear4music.com/media/25/250737/1200/preview.jpg';
p.stores = {
  gear4music: AW('1117', 'https://www.gear4music.com/Guitar-and-Bass/Steinberger-Spirit-XT-2-Bass-Black/1WHQ'),
  zzounds: 'https://www.zzounds.com/a--925521/item--STNXTSTD4',
  amazon: 'https://www.amazon.com/Steinberger-Spirit-Standard-Bass-Frost/dp/B07JVSR26N'
};
fs.writeFileSync('data/products.json', JSON.stringify(P, null, 2));

// 2. Guide
const g = G.find(x => x.id === 'best-bass-home-office');
const ci = g.productTable.columns.findIndex(c => c.title === 'Traveler Guitar TB-4P Bass');
g.productTable.columns[ci] = W('Steinberger Spirit XT-2 Bass');
const rows = {};
g.productTable.rows.forEach(r => { rows[r.label] = r; });
const set = (label, en, es) => { rows[label].values[ci] = V(en, es); };
set('Best For', 'Headless travel classic with full 34-inch scale', 'Clásico headless de viaje con escala completa 34"');
set('Type', 'Headless solid-body (compact 38.5 in)', 'Headless cuerpo sólido (compacto 38,5")');
set('Scale Length', '34 in', '34"');
set('Weight', '7.5 lb', '7,5 lb');
set('Body', 'Basswood, compact XL shape', 'Tilo, forma XL compacta');
set('Neck & Fretboard', '3-pc hard maple, engineered hardwood, 24 medium-jumbo', 'Arce duro 3 piezas, madera técnica, 24 medium-jumbo');
set('Pickups', '2x Steinberger humbuckers (HB-1 + HB-2)', '2x humbuckers Steinberger (HB-1 + HB-2)');
set('Electronics', 'Vol + Vol + Master Tone (passive)', 'Vol + Vol + Tono master (pasivo)');
// Headphone row -> Gig Bag row (all-Yes/No is honest and differentiating)
const hi = g.productTable.rows.findIndex(r => r.label === 'Headphone Output');
g.productTable.rows[hi] = { label: 'Gig Bag Included', values: [V('Yes', 'Sí'), V('Yes', 'Sí'), V('Yes', 'Sí'), V('Yes', 'Sí'), V('Yes', 'Sí'), V('No', 'No'), V('No', 'No'), V('No', 'No')] };

// Verdict swap
const vi = g.verdictProsCons.findIndex(v => v.name === 'Traveler Guitar TB-4P Bass');
g.verdictProsCons[vi] = VD('Steinberger Spirit XT-2 Bass',
  ['Full 34-inch scale in a 38.5-inch headless body', 'Patented DoubleBall bridge with 40:1 direct-pull tuning', 'Dual Steinberger humbuckers with Vol plus Vol plus Tone', 'Folding leg rest and deluxe gig bag included'],
  ['Passive only — no active EQ onboard', 'DoubleBall strings required (or single-ball adaptor)', 'Polarizing minimal looks', 'No headphone output — needs interface or amp'],
  ['Escala completa 34" en cuerpo headless de 38,5"', 'Puente DoubleBall patentado con afinación direct-pull 40:1', 'Dobles humbuckers Steinberger con Vol más Vol más Tono', 'Apoyo plegable y funda deluxe incluidos'],
  ['Solo pasivo — sin EQ activa a bordo', 'Pide cuerdas DoubleBall (o adaptador single-ball)', 'Estética mínima polarizante', 'Sin salida de auriculares — pide interfaz o ampli']);

// Section swap
const sec = g.sections.find(s => (s.products || []).includes(531));
sec.heading = 'Steinberger Spirit XT-2: The Original Headless Travel Bass';
sec.heading_es = 'Steinberger Spirit XT-2: El headless de viaje original';
sec.content = '<strong>Thirty-four inches of scale in a 38.5-inch headless body that has looked like the future since the eighties.</strong> Dual Steinberger humbuckers (HB-1 bridge, HB-2 neck) with volume plus volume plus master tone, patented DoubleBall bridge with 40:1 direct-pull tuning that holds for weeks, folding leg rest for seated playing and deluxe gig bag included. Passive simplicity that travels anywhere.';
sec.content_es = '<strong>Treinta y cuatro pulgadas de escala en cuerpo headless de 38,5" con estética de futuro desde los ochenta.</strong> Dobles humbuckers Steinberger (HB-1 puente, HB-2 mástil) con volumen más volumen más tono master, puente DoubleBall patentado con afinación direct-pull 40:1 que aguanta semanas, apoyo plegable para tocar sentado y funda deluxe incluida. Simplicidad pasiva que viaja a cualquier lugar.';

// Silent section: no bass has headphone amp anymore
const sil = g.sections[g.sections.length - 1];
sil.content = '<p><strong>No bass here makes sound alone — the silent chain is bass, small interface, headphones.</strong> At the desk, any USB interface plus closed-back headphones gives full tone at midnight from any of these eight basses. Skip traditional amps entirely in shared spaces.</p><p><strong>When you want air movement, go small and bass-specific.</strong> Practice combos voiced for bass keep lows tight at conversation volume where a guitar amp would distort. See <a class="guide-link-btn" href="/guides/best-bass-practice-amps.html">best bass practice amps</a> and <a class="guide-link-btn" href="/guides/best-bass-amps.html">best bass amps</a> for the full breakdown.</p>';
sil.content_es = '<p><strong>Ningún bajo aquí suena solo — la cadena silenciosa es bajo, interfaz pequeña, auriculares.</strong> En el escritorio, cualquier interfaz USB más auriculares cerrados da tono completo a medianoche con cualquiera de estos ocho bajos. Olvida amplis tradicionales en espacios compartidos.</p><p><strong>Cuando quieras mover aire, opta por algo pequeño y específico de bajo.</strong> Los combos de práctica diseñados para bajo mantienen graves firmes a volumen conversación donde un ampli de guitarra distorsionaría. Revisa <a class="guide-link-btn" href="/guides/best-bass-practice-amps_es.html">mejores amplis de bajo para practicar</a> y <a class="guide-link-btn" href="/guides/best-bass-amps_es.html">mejores amplis de bajo</a> para el desglose.</p>';

// Conclusion clause
g.conclusion = g.conclusion.split('and the TB-4P adds silent headphone practice anywhere.').join('and the Steinberger XT-2 packs full-scale headless tone into 38.5 travel-ready inches.');
g.conclusion_es = g.conclusion_es.split('y el TB-4P añade práctica silenciosa con auriculares en cualquier lugar.').join('y el Steinberger XT-2 mete tono headless de escala completa en 38,5 pulgadas listas para viajar.');

// Verdict line
g.verdict = g.verdict.split('Need silent hotel practice with nothing else? Traveler TB-4P.').join('Need the headless travel classic with gig bag? Steinberger XT-2.');
g.verdict_es = g.verdict_es.split('¿Práctica silenciosa de hotel sin nada más? Traveler TB-4P.').join('¿El clásico headless de viaje con funda? Steinberger XT-2.');

// FAQ silent answer
const fq = g.faq.find(f => /silently|silencio/.test(f.q));
fq.a = 'Plug into any small USB interface and closed-back headphones for full tone at midnight with any of these eight basses. Skip traditional amps in shared spaces.';
fq.a_es = 'Conéctate a cualquier interfaz USB pequeña y auriculares cerrados para tono completo a medianoche con cualquiera de estos ocho bajos. Olvida amplis tradicionales en espacios compartidos.';
const fq2 = g.faq.find(f => /plane|avión/.test(f.q));
fq2.a = fq2.a.split('The TB-4P at 35.25 inches usually fits too. ').join('');
fq2.a_es = fq2.a_es.split('El TB-4P con 89,5 cm suele caber también. ').join('');

fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
const left = (JSON.stringify(G.find(x => x.id === 'best-bass-home-office'))).match(/TB-4P|TB4P|TRAULB|Traveler Guitar TB/g);
console.log('restos TB-4P en guia: ' + (left ? left.length : 0));
const gg = G.find(x => x.id === 'best-bass-home-office');
console.log('cols=' + gg.productTable.columns.length + ' verdict=' + gg.verdictProsCons.length + ' rowsok=' + gg.productTable.rows.every(r => r.values.length === gg.productTable.columns.length));
console.log('rows: ' + gg.productTable.rows.map(r => r.label).join(' / '));
