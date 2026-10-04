const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const P = require('C:/Users/Daniel/projects/topmusiciangear/data/products.json');
const g = G.find(x => x.id === 'stream-controllers');
console.log('featured:', JSON.stringify(g.featuredProducts));
g.sections.forEach(s => console.log('SEC:', (s.heading || '').slice(0, 50), JSON.stringify(s.products)));
console.log('tascam:', P.filter(p => /tascam/i.test(p.title)).map(p => p.id + ':' + p.title).join(' / '));
console.log('elgato:', P.filter(p => /stream deck/i.test(p.title)).map(p => p.id + ':' + p.title).join(' / '));