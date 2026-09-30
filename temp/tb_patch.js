const fs = require('fs');

const DESC_EN = "The Epiphone Thunderbird '64 is the modern revival of the iconic reverse-body shape: 9-ply mahogany/walnut neck-through-body construction with a rounded 60s bass neck, two ProBucker 760 humbuckers with their own volume controls plus a master tone, and an Indian laurel 20-fret fingerboard over a 34-inch scale. The vintage Tune-O-Matic bridge, claw and open-gear tuners complete the 1960s look, in Ember Red or Silver Mist.";
const DESC_ES = "El Epiphone Thunderbird '64 es la resurrección moderna de la icónica silueta de cuerpo inverso: construcción neck-through-body de 9 capas de caoba/nogal con mástil redondeado de los años 60, dos humbuckers ProBucker 760 con volumen propio cada una más un tono maestro, y fingerboard de laurel indio de 20 trastes sobre una escala de 34 pulgadas. El puente Tune-O-Matic vintage, el claw y las clavijas open-gear completan el look de los años 60, en Ember Red o Silver Mist.";

function load(f) { return { raw: fs.readFileSync(f, 'utf8'), data: JSON.parse(fs.readFileSync(f, 'utf8')) }; }
function save(f, raw, data) {
  const nl = /\n$/.test(raw);
  fs.writeFileSync(f, JSON.stringify(data, null, 2) + (nl ? '\n' : ''), 'utf8');
}

// ---------- products.json: id 162 ----------
{
  const f = 'data/products.json';
  const { data } = load(f);
  const p = data.find(x => x.id === 162);
  if (!p) throw new Error('id 162 no encontrado');
  p.title = "Epiphone Thunderbird '64 Bass";
  p.title_es = "Epiphone Thunderbird '64 Bass";
  p.price = 849;
  p.reviews = 80;
  p.desc = DESC_EN;
  p.desc_es = DESC_ES;
  p.stores = {
    gear4music: 'https://www.gear4music.com/Guitar-and-Bass/Epiphone-Thunderbird-64-Silver-Mist/6V1B',
    amazon: 'https://www.amazon.com/dp/B0CT44NB9F',
    andertons: 'https://www.andertons.co.uk/epiphone-thunderbird-64-silver-mist-with-premium-gig-bag/',
    zzounds: 'https://www.zzounds.com/item--EPIEIGTB6',
    musicstore: 'https://www.musicstore.com/en_OE/EUR/Epiphone-Thunderbird-64-Ember-Red/art-BAS0012560-000',
    reverb: 'https://reverb.com/marketplace?query=Epiphone%20Thunderbird%2064'
  };
  delete p.oos;
  save(f, fs.readFileSync(f, 'utf8'), data);
  console.log('products.json id 162 actualizado');
}

// ---------- deals.json ----------
{
  const f = 'data/deals.json';
  const { data } = load(f);
  const d = data.find(x => x.product_id === 162);
  if (!d) throw new Error('deal 162 no encontrado');
  d.title = "Epiphone Thunderbird '64 Bass";
  d.title_es = "Epiphone Thunderbird '64 Bass";
  d.desc = DESC_EN;
  d.desc_es = DESC_ES;
  save(f, fs.readFileSync(f, 'utf8'), data);
  console.log('deals.json id 162 actualizado (£' + d.price + ' de £' + d.old_price + ', ' + d.store + ')');
}

