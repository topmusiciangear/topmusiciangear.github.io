const P = require('../data/products.json');
const G = require('../data/guides.json');
const px = (id) => { const p = P.find(x => x.id === id); console.log('prod' + id, p ? ('"' + p.title + '" $' + p.price) : 'MISSING'); };
[305, 303, 170, 19, 116].forEach(px);
// SM57 id?
P.filter(p => /SM57/.test(p.title)).forEach(p => console.log('sm57cand', p.id, p.title, p.price));
// Thump215XT?
P.filter(p => /Thump215XT/.test(p.title)).forEach(p => console.log('thump', p.id, p.title, p.price));
// 7050C?
P.filter(p => /7050C/.test(p.title)).forEach(p => console.log('7050', p.id, p.title, p.price));
// K&M monitor stands?
P.filter(p => /K&M/i.test(p.title) && /tand|tati/i.test(p.title)).forEach(p => console.log('kmstand', p.id, p.title, p.price));
// monitor-setup products
const ms = G.find(x => x.id === 'monitor-setup');
console.log('monitor-setup featured:', JSON.stringify(ms.featuredProducts));
// full podcasting sec3
const pc = G.find(x => x.id === 'best-mic-for-podcasting');
console.log('podsec3 EN full:', pc.sections[3].content.replace(/\s+/g, ' '));
console.log('podsec3 ES full:', pc.sections[3].content_es.replace(/\s+/g, ' '));
// furniture sec4 full
const fu = G.find(x => x.id === 'studio-furniture');
console.log('furnsec4 EN full:', fu.sections[4].content.replace(/\s+/g, ' '));
console.log('furnsec4 ES full:', fu.sections[4].content_es.replace(/\s+/g, ' '));
// kh95? 7050C section price mention
const kh = G.find(x => x.id === 'kh750-vs-7050c');
const v = kh.verdictProsCons.find(x => /7050/.test(x.name));
console.log('7050 pros:', JSON.stringify(v.pros), 'cons:', JSON.stringify(v.cons));