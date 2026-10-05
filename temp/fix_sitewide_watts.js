const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const P = require(DIR + 'data/products.json');
const G = require(DIR + 'data/guides.json');
function rep(obj, key, oldS, newS, tag) {
  if (!obj[key] || !obj[key].includes(oldS)) { console.log('MISS [' + tag + ']: ' + oldS.slice(0, 90)); process.exitCode = 1; return; }
  obj[key] = obj[key].split(oldS).join(newS);
  console.log('OK ' + tag);
}

// ---- products ----
const p294 = P.find(x => x.id === 294);
rep(p294.stores, 'gear4music', 'https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=https%3A%2F%2Fwww.gear4music.com%2FGuitar-and-Bass%2FPositive-Grid-Spark-2-50W-Practice-Amp-Black%2F7EJP', 'https://www.gear4music.com/Guitar-and-Bass/Positive-Grid-Spark-2-50W-Practice-Amp-Black/74HW', 'spark-g4m-url');

const p130 = P.find(x => x.id === 130);
rep(p130, 'desc', '4 selectable amp voices (Classic, Modern, British, Hi Gain)', '12 amp voices across Classic, Modern, British and Hi Gain categories', 'p130-voices');
rep(p130, 'desc', 'USB-C for firmware updates', 'USB for firmware updates', 'p130-usb');
rep(p130, 'desc_es', '4 voces seleccionables (Classic, Modern, British, Hi Gain)', '12 voces en categorías Classic, Modern, British y Hi Gain', 'p130-voices-es');
rep(p130, 'desc_es', 'USB-C para actualizaciones', 'USB para actualizaciones', 'p130-usb-es');
rep(p130, 'desc_es', 'Solo 12 libras.', 'Solo 5,4 kg.', 'p130-lb-es');

const p132 = P.find(x => x.id === 132);
rep(p132, 'desc', '500W of power through a 12-inch Markbass Neodymium Custom speaker with piezo tweeter.', '500W with an extension cab (300W standalone) through a 12-inch Markbass Neodymium Custom speaker with piezo tweeter.', 'p132-w');
rep(p132, 'desc', 'At just 26.6 lbs, it is the most portable 500W combo in the world. The best-selling Markbass amp worldwide.', 'At just 26.6 lbs, it is one of the most portable pro combos available.', 'p132-mkt');
rep(p132, 'desc_es', '500W a través de un altavoz Markbass Neodymium Custom de 12" con tweeter piezo.', '500W con cabina de extensión (300W solo) a través de un altavoz Markbass Neodymium Custom de 12" con tweeter piezo.', 'p132-w-es');
rep(p132, 'desc_es', 'Con solo 12.1 kg, es el combo de 500W más portátil del mundo. El amplificador Markbass más vendido del mundo.', 'Con solo 12,1 kg, es uno de los combos profesionales más portátiles.', 'p132-mkt-es');

const p483 = P.find(x => x.id === 483);
rep(p483, 'desc', 'Two 8-inch woofers plus coaxial tweeters deliver full-range sound', 'Two 6.5-inch woofers plus 1-inch tweeters deliver full-range sound', 'p483-spk');
rep(p483, 'desc', 'in one wireless box.', 'in one portable box (optional battery for cable-free use).', 'p483-bat');
rep(p483, 'desc_es', 'Dos woofers de 8 pulgadas con tweeters coaxiales dan un sonido de rango completo', 'Dos woofers de 6,5 pulgadas con tweeters de 1 pulgada dan un sonido de rango completo', 'p483-spk-es');
rep(p483, 'desc_es', 'en una sola caja inalámbrica.', 'en una sola caja portátil (batería opcional para uso sin cables).', 'p483-bat-es');

// ---- best-practice-amps table ----
let g = G.find(x => x.id === 'best-practice-amps');
let row = g.productTable.rows.find(r => r.label === 'Channels');
row.values[0].value = '1 (12 amp voices)'; row.values[0].value_es = '1 (12 voces)';
row.values[3].value = '15 guitar + 3 bass + 3 acoustic'; row.values[3].value_es = '15 guitarra + 3 bajo + 3 acústica';
console.log('OK bpa-channels');
row = g.productTable.rows.find(r => r.label === 'Weight');
row.values[0].value = '12 lb (5.4 kg)'; row.values[0].value_es = '5,4 kg';
console.log('OK bpa-weight');

// ---- best-bass-amps table ----
g = G.find(x => x.id === 'best-bass-amps');
row = g.productTable.rows.find(r => r.label === 'Type');
row.values[0].value = 'Solid-state, 250W (500W w/ ext. cab)'; row.values[0].value_es = 'Estado sólido, 250W (500W c/ cab. extensión)';
row.values[1].value = 'Solid-state, 350W (500W w/ ext. cab)'; row.values[1].value_es = 'Estado sólido, 350W (500W c/ cab. extensión)';
row.values[2].value = 'Solid-state, 300W (500W w/ ext. cab)'; row.values[2].value_es = 'Estado sólido, 300W (500W c/ cab. extensión)';
console.log('OK bba-type');
row = g.productTable.rows.find(r => r.label === 'Power');
row.values[0].value = '250W (500W w/ ext. cab)'; row.values[0].value_es = '250W (500W c/ cab. extensión)';
row.values[1].value = '350W (500W w/ ext. cab)'; row.values[1].value_es = '350W (500W c/ cab. extensión)';
row.values[2].value = '300W (500W w/ ext. cab)'; row.values[2].value_es = '300W (500W c/ cab. extensión)';
console.log('OK bba-power');
row = g.productTable.rows.find(r => r.label === 'Weight');
row.values[0].value = '39 lb (17.7 kg)'; row.values[0].value_es = '17,7 kg';
console.log('OK bba-weight');

// ---- best-bass-practice-amps table: THR battery ----
g = G.find(x => x.id === 'best-bass-practice-amps');
row = g.productTable.rows.find(r => r.label === 'Battery');
row.values[3].value = 'Yes, built-in (~5h)'; row.values[3].value_es = 'Sí, integrada (~5h)';
console.log('OK bbpa-battery');

// ---- residual check: any 20W near Spark 2? ----
const txt = JSON.stringify(G);
const spark20 = (txt.match(/Spark 2[^}]{0,300}20 ?[Ww]/g) || []).length;
console.log('Spark2+20W occurrences: ' + spark20);

fs.writeFileSync(DIR + 'data/products.json', JSON.stringify(P, null, 2));
fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(G, null, 2));
console.log('DONE exit=' + (process.exitCode || 0));