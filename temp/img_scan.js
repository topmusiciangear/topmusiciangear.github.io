const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));

// 1) imagenes con tracking en CUALQUIER campo del corpus
console.log('=== campos del corpus con parametros de seguimiento ===');
const RE = /\?_gl=|_gcl_aw|utm_|gclid=|&_gl=/;
let n = 0;
(function w(v, ruta, raiz) {
  if (typeof v === 'string') {
    if (RE.test(v)) { n++; console.log('  ' + raiz + '.' + ruta + '\n      ' + v.slice(0, 130)); }
  } else if (Array.isArray(v)) v.forEach((x, i) => w(x, ruta + '[' + i + ']', raiz));
  else if (v && typeof v === 'object') Object.keys(v).forEach(k => w(v[k], ruta ? ruta + '.' + k : k, raiz));
})(guides, '', 'guides.json');
console.log('total: ' + n);

// 2) donde se embeben los precios
console.log('\n=== como llegan los precios a la pagina ===');
const d = fs.readFileSync(BASE + 'guides/beginner-bass-guitars.html', 'utf8');
console.log('  contiene "TEST_SHOP_BTN": ' + /TEST_SHOP_BTN/.test(d));
console.log('  contiene "tmgShopCfg" o similar: ' + /tmgShop|SHOP_CFG|shopCfg/.test(d));
console.log('  guion shop-buttons.js cargado: ' + /shop-buttons\.js/.test(d));
const inline = d.match(/<script>[\s\S]{0,4000}?536[\s\S]{0,600}?<\/script>/);
console.log('  hay un bloque <script> con el 536: ' + (inline ? 'si' : 'no'));
// buscar el boton primario del Bronco
const i = d.indexOf('media/91/911020');
if (i > -1) {
  const ctx = d.slice(i, i + 2500).replace(/\s+/g, ' ');
  const boton = ctx.match(/Buy at[\s\S]{0,200}/);
  console.log('  boton primario: ' + (boton ? boton[0].slice(0, 120) : '?'));
}