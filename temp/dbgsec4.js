const P = require('C:/Users/Daniel/projects/topmusiciangear/data/products.json');
const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const g = G.find(x => x.id === 'best-headphones');
const s = g.sections[4];
console.log('heading:', s.heading);
console.log('products:', JSON.stringify(s.products), 'types:', s.products.map(p => typeof p));
console.log('skip:', !!s.skipMedia);
const found = (s.products || []).map(pid => P.find(pr => pr.id === pid)).filter(Boolean);
console.log('found:', found.map(p => p.id + ':' + p.title));