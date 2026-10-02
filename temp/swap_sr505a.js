// 544: SR505E -> SR505A (verified: Andertons £629 in stock).
const fs = require('fs');
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const V = (value, value_es) => ({ value, value_es });
const VD = (name, pros, cons, pros_es, cons_es) => ({ name, name_es: name, pros, cons, pros_es, cons_es });

const p = P.find(x => x.id === 544);
p.title = 'Ibanez SR505A Bass'; p.title_es = 'Ibanez SR505A Bass';
p.price = 629;
delete p.rating; delete p.reviews;
p.desc = '34-inch 5-string with passive Bartolini BH2 pickups and Custom 3-band EQ with bypass plus mid switch. Okoume body, SR5 5-piece roasted maple and walnut neck, rosewood board with 24 medium frets, MR5S bridge with adjustable spacing. In stock new — the current SR500-series five.';
p.desc_es = 'Cinco cuerdas 34" con pastillas pasivas Bartolini BH2 y EQ Custom 3 bandas con bypass más switch de medios. Cuerpo de okoume, mástil SR5 5 piezas arce tostado y nogal, diapasón palisandro con 24 trastes medium, puente MR5S con spacing ajustable. En stock nuevo — el cinco cuerdas SR500 actual.';
p.img = 'https://cdn11.bigcommerce.com/s-4hc0jwsnnq/images/stencil/1280x1280/products/49536/264388/SR505A_MHL_1P_01_F__82962.1767785339.jpg?c=1';
p.stores = { andertons: 'https://www.andertons.co.uk/ibanez-sr505a-mhl-5-string-bass-guitar-mahogany-brown-burst-low-gloss/' };
fs.writeFileSync('data/products.json', JSON.stringify(P, null, 2));

const g = G.find(x => x.id === 'best-5-string-basses');
const ci = g.productTable.columns.findIndex(c => c.title === 'Ibanez SR505E Bass');
g.productTable.columns[ci] = { title: 'Ibanez SR505A Bass', title_es: 'Ibanez SR505A Bass' };
const rows = {};
g.productTable.rows.forEach(r => { rows[r.label] = r; });
rows['Neck'].values[ci] = V('SR5 5-pc roasted maple-walnut', 'SR5 5 piezas arce tostado-nogal');
rows['Pickups'].values[ci] = V('Bartolini BH2', 'Bartolini BH2');
rows['Bridge'].values[ci] = V('MR5S, adjustable spacing', 'MR5S, spacing ajustable');

const vi = g.verdictProsCons.findIndex(v => v.name === 'Ibanez SR505E Bass');
g.verdictProsCons[vi] = VD('Ibanez SR505A Bass',
  ['Roasted maple-walnut neck resists climate shifts', 'Bartolini BH2 plus Custom 3-band with bypass and mid switch', 'MR5S bridge with adjustable spacing', '£629 new at Andertons — the current SR five'],
  ['No Nordstrand option (that is the SR505N)', 'Gloss-free satin look divides traditionalists', 'Single Andertons listing verified', 'Mid switch needs manual reading'],
  ['Mástil arce tostado-nogal resiste cambios de clima', 'Bartolini BH2 más Custom 3 bandas con bypass y switch de medios', 'Puente MR5S con spacing ajustable', '£629 nuevo en Andertons — el SR cinco actual'],
  ['Sin opción Nordstrand (esa es la SR505N)', 'Estética satinada sin brillo divide tradicionalistas', 'Un solo anuncio Andertons verificado', 'El switch de medios requiere leer el manual']);

const sec = g.sections.find(s => (s.products || []).includes(544));
sec.heading = 'Ibanez SR505A: Roasted Neck Speed, Buyable New';
sec.heading_es = 'Ibanez SR505A: Velocidad con mástil tostado, comprable nuevo';
sec.content = '<strong>Okoume body, five-piece roasted maple and walnut neck and Custom 3-band EQ with bypass and mid switch — with passive Bartolini BH2 pickups, not Nordstrand.</strong> Those Big Breaks belong to the SR505N, a different model. MR5S bridge with adjustable spacing, 24 medium frets on rosewood. The current SR500-series five-string, £629 new at Andertons.';
sec.content_es = '<strong>Cuerpo okoume, mástil cinco piezas arce tostado y nogal y EQ Custom 3 bandas con bypass y switch de medios — con pastillas pasivas Bartolini BH2, no Nordstrand.</strong> Esas Big Break son de la SR505N, otro modelo. Puente MR5S con spacing ajustable, 24 trastes medium en palisandro. El cinco cuerdas SR500 actual, £629 nuevo en Andertons.';

let s = JSON.stringify(g);
[['(GSR205B, SR505E)', '(GSR205B, SR505A)'], ['(GSR205B, SR505E)', '(GSR205B, SR505A)'], ['V7 New Gen, BB435, SR505E or Classic Vibe', 'V7 New Gen, BB435, SR505A or Classic Vibe'], ['V7 New Gen, BB435, SR505E o Classic Vibe', 'V7 New Gen, BB435, SR505A o Classic Vibe']].forEach(([a, b]) => { s = s.split(a).join(b); });
const g2 = JSON.parse(s);
const gi = G.findIndex(x => x.id === 'best-5-string-basses');
G[gi] = g2;
fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
const left = JSON.stringify(G[gi]).match(/SR505E|SR505N|Nordstrand|discontinu|Descontinuado|caza stock/g);
console.log('restos E: ' + (left ? [...new Set(left)].join(',') : 'none'));
console.log('cols=' + G[gi].productTable.columns.length + ' verdict=' + G[gi].verdictProsCons.length);
