const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const G = JSON.parse(fs.readFileSync(DIR + 'data/guides.json', 'utf8'));
const g = G.find(v => v.id === 'guitar-pedals');
if (!g) throw new Error('guide not found');
const V = (value, value_es) => ({ value, value_es });

// 1) featured: full section union in table order
g.featuredProducts = [96, 97, 98, 99, 100, 135, 136, 443];
console.log('1) featured set');

// 2) verified price cells (TEST_SHOP_BTN: 99=$99.99, 100=$129.00, 443=$83.50)
{
  const row = g.productTable.rows.find(r => r.label === 'Estimated Price');
  const fix = (i, from, to) => {
    if (row.values[i].value !== from) throw new Error('unexpected cell ' + i + ': ' + row.values[i].value);
    row.values[i].value = to; row.values[i].value_es = to;
  };
  fix(3, '~$99.99', '$99.99');
  fix(4, '~$129', '$129.00');
  fix(5, '~$83.50', '$83.50');
  console.log('2) price cells fixed');
}

// 3) BigSky MX column (specs verified: strymon.net official page + manual)
{
  const t = g.productTable;
  if (t.columns.some(c => c.title === 'Strymon BigSky MX')) throw new Error('BigSky col exists');
  if (t.columns.length !== 7) throw new Error('expected 7 cols, got ' + t.columns.length);
  t.columns.push({ title: 'Strymon BigSky MX', title_es: 'Strymon BigSky MX' });
  const put = (label, en, es) => {
    const r = t.rows.find(rr => rr.label === label);
    if (!r) throw new Error('no row ' + label);
    if (r.values.length !== 7) throw new Error('row ' + label + ' has ' + r.values.length + ' values');
    r.values.push(V(en, es));
  };
  put('Best For', 'Studio-grade ambient reverb', 'Reverb ambiental de calidad estudio');
  put('Estimated Price', '$679.00', '$679.00');
  put('Signal Chain', 'Last', 'Al final');
  put('Type', 'Digital reverb', 'Reverb digital');
  put('Controls', '9 knobs + OLED + 3 footswitches', '9 mandos + OLED + 3 footswitches');
  put('Bypass', 'True / Buffered selectable', 'True / Buffered seleccionable');
  put('Power', '9V DC (adapter required)', '9V DC (requiere adaptador)');
  put('Current Draw', '500 mA', '500 mA');
  put('Size', 'Large (172 x 127 x 48 mm)', 'Grande (172 x 127 x 48 mm)');
  put('Standout Feature', '12 reverbs, dual engine, 300 presets', '12 reverbs, motor dual, 300 presets');
  console.log('3) BigSky column added');
}

fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(G, null, 2) + '\n');
console.log('guides.json written');
