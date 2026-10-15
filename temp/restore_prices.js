// RESTAURAR las 15 entradas borradas por f22c718df.
// Los ids 15 y 18 usan los precios verificados hoy en gear4music.com;
// el resto se restaura tal cual estaba antes del borrado accidental.
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const f = BASE + 'build-guides.js';
let s = fs.readFileSync(f, 'utf8');

const ENTRADAS = {
  13: {prices:{amazon:"$299.00",zzounds:"$299.00",andertons:"£215.00",gear4music:"£215.00",musicstore:"€249.00"}},
  14: {prices:{amazon:"$839.95",zzounds:"$849.00",gear4music:"£699.00",musicstore:"€849.00"}},
  // verificado hoy en gear4music.com: £189.00 (antes £193.75)
  15: {prices:{amazon:"$199.00",zzounds:"$224.99",gear4music:"£189.00",andertons:"£185.00",musicstore:"€172.00"}},
  16: {prices:{amazon:"$999.00",zzounds:"$999.00",gear4music:"£849.00",andertons:"£849.00",musicstore:"€945.00"}},
  17: {prices:{amazon:"$999.00",zzounds:"$999.00",gear4music:"£715.00",andertons:"£715.00",musicstore:"€889.00"}},
  // verificado hoy en gear4music.com: £230.00 (antes £227.00)
  18: {prices:{amazon:"$249.99",zzounds:"$299.99",gear4music:"£230.00",andertons:"£227.00",musicstore:"€295.00"}},
  19: {prices:{amazon:"$398.99",zzounds:"$398.99",gear4music:"£263.00",andertons:"£254.00",musicstore:"€289.00"}},
  20: {prices:{amazon:"$269.00",zzounds:"$269.00",gear4music:"£199.25",musicstore:"€266.00"}},
  21: {prices:{amazon:"$899.99",zzounds:"$939.00",andertons:"£600.00",gear4music:"£600.00",musicstore:"€649.00"}},
  22: {prices:{amazon:"$1,175.00",andertons:"£959.00",gear4music:"£812.00",musicstore:"€949.00"}},
  23: {prices:{amazon:"$199.99",andertons:"£129.00",gear4music:"£129.00",musicstore:"€149.00",zzounds:"$199.99"}},
  24: {prices:{amazon:"$489.00",zzounds:"$499.00",andertons:"£357.00",gear4music:"£355.00",musicstore:"€432.00"}},
  25: {prices:{amazon:"$169.00",zzounds:"$159.00",gear4music:"£148.00",andertons:"£133.00",musicstore:"€149.00"}},
  26: {prices:{amazon:"$113.00",gear4music:"£85.00",musicstore:"€89.00"}},
  29: {prices:{pluginboutique:"€906.50",andertons:"£639.00",zzounds:"$1,069.00",gear4music:"£639.00",musicstore:"€899.00"}}
};

// quitar los 2 que anadi antes a mano para no duplicar
s = s.replace(/\n\s*15:\s*\{prices:\{gear4music:"£189\.00"\}\},/, '');
s = s.replace(/\n\s*18:\s*\{prices:\{gear4music:"£230\.00"\}\},/, '');
fs.writeFileSync(f, s, 'utf8');

const cierre = s.indexOf('\n};', s.indexOf('const TEST_SHOP_BTN = {'));
if (cierre < 0) { console.log('NO ENCONTRADO el cierre'); process.exit(1); }

// construir las lineas en formato compacto
const lineas = Object.keys(ENTRADAS).map(id => {
  const e = ENTRADAS[id];
  const p = Object.entries(e.prices).map(([k,v]) => k + ':"' + v + '"').join(',');
  const extra = e.na ? 'na:' + JSON.stringify(e.na) + ',' : '';
  const oos = e.oos ? 'oos:' + JSON.stringify(e.oos) + ',' : '';
  const urls = e.urls ? 'urls:' + JSON.stringify(e.urls) + ',' : '';
  return '  ' + id + ': {prices:{' + p + '}' + (extra+oos+urls ? ',' + extra + oos + urls : '') + '},';
}).join('\n');

s = fs.readFileSync(f, 'utf8');
const nuevoCierre = s.indexOf('\n};', s.indexOf('const TEST_SHOP_BTN = {'));
s = s.slice(0, nuevoCierre + 1) + lineas + '\n' + s.slice(nuevoCierre + 1);
fs.writeFileSync(f, s, 'utf8');

console.log('restauradas ' + Object.keys(ENTRADAS).length + ' entradas\n');

// verificar
const lineasF = fs.readFileSync(f,'utf8').split('\n');
const ini = lineasF.findIndex(l=>/^const TEST_SHOP_BTN = \{/.test(l));
let fin=-1;
for(let i=ini+1;i<lineasF.length;i++) if(/^\};?\s*$/.test(lineasF[i])){fin=i;break;}
const ids = new Set();
for(let i=ini+1;i<fin;i++){ const m=lineasF[i].match(/^\s*(\d+):\s*\{/); if(m) ids.add(+m[1]); }
console.log('total entradas ahora: ' + ids.size);
[13,14,15,16,17,18,19,20,21,22,23,24,25,26,29].forEach(id=>{
  console.log('  ' + id + ': ' + (ids.has(id)?'OK':'FALTA'));
});

// sintaxis
try { new Function(s); console.log('\nsintaxis: OK'); } catch(e){ console.log('\nSYNTAXIS ROTA: '+e.message); }