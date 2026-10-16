const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const clean = 'https://r2.gear4music.com/media/106/1061367/1200/preview.jpg';
fetch(clean, { method: 'HEAD' }).then(r => {
  console.log('foto: ' + r.status + ' | ' + r.headers.get('content-type'));
  if (r.status !== 200) process.exit(1);
  const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
  const p = products.find(x => x.id === 1034);
  p.image = clean;
  p.img = clean;
  p.stores.gear4music = 'https://www.gear4music.com/Recording-and-Computers/FabFilter-Mastering-Bundle/4WHM';
  p.stores.andertons = 'https://www.andertons.co.uk/fabfilter-mastering-bundle-inc-pro-l-2-pro-mb-pro-q-3-pro-c-2-esd/?search_query=FabFilter%20Mastering%20Bundle';
  p.stores.zzounds = 'https://www.zzounds.com/item--FABMASTERINGBUN?siid=306129';
  p.stores.musicstore = 'https://www.musicstore.com/en_OE/EUR/Fabfilter-Mastering-Bundle/art-PCM0014086-000';
  fs.writeFileSync(B + 'data/products.json', JSON.stringify(products, null, 2), 'utf8');
  let bg = fs.readFileSync(B + 'build-guides.js', 'utf8');
  const oldE = '1034: {prices:{pluginboutique:"€523.36"},pbCur:{us:"$519.00",uk:"£413.07"}},\n';
  const newE = '1034: {prices:{pluginboutique:"€523.36",gear4music:"£379.00",andertons:"£319.00",zzounds:"$519.00",musicstore:"€439.00"},pbCur:{us:"$519.00",uk:"£413.07"}},\n';
  if (!bg.includes(oldE)) { console.log('ENTRADA 1034 NO ENCONTRADA'); process.exit(1); }
  bg = bg.split(oldE).join(newE);
  fs.writeFileSync(B + 'build-guides.js', bg, 'utf8');
  new Function(bg);
  console.log('1034 completo OK');
}).catch(e => { console.log('ERROR: ' + e.message); process.exit(1); });
