const fs = require('fs');
// 1. ES main table labels now Spanish?
let h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/portable-interfaces_es.html', 'utf8');
const labels = [...h.matchAll(/<td class="label">([^<]+)<\/td>/g)].map(m => m[1]);
console.log('ES labels:', labels.join(' | '));
// 2. small tier table gone?
console.log('tier table gone (ES):', !h.includes('Ultra-Compacta'));
console.log('tier table gone (EN):', !fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/portable-interfaces.html', 'utf8').includes('Ultra-Compact'));
// 3. guitar-pedals Signal Chain row?
h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/guitar-pedals.html', 'utf8');
console.log('Signal Chain row:', h.includes('>Signal Chain<'));
// 4. active-vs-passive prose instead of table?
h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/active-vs-passive-pa.html', 'utf8');
console.log('active prose:', h.includes('Active pros:') && !h.includes('Perfect power matching — impossible to mismatch</td>'));
// 5. reverb CN back to search?
h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/beginner-guitar.html', 'utf8');
const i = h.indexOf('Fender CN-60S (Nylon): A Closer Look');
const seg = h.slice(i, h.indexOf('guide-section-heading', i + 50));
console.log('reverb search:', seg.includes('reverb.com/marketplace?query=Fender'));