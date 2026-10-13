var fs = require('fs');

// ============ 1. products.json ============
var p = 'data/products.json';
var ps = JSON.parse(fs.readFileSync(p, 'utf8'));

// --- Fix 59: K&M 26722 Each ---
var k = ps.find(function (x) { return x.id === 59; });
k.title = 'K&M 26722 Monitor Stands (Each)';
k.title_es = 'Soportes de Monitor K&M 26722 (Unidad)';
k.mpn = '26722';
k.desc = 'Height-adjustable steel monitor stands (677–1132 mm) with 35 kg capacity, large rubber decoupling pads and internal cable routing. Get tweeters at ear level for accurate monitoring. Sold each (~€156 the pair).';
k.desc_es = 'Soportes de monitor de acero ajustables en altura (677–1132 mm) con 35 kg de capacidad, grandes almohadillas de goma de desacoplamiento y canalización interna de cables. Coloca los tweeters a la altura de los oídos. Se venden por unidad (~€156 el par).';
delete k.stores.andertons;
console.log('59 fixed: ' + k.title);

// --- Fix 645: Focal Alpha 65 Evo (verified data) ---
var f = ps.find(function (x) { return x.id === 645; });
f.price = 499;
f.desc = 'Front-ported 6.5-inch studio monitor with Slatefiber cone woofer and 1-inch aluminium inverted dome tweeter. Class D bi-amp (55 W LF + 30 W HF), 104 dB max SPL, 40 Hz–22 kHz. XLR + TRS + RCA. Ideal when the desk must sit against the wall.';
f.desc_es = 'Monitor de estudio bass-reflex frontal de 6,5 pulgadas con woofer Slatefiber y tweeter de cúpula invertida de aluminio de 1 pulgada. Bi-amplificación Clase D (55 W graves + 30 W agudos), 104 dB SPL máximo, 40 Hz–22 kHz. XLR + TRS + RCA. Ideal cuando el escritorio va pegado a la pared.';
f.img = 'https://r2.gear4music.com/media/65/655758/1200/preview.jpg';
f.stores = {
  gear4music: 'https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=' + encodeURIComponent('https://www.gear4music.com/Recording-and-Computers/Focal-Alpha-65-Evo-Active-Studio-Monitor/3T37'),
  andertons: 'https://www.andertons.co.uk/focal-alpha-65-evo-active-studio-monitor-each/',
  amazon: 'https://www.amazon.com/Focal-Professional-Alpha-Studio-Monitors/dp/B0989ZV9BH'
};
console.log('645 fixed: ' + f.title);

// --- Delete invented 646-651 ---
var before = ps.length;
ps = ps.filter(function (x) { return x.id < 646 || x.id > 651; });
console.log('deleted invented: ' + (before - ps.length));
fs.writeFileSync(p, JSON.stringify(ps, null, 2));

// ============ 2. build-guides.js TEST_SHOP_BTN ============
var b = 'build-guides.js';
var src = fs.readFileSync(b, 'utf8');
function replaceBlock(id, newBlock) {
  var key = '\n  ' + id + ': {';
  var i = src.indexOf(key);
  if (i === -1) { console.log('BLOCK ' + id + ' NOT FOUND'); process.exit(1); }
  var j = src.indexOf('{', i);
  var depth = 0, k = j;
  while (k < src.length) {
    if (src[k] === '{') depth++;
    else if (src[k] === '}') { depth--; if (depth === 0) break; }
    k++;
  }
  var end = k + 1;
  if (src[end] === ',') end++;
  src = src.slice(0, i) + '\n' + newBlock + src.slice(end);
  console.log('block ' + id + ' replaced');
}
function deleteBlock(id) {
  var key = '\n  ' + id + ': {';
  var i = src.indexOf(key);
  if (i === -1) { console.log('BLOCK ' + id + ' NOT FOUND for delete'); process.exit(1); }
  var j = src.indexOf('{', i);
  var depth = 0, k = j;
  while (k < src.length) {
    if (src[k] === '{') depth++;
    else if (src[k] === '}') { depth--; if (depth === 0) break; }
    k++;
  }
  var end = k + 1;
  if (src[end] === ',') end++;
  // also swallow one trailing newline if present to avoid blank lines
  src = src.slice(0, i) + src.slice(end);
  console.log('block ' + id + ' deleted');
}

