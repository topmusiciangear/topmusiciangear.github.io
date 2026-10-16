const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const PB = 'https://www.pluginboutique.com';
const BN = h => 'https://banners.pluginboutique.com/' + h;

// ---- 1. Rewrite products (keep ids) ----
const REWRITE = {
  1005: { brand: 'Reveal Sound', title: 'Spire', price: 189, url: PB + '/product/1-Instruments/4-Synth/3187-Spire', img: BN('warmqntofktskm6jlmij71apel3r'), desc: 'A versatile software/hardware-hybrid style polyphonic synth and a defining sound of trance, big-room and progressive, with four flexible oscillators and deep modulation.' },
  1008: { brand: 'SongWish', title: 'reMIDI 4', price: 128, url: PB + '/product/3-Studio-Tools/93-Music-Theory-Tools/11756-reMIDI-4', img: BN('s4yfqy2f67yzyvey39fg0x9qodup'), desc: 'A one-of-a-kind MIDI sampler: load any MIDI file, slice it, sequence it and turn loops into playable instruments with drag-and-drop export.' },
  1011: { brand: 'Audiomodern', title: 'Riffer 4', price: 79, url: PB + '/product/3-Studio-Tools/93-Music-Theory-Tools/17976-Riffer-4', img: BN('0sg14v6ku6iiczxxzohkr3rst4q0'), desc: 'Generative MIDI sequencer that writes melodies, basslines and riffs locked to your scale, with density control and instant MIDI export.' },
  1013: { brand: 'MeldaProduction', title: 'MeldwayGrand', price: 299, url: PB + '/product/1-Instruments/64-Virtual-Instruments/9856-MeldwayGrand', img: BN('y6ruklv61rrkb4zs70uvs2qaw6a8'), desc: 'A deeply sampled Steinway Model D concert grand piano with the character and dynamic range of the real nine-foot instrument.' },
  1017: { brand: 'Native Instruments', title: 'Noire', price: 149, url: PB + '/product/1-Instruments/55-Kontakt-Instrument/12485-Noire', img: BN('75iu3hpg9mkbea3o7dn8iq3z4gb9'), desc: 'A felt piano and concert grand in one: intimate felt textures plus a pure grand, with a particles engine for evolving cinematic beds.' },
  1018: { brand: 'Arturia', title: 'Augmented GRAND PIANO', price: 99, url: PB + '/product/1-Instruments/64-Virtual-Instruments/9804-Augmented-GRAND-PIANO', img: BN('uzdlu44y059f7y02h43mhfqz924v'), desc: 'A concert grand fused with synthesis: morph real piano into abstract textures with multi-layer engines and expressive controls.' },
  1020: { brand: 'Two Notes Audio Engineering', title: 'GENOME', price: 199, url: PB + '/product/2-Effects/18-Amp-Simulator/11868-GENOME', img: BN('degtiwlneczkuafztq2zr2renxvk'), desc: 'All-in-one amp modeler, FX suite and virtual cabinet engine with component-level amps and studio-grade DynIR cabinets.' },
  1022: { brand: 'Kiive Audio', title: 'Lunchbox Amp Sim', price: 69.99, url: PB + '/product/2-Effects/18-Amp-Simulator/8290-Lunchbox-Amp-Sim', img: BN('5w0ymtt48r6z40p38hhooeui8e28'), desc: 'A focused recreation of a classic British valve amp with three cabinets, overdrive, delay and room reverb in one simple plugin.' },
  1023: { brand: 'Softube', title: 'Amp Room: Marshall Suite', price: 149, url: PB + '/product/2-Effects/76-Expansion-Packs/10683-Amp-Room-Marshall-Suite', img: BN('o5x4itfzvc9hqff0213kchx0wc10'), desc: 'Official Marshall amps, cabs and pedals inside Softube Amp Room, including the Amp Room platform with studio effects.' },
  1019: { price: 199, img: BN('jptiw2smsgralmbbdhj8d79svszx') },
  1021: { price: 149, img: BN('b7wujbos8fch8dadchho2tzpm4mr') },
  1025: { price: 399, url: PB + '/product/3-Studio-Tools/51-Audio-Restoration-/17211-RX-12-Standard', img: BN('2yetut6fao53gj36ye7xfcuewwww') },
  1027: { price: 129, img: BN('aeqag15we4bm2v2wg212b6t5edba') },
  1028: { price: 99, img: BN('buibngd8ivuqtg4yvlaf6xjpc5pt') },
  1030: { price: 269, url: PB + '/product/3-Studio-Tools/51-Audio-Restoration-/2702-UNVEIL', img: BN('wj6te3gyn6px8qo8lugrjd0a73wu') },
  1031: { brand: 'Antares', title: 'Auto-Tune Pro 11', price: 459, url: null, img: 'https://antares.sfo2.cdn.digitaloceanspaces.com/imgs/AutoTune-Meta-Tag-1200x600.jpg', desc: 'The industry-standard real-time pitch correction plugin, from transparent tuning to the modern vocal effect, for stage and studio.' },
  1032: { price: 99, img: BN('qdfsqivygm8n57nfjkjya2hfk8wr') },
  1033: { price: 499, img: BN('7bnflyc2oi7o41h60h21yvq6ac12') },
  1034: { price: 519, img: BN('hn12vqrm5mixwlbynfwworwbpnxv') },
  1035: { price: 149, url: PB + '/product/2-Effects/54-Vocal-Processing/17930-VocAlign-7-Pro', img: BN('b8jg9c0oxvst6hygq7zia0ok6r9q') },
  1036: { brand: 'Synchro Arts', title: 'Revoice Pro 5', price: 299, url: PB + '/product/2-Effects/54-Vocal-Processing/11742-Revoice-Pro-5', img: BN('di4ovto80m33kues2n5n5n49qav7') },
  1038: { price: 149, url: null, img: 'https://nugenaudio.com/wp-content/uploads/2017/05/ISL_2-AppropriateSize-Copy-1.jpg' },
  1039: { price: 249 },
  1001: { img: BN('etpqmnvokozg562g8z1b2kg5mr8g') },
  1002: { img: BN('jjtxcaj92opd7aj4o2m4rhn0pxfn') },
  1003: { img: BN('jnwbrtbrrawm1wttmvlz6ctk5rqb') },
  1004: { img: BN('vd8hbyhcfh7r8ubkg2t9859jngev') },
  1006: { img: BN('2vp52qs6spuhoqtdlc04qnqkzizf') },
  1007: { img: BN('pirymspz16aejnhm9msircvs0eth') },
  1009: { img: BN('a29ih200d4s1f2h2vj0xxq12eslc') },
  1010: { img: BN('mhwbaax0cbmjc7zdij5jvfszh1e3') },
  1012: { img: BN('vgx6o79rqm5hcla00vxcc0y4vbqg') },
  1014: { img: BN('ol54b93phhlc4evsrjr8txrsj537') },
  1015: { img: BN('c2mhr9eoakhqvodf5qwlzp3x8372') },
  1016: { img: BN('upnwpyek4h1gblxv2jlb9r01qxu2') }
};
Object.entries(REWRITE).forEach(([id, patch]) => {
  const p = products.find(x => x.id === Number(id));
  if (!p) { console.log(id + ': NOT FOUND'); return; }
  if (patch.brand) p.brand = patch.brand;
  if (patch.title) p.title = patch.title;
  if (patch.price !== undefined) p.price = patch.price;
  if (patch.img) p.img = patch.img;
  if (patch.desc) p.desc = patch.desc;
  if (patch.url === null) { if (p.stores) delete p.stores.pluginboutique; }
  else if (patch.url) { p.stores = p.stores || {}; p.stores.pluginboutique = patch.url; }
  if (p.title.startsWith(p.brand + ' ' + p.brand)) p.title = p.title.replace(p.brand + ' ' + p.brand, p.brand);
  console.log(id + ': ' + p.brand + ' ' + p.title + ' $' + p.price + (patch.url === null ? ' [PB search fallback]' : ''));
});
// 472 dupe-brand fix (appears in repair guide)
const p472 = products.find(x => x.id === 472);
if (p472 && p472.title.startsWith('Baby Audio Baby Audio')) { p472.title = 'Baby Audio Smooth Operator Pro'; console.log('472 title fixed'); }
// ---- 2. Delete products 1024/1026/1029/1037 ----
[1024, 1026, 1029, 1037].forEach(id => {
  const i = products.findIndex(x => x.id === id);
  if (i > -1) { console.log('Deleted product: ' + products[i].brand + ' ' + products[i].title); products.splice(i, 1); }
});
products.sort((a, b) => a.id - b.id);
fs.writeFileSync(B + 'data/products.json', JSON.stringify(products, null, 2), 'utf8');
console.log('Total products: ' + products.length);