// ---------- guides.json: budget-bass-like-expensive ----------
{
  const f = 'data/guides.json';
  const { data } = load(f);
  const g = data.find(x => x.id === 'budget-bass-like-expensive');
  if (!g) throw new Error('guia no encontrada');

  const s5 = g.sections[5];
  s5.heading = "Epiphone Thunderbird '64 Bass: The Rock Icon Without the Vintage Price Tag";
  s5.heading_es = "Epiphone Thunderbird '64 Bass: el icono del rock sin el precio de un vintage";
  s5.content = '<strong>The Thunderbird has a head-turning design with a sound to match.</strong> 9-ply mahogany/walnut neck-through-body construction with a rounded 60s bass neck, something you normally only see on $2,000+ boutique basses. Two ProBucker 760 humbuckers each get their own volume control plus a master tone, so you can actually balance both pickups instead of dialling one in. It is the most expensive bass in this guide and the closest thing here to a boutique instrument, but it still undercuts a vintage-original Thunderbird by a wide margin.';
  s5.content_es = '<strong>El Thunderbird tiene un diseño que no pasa desapercibido y un sonido que iguala.</strong> Construcción neck-through-body de 9 capas de caoba/nogal con mástil redondeado de los años 60, algo que normalmente solo ves en bajos de boutique de más de $2.000. Cada una de las dos humbuckers ProBucker 760 tiene su propio volumen además de un tono maestro, así que puedes equilibrar las dos pastillas en lugar de subir solo una. Es el bajo más caro de esta guía y lo más parecido a un instrumento de boutique, pero sigue saliendo mucho más barato que un Thunderbird original de los años 60.';

  const col = g.productTable.columns[5];
  col.title = "Epiphone Thunderbird '64 Bass";
  col.title_es = "Epiphone Thunderbird '64 Bass";
  const rows = [
    ['Iconic reverse-body look & rock growl', 'Diseño de cuerpo inverso icónico y growl de rock'],
    ['9-ply mahogany/walnut, neck-through', '9 capas caoba/nogal, neck-through'],
    ['Mahogany/walnut, 20 frets', 'Caoba/nogal, 20 trastes'],
    ['20, Indian laurel, 12" radius', '20, laurel indio, radio 12"'],
    ['2x ProBucker 760 humbuckers', '2 humbuckers ProBucker 760'],
    ['Passive', 'Pasivo'],
    ['34 in (864 mm)', '34" (864 mm)'],
    ['2 volumes + master tone', '2 volúmenes + tono maestro'],
    ['Open-gear, 19:1', 'Open-gear, 19:1'],
    ['8.8 lb (4.0 kg)', '4,0 kg']
  ];
  g.productTable.rows.forEach((r, i) => {
    const cell = (r.values || [])[5];
    if (!cell) throw new Error('fila ' + i + ' sin columna 5');
    cell.value = rows[i][0];
    cell.value_es = rows[i][1];
  });

  const pc = g.verdictProsCons[10];
  pc.name = "Epiphone Thunderbird '64 Bass";
  pc.name_es = "Epiphone Thunderbird '64 Bass";
  pc.pros = [
    '9-ply mahogany/walnut neck-through build, a feature normally reserved for boutique-priced basses',
    'Two ProBucker 760 humbuckers with individual volume plus master tone',
    'Vintage Tune-O-Matic bridge, claw and rounded 60s neck nail the period look',
    'It is the closest you can get to a brand-new vintage-original Thunderbird'
  ];
  pc.pros_es = [
    'Construcción neck-through de 9 capas de caoba/nogal, normalmente reservada a bajos de precio boutique',
    'Dos humbuckers ProBucker 760 con volumen propio cada una más un tono maestro',
    'Puente Tune-O-Matic vintage, claw y mástil redondeado de los 60 que reproducen el look de época',
    'Es lo más parecido que encontrarás a un Thunderbird original nuevo'
  ];
  pc.cons = [
    'Open-gear tuners and a 20-fret neck look dated next to locking tuners and 22 frets',
    'Heavy and prone to neck dive, like every reverse-body Thunderbird',
    'Its thick tone is specialised, not versatile across genres',
    'It is the priciest bass in this guide, so value hunters should look elsewhere'
  ];
  pc.cons_es = [
    'Clavijas open-gear y solo 20 trastes se ven anticuados frente a clavijas bloqueantes y 22 trastes',
    'Pesado y propenso al neck dive, como todo Thunderbird de cuerpo inverso',
    'Su tono grueso es especializado, no versátil entre géneros',
    'Es el bajo más caro de esta guía: si buscas la mejor relación calidad-precio, mira otras opciones'
  ];

  const swap = (obj, key, from, to) => {
    const before = obj[key];
    const n = before.split(from).length - 1;
    if (n !== 1) throw new Error(key + ': esperaba 1 coincidencia de "' + from + '", halladas ' + n);
    obj[key] = before.replace(from, to);
  };
  swap(g, 'verdict', 'the Epiphone Thunderbird for rock looks and tone', "the Epiphone Thunderbird '64 for the iconic reverse-body look and neck-through feel");
  swap(g, 'verdict_es', 'y el Epiphone Thunderbird por el look y tono rock', "y el Epiphone Thunderbird '64 por el diseño de cuerpo inverso y la sensación neck-through");
  swap(g, 'conclusion', "And the Epiphone Thunderbird '60s proves that iconic designs don't require iconic price tags.", "And the Epiphone Thunderbird '64 brings back the reverse-body shape that defined the genre, for a fraction of what a boutique reissue costs.");
  swap(g, 'conclusion', 'like it cost four times as much', 'like it cost several times as much');
  swap(g, 'description', 'and Epiphone Thunderbird reviewed.', "and Epiphone Thunderbird '64 reviewed.");
  swap(g, 'description_es', 'y Epiphone Thunderbird revisados honestamente.', "y Epiphone Thunderbird '64 revisados honestamente.");

  const left = [];
  const scan = (o, p) => {
    if (typeof o === 'string') { if (/thunderbird/i.test(o) && /'60s/i.test(o)) left.push(p); }
    else if (Array.isArray(o)) o.forEach((v, i) => scan(v, p + '[' + i + ']'));
    else if (o && typeof o === 'object') for (const [k, v] of Object.entries(o)) scan(v, p ? p + '.' + k : k);
  };
  scan(g, '');
  if (left.length) throw new Error('quedan referencias al modelo 60s en: ' + left.join(', '));
  save(f, fs.readFileSync(f, 'utf8'), data);
  console.log('guides.json budget-bass-like-expensive actualizado; refs al 60s restantes: 0');
}
