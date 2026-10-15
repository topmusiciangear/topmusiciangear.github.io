// Reaplicar el fix de searchUrls en app.min.js con Node (nunca PowerShell)
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

// app.js (editado con la herramienta edit) — comprobar
const app = fs.readFileSync(BASE + 'js/app.js', 'utf8');
const okJs = app.includes("prodsearch?form=search&q=") && !app.includes("zzounds: () => 'https://www.zzounds.com/a--925521/'");
console.log('app.js   : ' + (okJs ? 'YA TIENE el fix  OK' : 'FALTA el fix'));

// app.min.js — reponer
const f = BASE + 'js/app.min.js';
let min = fs.readFileSync(f, 'utf8');
const viejo = "zzounds: () => 'https://www.zzounds.com/a--925521/'";
const nuevo = "zzounds: (t) => `https://www.zzounds.com/prodsearch?form=search&q=${encodeURIComponent(t).replace(/%20/g, '+')}`";
if (min.includes(viejo)) {
  min = min.replace(viejo, nuevo);
  fs.writeFileSync(f, min, 'utf8');
  console.log('app.min.js: fix reaplicado  OK');
} else if (min.includes('prodsearch?form=search')) {
  console.log('app.min.js: ya lo tenia  OK');
} else {
  console.log('app.min.js: NO ENCONTRADO — revisar');
}
console.log('app.min.js mojibake: ' + (min.match(/â‚¬|Â£|Â°/g) || []).length + ' | euros: ' + (min.match(/€/g) || []).length);
try { new Function(min); console.log('sintaxis app.min.js: OK'); } catch (e) { console.log('SINTAXIS ROTA: ' + e.message); }
