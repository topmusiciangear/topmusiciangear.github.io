const fs = require('fs');
const ruta = 'C:/Users/Daniel/projects/topmusiciangear/build-guides.js';
let s = fs.readFileSync(ruta, 'utf8');
const viejo = '29: {prices:{pluginboutique:"\u20AC906.50",andertons:"\u00A3639.00",zzounds:"$1,069.00",gear4music:"\u00A3639.00",musicstore:"\u20AC899.00"}}';
const nuevo = '29: {prices:{pluginboutique:"\u20AC906.50",andertons:"\u00A3639.00",zzounds:"$1,069.00",gear4music:"\u00A3639.00",musicstore:"\u20AC899.00"},pbCur:{us:"$1,069.00",uk:"\u00A3721.12"}}';
if (s.indexOf(viejo) < 0) { console.log('no encontrado (id 29)'); process.exit(1); }
// replace con funcion para evitar problemas con $ en la sustitucion
s = s.replace(viejo, () => nuevo);
fs.writeFileSync(ruta, s, 'utf8');
console.log('id 29: pbCur anadido -> ' + nuevo.slice(nuevo.indexOf('pbCur')));