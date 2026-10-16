const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const g = guides.find(x => x.id === 'repitch-vs-melodyne');
g.faq[1].a = 'It depends on your material. If you tune pop, hip-hop and singer-songwriter vocals all day, RePitch 2 gets you to finished faster with less study. If you edit choirs, polyphonic instruments or need formant reshaping, budget for Melodyne Assistant or higher instead: Essential cannot do polyphonic or formant editing, so its learning curve only pays off once you step up a tier.';
g.faq[1].a_es = 'Depende de tu material. Si afinas voces pop, hip-hop y cantautor todo el día, RePitch 2 llega al terminado más rápido con menos estudio. Si editas coros, instrumentos polifónicos o necesitas remodelar formantes, apunta a Melodyne Assistant o superior: Essential no hace edición polifónica ni de formantes, así que su curva solo se amortiza al subir de nivel.';
fs.writeFileSync(B + 'data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('FAQ1 corregida');
