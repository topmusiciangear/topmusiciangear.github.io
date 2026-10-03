const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const gi = G.findIndex(x => x.id === 'best-32-channel-digital-mixers');
let s = JSON.stringify(G[gi]);
// A. unify name (negative lookahead protects existing DL32SE)
s = s.replace(/Mackie DL32S(?!E)/g, 'Mackie DL32SE');
let g = JSON.parse(s);
const V = (value, value_es) => ({ value, value_es });
const ciDL = g.productTable.columns.findIndex(c => c.title === 'Mackie DL32SE');
const ci32S = g.productTable.columns.findIndex(c => c.title === 'PreSonus StudioLive 32S');
const ciUi = g.productTable.columns.findIndex(c => c.title === 'Soundcraft Ui24R');
const rows = {};
g.productTable.rows.forEach(r => { rows[r.label] = r; });
// C. table cells
rows['Form Factor'].values[ciDL] = V('4U Rackmount', 'Rack 4U');
rows['Mix Buses'].values[ciDL] = V('15 mix buses', '15 buses de mezcla');
rows['Local I/O (XLR)'].values[ciDL] = V('16 XLR + 16 Combo', '16 XLR + 16 combo');
rows['Processing Capacity'].values[ci32S] = V('40 mixing channels', '40 canales de mezcla');
rows['Local Outputs'].values[ciUi] = V('8 XLR + 2 XLR/TRS (Main)', '8 XLR + 2 XLR/TRS (principal)');
rows['Local I/O (XLR)'].values[ciUi] = V('24 inputs (20 XLR + line)', '24 entradas (20 XLR + línea)');
rows['Mix Buses'].values[ciUi] = V('8 aux/matrix + LR', '8 aux/matriz + LR');
// B. verdict DL32SE: 4U + Dante truth
const vd = g.verdictProsCons.find(x => x.name === 'Mackie DL32SE');
vd.pros = vd.pros.map(p => p === 'Compact 3U rack mount with Dante option' ? 'Compact 4U rack stagebox format with built-in handle' : p);
vd.pros_es = vd.pros_es.map(p => p === 'Rack compacto de 3U con opción Dante' ? 'Formato stagebox rack 4U compacto con asa integrada' : p);
vd.cons = vd.cons.map(p => p === 'Dante card is an additional purchase' ? 'No Dante or AES67 networking' : p);
vd.cons_es = vd.cons_es.map(p => p === 'La tarjeta Dante es una compra adicional' ? 'Sin red Dante ni AES67' : p);
G[gi] = g;
fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
// verify
const chk = JSON.stringify(g);
console.log('DL32S bare left:', (chk.match(/DL32S(?!E)/g) || []).length);
console.log('DL32SE count:', chk.split('DL32SE').length - 1);
console.log('3U left:', (chk.match(/3U Rackmount|3U con opci|rack de 3U/i) || []).length);
console.log('32 mix buses left:', chk.split('32 mix buses').length - 1, '/', chk.split('32 buses de mezcla').length - 1);