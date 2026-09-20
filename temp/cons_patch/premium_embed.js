const fs = require('fs');
const G = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const guides = Array.isArray(G) ? G : (G.guides || []);
const P = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/products.json', 'utf8'));
const prods = Array.isArray(P) ? P : (P.products || []);

const pi = guides.find(x => x && x.id === 'portable-interfaces');
if (!pi) { console.log('portable-interfaces NOT FOUND in guides.json'); process.exit(1); }

console.log('=== key types in portable-interfaces ===');
for (const k of Object.keys(pi)) {
  const v = pi[k];
  const t = Array.isArray(v) ? 'array[' + v.length + ']' : (v && typeof v === 'object' ? typeof v : typeof v);
  console.log('  ' + k + ' : ' + t);
}

// embedded UA: search the whole guide JSON blob for "apollo" near featuredProducts
const blob = JSON.stringify(pi);
console.log('\n=== "apollo" occurrences in portable-interfaces blob (index + 200 chars context) ===');
let i = -1;
while ((i = blob.toLowerCase().indexOf('apollo', i + 1)) >= 0) {
  console.log('  @' + i + ': ...' + blob.slice(Math.max(0, i - 80), i + 140).replace(/\s+/g, ' '));
}

// the actual embedded records: find any object with a UA store key (zzounds UA / amazon / uad) in featuredProducts
console.log('\n=== portable-interfaces.featuredProducts -> names + do they carry UA-style img/stores? ===');
(pi.featuredProducts || []).forEach((f, idx) => {
  const s = JSON.stringify(f || {});
  const isUA = s.toLowerCase().indexOf('apollo') >= 0;
  console.log('  [' + idx + ']' + (isUA ? ' <<< UA' : '') + ' name=' + JSON.stringify(f.name || f.title) +
    ' | img=' + JSON.stringify(f.img) +
    ' | prices=' + JSON.stringify(f.prices) +
    ' | storesKeys=' + JSON.stringify(f.stores ? Object.keys(f.stores) : null));
});

// Is there a top-level "paragraph under Apollo Twin X / includeX" custom snippet? Search for "imagen de portada"/"portada"/"cover"
console.log('\n=== guide-level cover fields ===');
for (const k of ['cover', 'coverImg', 'heroImg', 'image', 'img']) {
  console.log('  ' + k + ' = ' + JSON.stringify(pi[k]));
}