// ---- 3. TEST_SHOP_BTN: rewrite geo entries, delete 4 ----
let bg = fs.readFileSync(B + 'build-guides.js', 'utf8');
const R_EUR = 1.0084, R_GBP = 0.7959;
const fmt = (sym, v) => sym + v.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
// id -> [usd] or {eur,us,uk} explicit
const PRICES = {
  1001: 199, 1002: 179, 1003: 199, 1004: 249, 1005: 189, 1006: 199, 1007: 99,
  1008: 128, 1010: 89, 1011: 79, 1013: 299, 1014: 299, 1015: 699, 1016: 99,
  1017: 149, 1018: 99, 1019: 199, 1020: 199, 1021: 149, 1022: 69.99, 1023: 149,
  1025: 399, 1027: 129, 1028: 99, 1031: 459, 1032: 99, 1033: 499, 1034: 519,
  1035: 149, 1036: 299, 1038: 149, 1039: 249,
  1009: { eur: 130.08, us: 129.00, uk: 102.67 },
  1012: { eur: 149.00, us: 149.00, uk: 118.59 },
  1030: { eur: 279.00, us: 269.00, uk: 214.10 }
};
Object.entries(PRICES).forEach(([id, v]) => {
  let eur, us, uk;
  if (typeof v === 'number') { us = v; eur = us * R_EUR; uk = us * R_GBP; }
  else ({ eur, us, uk } = v);
  const line = id + ': {prices:{pluginboutique:"' + fmt('€', eur) + '"},pbCur:{us:"' + fmt('$', us) + '",uk:"' + fmt('£', uk) + '"}},';
  const re = new RegExp('^[ \\t]*' + id + ': \\{prices:\\{pluginboutique:"[^"]+"\\}(,pbCur:\\{us:"[^"]*",uk:"[^"]*"\\})?\\},?$', 'm');
  if (!re.test(bg)) { console.log(id + ': TEST NO MATCH'); return; }
  bg = bg.replace(re, () => line);
});
[1024, 1026, 1029, 1037].forEach(id => {
  const re = new RegExp('^[ \\t]*' + id + ': \\{prices:\\{pluginboutique:"[^"]+"\\}(,pbCur:\\{us:"[^"]*",uk:"[^"]*"\\})?\\},?\\n?', 'm');
  if (re.test(bg)) { bg = bg.replace(re, () => ''); console.log('TEST entry deleted: ' + id); }
  else console.log(id + ': TEST already absent');
});
fs.writeFileSync(B + 'build-guides.js', bg, 'utf8');
try { new Function(bg); console.log('SYNTAX OK'); }
catch (e) { console.log('SYNTAX ERROR: ' + e.message); }
