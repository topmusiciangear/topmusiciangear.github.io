// AUDITORIA REAL: el wrapper de zZounds va en data-aff, no en href.
// aff-defer.js lo aplica al hover/click.
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

function clasificar(href) {
  return /anrdoezrs\.net\/click-/.test(href) ? 'YA ENVUELTO en href'
    : /^https?:\/\/www\.zzounds\.com\//.test(href) ? 'directo zzounds.com'
    : 'otro';
}

const guias = fs.readdirSync(BASE + 'guides').filter(f => f.endsWith('.html'));

let hrefWrap = 0, hrefDir = 0, hrefOtro = 0;
let affOk = 0, affMal = 0, affFalta = 0;
const malUrls = new Set();
const sinAff = new Map();

guias.forEach(f => {
  const d = fs.readFileSync(BASE + 'guides/' + f, 'utf8');

  // cada <a ... data-store="zzounds" ...> completo
  [...d.matchAll(/<a ([^>]*?)data-store="zzounds"([^>]*?)>/g)].forEach(m => {
    const tag = m[0];
    const href = (tag.match(/href="([^"]+)"/) || [])[1] || '';
    const aff = (tag.match(/data-aff="([^"]+)"/) || [])[1] || '';

    const c = clasificar(href);
    if (c === 'YA ENVUELTO en href') hrefWrap++;
    else if (c === 'directo zzounds.com') hrefDir++;
    else hrefOtro++;

    if (!aff) {
      affFalta++;
      if (!sinAff.has(href)) sinAff.set(href, (sinAff.get(href) || 0) + 1);
    } else {
      const destino = decodeURIComponent((aff.match(/[?&]url=([^&]+)/) || [])[1] || '');
      if (/a--925521/.test(destino)) { affMal++; malUrls.add(destino); }
      else affOk++;
    }
  });
});

console.log('='.repeat(66));
console.log('  zZounds en los <a> de las 314 paginas');
console.log('='.repeat(66));
console.log('\n  href:');
console.log('    envuelto en el href:  ' + hrefWrap);
console.log('    directo zzounds.com:  ' + hrefDir + '   (aff-defer.js lo envuelve al clic)');
console.log('    otro:                 ' + hrefOtro);
console.log('\n  data-aff (el enlace de afiliado real):');
console.log('    CORRECTO (sin a--925521): ' + affOk);
console.log('    ROTO   (con a--925521):  ' + affMal);
console.log('    sin data-aff:             ' + affFalta);

if (malUrls.size) {
  console.log('\n  URLs rotas:');
  [...malUrls].slice(0, 10).forEach(u => console.log('    ' + u));
}
if (sinAff.size) {
  console.log('\n  hrefs sin data-aff (' + sinAff.size + ' distintos):');
  [...sinAff.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10)
    .forEach(([u, n]) => console.log('    ' + String(n).padStart(4) + 'x  ' + u));
}

// ademas: comprobar que el href y el data-aff apuntan al MISMO destino
console.log('\n  ¿href y data-aff apuntan al mismo producto?');
let mismatch = 0; const ejemplos = [];
guias.forEach(f => {
  const d = fs.readFileSync(BASE + 'guides/' + f, 'utf8');
  [...d.matchAll(/<a ([^>]*?)data-store="zzounds"([^>]*?)>/g)].forEach(m => {
    const tag = m[0];
    const href = (tag.match(/href="([^"]+)"/) || [])[1] || '';
    const aff = (tag.match(/data-aff="([^"]+)"/) || [])[1] || '';
    if (!aff) return;
    const destino = decodeURIComponent((aff.match(/[?&]url=([^&]+)/) || [])[1] || '');
    const norm = u => decodeURIComponent(u).replace('https://www.', '').replace(/^https?:\/\//, '').replace(/\/$/, '');
    if (norm(href) !== norm(destino)) {
      mismatch++;
      if (ejemplos.length < 6) ejemplos.push('    href: ' + href + '\n    aff : ' + destino);
    }
  });
});
console.log('    desajustes: ' + mismatch);
ejemplos.forEach(e => console.log(e));

// JSON-LD
console.log('\n  JSON-LD (Offer.url):');
let jlOk = 0, jlMal = 0;
guias.forEach(f => {
  const d = fs.readFileSync(BASE + 'guides/' + f, 'utf8');
  [...d.matchAll(/"url":\s*"(https:\/\/www\.anrdoezrs\.net\/click-[^"]+)"/g)].forEach(m => {
    const destino = decodeURIComponent((m[1].match(/[?&]url=([^&]+)/) || [])[1] || '');
    if (/a--925521/.test(destino)) jlMal++; else jlOk++;
  });
});
console.log('    correctos: ' + jlOk);
console.log('    ROTOS:     ' + jlMal);
