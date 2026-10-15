const fs = require('fs');
const d = fs.readFileSync('C:/Users/Daniel/AppData/Local/Temp/opencode/g3.html', 'utf8');
// fila gear4music del Strandberg (id 317): ya no debe ir a la home
const m = d.indexOf('openReviewModal(317)');
const seg = d.slice(m, m + 25000);
const g4m = seg.match(/<a [^>]*data-store="gear4music"[^>]*>[\s\S]{0,300}?<\/a>/);
const tag = (seg.match(/<a [^>]*data-store="gear4music"[^>]*>/) || [])[0] || '';
const href = (tag.match(/href="([^"]+)"/) || [])[1] || '';
const aff = (tag.match(/data-aff="([^"]+)"/) || [])[1] || '';
console.log('Strandberg 317 [gear4music] en vivo:');
console.log('  href: ' + href.slice(0, 100));
console.log('  aff : ' + aff.slice(0, 100));
console.log('  ¿va a la home? ' + (/^https?:\/\/(www\.)?gear4music\.com\/?(\?.*)?$/.test(href) ? 'SI (MAL)' : 'no (bien, va a busqueda)'));
console.log('  ¿lleva afiliado? ' + (/awinmid=1117/.test(aff) ? 'si' : 'NO'));
