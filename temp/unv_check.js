fetch('https://r2.gear4music.com/media/86/862512/1200/preview.jpg', { method: 'HEAD' }).then(r => console.log('foto: ' + r.status + ' | ' + r.headers.get('content-type'))).catch(e => console.log('foto ERROR: ' + e.message));
const products = require('C:/Users/Daniel/projects/topmusiciangear/data/products.json');
const p = products.find(x => x.id === 1030);
console.log('producto: brand=' + p.brand + ' title=' + p.title + ' stores=' + Object.keys(p.stores).join(','));
const guides = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const g = guides.find(x => x.id === 'best-audio-repair-plugins');
const s = JSON.stringify(g);
console.log('UNVEIL en guia: ' + s.split('UNVEIL').length);
console.log('Unveil en guia: ' + s.split('Unveil').length);
