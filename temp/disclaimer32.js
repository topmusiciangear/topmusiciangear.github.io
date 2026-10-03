const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const g = G.find(x => x.id === 'best-32-channel-digital-mixers');
g.intro = g.intro.split('We analyzed eight top models').join('We analyzed nine top models');
g.intro += ' <strong>A note on channel counts:</strong> we rank mixers by architecture and ability to cover 24- to 32-channel events. Rack-mount or subcompact models (like the PreSonus 32SC or the SQ-6+) save rear-panel space with fewer local connections, but still handle up to 32 or 48 channels via digital network expanders.';
g.intro_es = g.intro_es.split('Analizamos ocho modelos destacados').join('Analizamos nueve modelos destacados');
g.intro_es += ' <strong>Una nota sobre el número de canales:</strong> en esta guía clasificamos las mezcladoras basándonos en su arquitectura y capacidad para resolver eventos de 24 a 32 canales. Ten en cuenta que modelos en formato rack o subcompactos (como la PreSonus 32SC o la SQ-6+) optimizan el espacio físico ofreciendo menos conexiones locales atrás, pero están totalmente capacitadas para gestionar hasta 32 o 48 canales mediante expansores digitales de red.';
fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
console.log('intro updated');