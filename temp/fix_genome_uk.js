const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const p = products.find(x => x.id === 1020);
console.log('GENOME actual pbCur: us=$' + (p.pbCur?.us || '?') + ' uk=£' + (p.pbCur?.uk || '?'));

// usuario vio £112 en UK con VPN
// PB EU actual = €131
// UK observado = £112
// US estimado desde UK: 112 / 0.7959 = 140.73, o desde EU: 131 / 1.0084 = 129.9
// mejor: si PB UK = £112, el US real probablemente ~$141 (ratio ~1.26)
// pero lo seguro: usar lo que el usuario vio y recalcular US desde ratio real
const US_desde_UK = (112 / 0.7959).toFixed(2);
console.log('US estimado desde £112/0.7959 = $' + US_desde_UK);

let bg = fs.readFileSync(B + 'build-guides.js', 'utf8');
const viejo = '\n1020: {prices:{pluginboutique:"\u20AC131.08"},pbCur:{us:"$129.99",uk:"\u00A3103.46"}},';
const nuevo = '\n1020: {prices:{pluginboutique:"\u20AC131.08"},pbCur:{us:"$' + US_desde_UK + '",uk:"\u00A3112.00"}},';
if (!bg.includes(viejo)) { console.log('NO encontrado'); process.exit(1); }
bg = bg.replace(viejo, nuevo);
fs.writeFileSync(B + 'build-guides.js', bg, 'utf8');
console.log('TEST actualizado: ' + nuevo.trim());

// productos.json: actualizar pbCur para que sea consistente (opcional)
p.pbCur = { us: '$' + US_desde_UK, uk: '£112.00' };
fs.writeFileSync(B + 'data/products.json', JSON.stringify(products, null, 2), 'utf8');
console.log('products.json actualizado');