replaceBlock(59, "  59: {\n    prices: {\n      gear4music: \"£82.20\",\n      musicstore: \"€78.00\"\n    },\n    urls: {\n      zzounds: \"https://www.zzounds.com/a--925521/item--KMS26754\"\n    },\n    oos: [\n      \"zzounds\"\n    ]\n  },");
replaceBlock(645, "  645: {\n    prices: {\n      gear4music: \"£277.00\",\n      andertons: \"£275.00\"\n    },\n    urls: {\n      gear4music: \"https://www.gear4music.com/Recording-and-Computers/Focal-Alpha-65-Evo-Active-Studio-Monitor/3T37\",\n      andertons: \"https://www.andertons.co.uk/focal-alpha-65-evo-active-studio-monitor-each/\",\n      amazon: \"https://www.amazon.com/Focal-Professional-Alpha-Studio-Monitors/dp/B0989ZV9BH\"\n    },\n    oos: [\n      \"andertons\"\n    ]\n  },");
[646, 647, 648, 649, 650, 651].forEach(deleteBlock);
fs.writeFileSync(b, src);
console.log('TEST_SHOP_BTN updated');

// ============ 3. studio-furniture spikes/price fixes ============
var g = 'data/guides.json';
var d = JSON.parse(fs.readFileSync(g, 'utf8'));
var sf = d.find(function (x) { return x.id === 'studio-furniture'; });
var s2 = sf.sections[2];
s2.content = s2.content.split('mechanically separate them from the floor with adjustable spikes').join('mechanically separate them from the floor with large rubber pads');
s2.content_es = s2.content_es.split('los separan mecánicamente del suelo con puntas ajustables').join('los separan mecánicamente del suelo con grandes almohadillas de goma');
var vpc = sf.verdictProsCons.find(function (v) { return v.name === 'K&M Monitor Stands (Pair)'; });
vpc.name = 'K&M 26722 Monitor Stands (Each)';
vpc.name_es = 'Soportes de Monitor K&M 26722 (Unidad)';
vpc.pros = vpc.pros.map(function (t) { return t.split('Floor spikes mechanically decouple speakers and tighten bass response').join('Rubber pads mechanically decouple speakers and tighten bass response').split('Improve monitoring accuracy more than an extra on speakers').join('Improve monitoring accuracy more than spending extra on speakers'); });
vpc.pros_es = vpc.pros_es.map(function (t) { return t.split('Las puntas de piso desacoplan mecánicamente los altavoces y aprietan la respuesta de graves').join('Las almohadillas de goma desacoplan mecánicamente los altavoces y aprietan la respuesta de graves').split('Mejoran la precisión del monitoreo más que extra en altavoces').join('Mejoran la precisión del monitoreo más que gastar extra en altavoces'); });
vpc.cons = vpc.cons.map(function (t) { return t.split('Spiked feet can scratch hardwood floors').join('Each stand is sold separately — budget around €156 for the pair').split(/^ they cost three times.*$/).join('A pair costs around €156 — three times the AcouFoam 6 pads, which solve desk decoupling for less'); });
vpc.cons_es = vpc.cons_es.map(function (t) { return t.split('Las puntas de piso pueden rayar pisos de madera').join('Cada soporte se vende por separado — calcula unos €156 el par').split('Cuestan tres veces los AcouFoam 6, que resuelven el desacoplamiento del escritorio por menos').join('El par cuesta unos €156 — tres veces los AcouFoam 6, que resuelven el desacoplamiento del escritorio por menos'); });
sf.productTable.rows.forEach(function (r) {
  if (r.label === 'Estimated Price') {
    r.values[1].value = r.values[1].value.split('~$165.99').join('~$78 each (~$156 pair)');
    r.values[1].value_es = r.values[1].value_es.split('~$165.99').join('~$78 c/u (~$156 par)');
  }
  if (r.label === 'Type') {
    if (r.values[1].value === 'Monitor stands (pair)') r.values[1].value = 'Monitor stands (each)';
    if (r.values[1].value_es === 'Soportes de monitor (par)') r.values[1].value_es = 'Soportes de monitor (unidad)';
  }
  if (r.label === 'Feature') {
    if (r.values[1].value === 'Steel base, carpet spikes') r.values[1].value = 'Steel, rubber pads, 677–1132 mm';
    if (r.values[1].value_es === 'Base de acero, púas') r.values[1].value_es = 'Acero, almohadillas goma, 677–1132 mm';
  }
});
fs.writeFileSync(g, JSON.stringify(d, null, 2));
console.log('studio-furniture fixed');
console.log('PHASE 1 DONE');
