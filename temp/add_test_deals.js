var fs = require('fs');
var manual = JSON.parse(fs.readFileSync('data/manual-deals.json', 'utf8'));
var prods = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
function prod(id) { return prods.find(function (p) { return p.id === id; }); }
var today = new Date().toISOString().slice(0, 10);
var adds = [
  {
    product_id: 375,
    title: 'XLN Audio RC-20 Retro Color',
    title_es: 'XLN Audio RC-20 Retro Color',
    price: 29, old_price: 99, currency: '$', store: 'pluginboutique',
    store_url: 'https://www.pluginboutique.com/product/2-Effects/44-Saturation/3016-RC-20-Retro-Color',
    img: prod(375).img,
    badge_en: 'Save $70', badge_es: 'Ahorra $70',
    desc: 'Creative FX plugin that recreates the warm feel of vintage recording gear. 6 effect modules: Noise, Wobble, Distortion, Digital, Space and Magnetic — 70% off until Oct 16.',
    desc_es: 'Plugin creativo que recrea la calidez del equipo vintage. 6 módulos: Noise, Wobble, Distortion, Digital, Space y Magnetic — 70% de descuento hasta el 16 de octubre.',
    date_added: today, source: 'manual-test'
  },
  {
    product_id: null,
    title: 'QSC K10.2 Powered Loudspeaker',
    title_es: 'Altavoz autoamplificado QSC K10.2',
    price: 799.99, old_price: 899.99, currency: '$', store: 'zzounds',
    store_url: 'https://www.zzounds.com/item--QSCK102?siid=195217',
    img: '',
    badge_en: 'Save $100', badge_es: 'Ahorra $100',
    desc: '2000W 10-inch powered PA speaker. Save $100 per speaker, live on zZounds.',
    desc_es: 'Altavoz PA autoamplificado de 2000W y 10 pulgadas. Ahorra $100 por unidad, en vivo en zZounds.',
    date_added: today, source: 'manual-test'
  },
  {
    product_id: null,
    title: 'Fender Squier Stratocaster Bundle with Amp',
    title_es: 'Pack Fender Squier Stratocaster con amplificador',
    price: 219.99, old_price: 259.99, currency: '$', store: 'amazon',
    store_url: 'https://www.amazon.com/dp/B0F1D8H64K',
    img: '',
    badge_en: 'Save $40', badge_es: 'Ahorra $40',
    desc: 'Torino Red Stratocaster bundle with amplifier, gig bag, strap, cable, picks and DVD. 16% off for Prime Big Deal Days.',
    desc_es: 'Pack Stratocaster Torino Red con amplificador, funda, correa, cable, púas y DVD. 16% de descuento en los Prime Big Deal Days.',
    date_added: today, source: 'manual-test'
  },
  {
    product_id: null,
    title: 'JPTR FX Warlow Fuzz',
    title_es: 'Fuzz JPTR FX Warlow',
    price: 125.3, old_price: 179, currency: '€', store: 'reverb',
    store_url: 'https://reverb.com/item/39478162-jptr-fx-warlow-fuzz-monstrosity',
    img: '',
    badge_en: 'Save €53.7', badge_es: 'Ahorra €53.7',
    desc: 'Fuzz monstrosity pedal. 30% price drop live on Reverb.',
    desc_es: 'Pedal fuzz monstruoso. Bajada del 30% en vivo en Reverb.',
    date_added: today, source: 'manual-test'
  }
];
adds.forEach(function (d) {
  if (!manual.some(function (x) { return x.title === d.title && x.store === d.store; })) manual.push(d);
});
fs.writeFileSync('data/manual-deals.json', JSON.stringify(manual, null, 2) + '\n');
console.log('manual total: ' + manual.length);
