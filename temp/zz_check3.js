const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

const s = fs.readFileSync(BASE + 'build-guides.js', 'utf8');
const app = fs.readFileSync(BASE + 'js/app.js', 'utf8');
const min = fs.readFileSync(BASE + 'js/app.min.js', 'utf8');

function chk(nombre, txt) {
  const a = txt.indexOf('zzounds: (t) =>');
  const b = txt.indexOf("zzounds: () => 'https://www.zzounds.com/a--925521/'");
  // fix del wrapper: debe llevar replace('/a--925521','')
  const w = /anrdoezrs\.net\/click-101857888-10439229\?url=' \+ encodeURIComponent\((\w+)\.replace\('\/a--925521', ''\)\)/.test(txt)
    || txt.indexOf("encodeURIComponent(url.replace('/a--925521', ''))") > -1;
  console.log('  ' + nombre.padEnd(18) +
    'searchUrls:' + (a > -1 ? 'OK' : (b > -1 ? 'VIEJO' : 'NO')) +
    '  | wrapper-strip:' + (w ? 'OK' : 'NO') +
    '  | mojibake:' + (txt.match(/â‚¬|Â£|Â°/g) || []).length);
}

console.log('=== los 3 ficheros deben coincidir ===');
chk('build-guides.js', s);
chk('js/app.js', app);
chk('js/app.min.js', min);

// linea 270 real
const m = s.match(/if \(storeKey === 'zzounds'[^\n]*/);
console.log('\nlinea del wrapper:\n  ' + (m ? m[0].slice(0, 180) : '(no encontrada)'));
