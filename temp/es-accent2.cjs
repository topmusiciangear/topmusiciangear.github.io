const fs = require('fs');

const FILES = ['data/guides.json', 'data/products.json', 'data/deals.json', 'data/manual-deals.json'];

// GENTLY wrong: words missing a tilde they DO need, and "vía" without accent / "a un DAW" literalism
const PATTERNS = [
  /\bSeleccion\b/,
  /\bseleccion\b/,
  /\bconexion\b/,
  /\bopcion\b/,
  /\binformacion\b/,
  /\bsolucion\b/,
  /\bVersion\b/,
  /\bcondicion\b/,
  /\brazon\b/,
  /\bgrabacion\b/,
  /\btambien\b/,
  /\bconfiguracion\b/,
  /\bactivacion\b/,
  /\blocalizacion\b/,
  /\bprecisions\b/,
  /\bprecision\b/,
  /\bestereo\b/i,
  /\bfacil\b/i,
  /\bmas\s+(?:facil|barato|importante|cara)\b/i,
  /\bvia\s+USB\b/,
  /\ba\s+un\s+DAW\b/,
  /\bal\s+DAW\b/,
  /\ben\s+un\s+DAW\b/,
];

const outPath = 'C:\\Users\\Daniel\\AppData\\Local\\Temp\\opencode\\es-accent2-out.txt';
try { fs.rmSync(outPath, { force: true }); } catch {}
let hits = 0;

// word list: count words that appears WITHOUT accent anywhere in ES fields, require they also appear WITH accent elsewhere to be a likely real typo
const wordsNoAccent = new Set(['Seleccion','seleccion','conexion','opcion','informacion','solucion','Version','condicion','razon','grabacion','tambien','configuracion','activacion','localizacion','precision']);
const wordsWithAccent = new Set(['Selección','selección','conexión','opción','información','solución','Versión','condición','razón','grabación','también','configuración','activación','localización','precisión']);

function walk(obj, path) {
  if (!obj || typeof obj !== 'object') return;
  if (Array.isArray(obj)) { obj.forEach((v,i)=>walk(v,path+'['+i+']')); return; }
  for (const [k,v] of Object.entries(obj)) {
    const p = path ? path+'.'+k : k;
    if (typeof v === 'string') {
      if (/_es$/i.test(k)) {
        for (const re of PATTERNS) {
          const m = v.match(re);
          if (m) {
            hits++;
            fs.appendFileSync(outPath, '### ' + p + ' / ' + re.source + '\n' + v.slice(Math.max(0,m.index-100), m.index+120) + '\n\n');
          }
        }
      }
    } else if (v && typeof v === 'object') walk(v, p);
  }
}
for (const f of FILES) {
  if (!fs.existsSync(f)) { console.log('MISSING', f); continue; }
  walk(JSON.parse(fs.readFileSync(f,'utf8')), f);
}
console.log('HITS:', hits);