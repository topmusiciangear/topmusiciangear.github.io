const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/best-interface.html', 'utf8');
const he = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/best-interface_es.html', 'utf8');
console.log('EN Audient:', h.includes('Console Preamps You Can Expand'));
console.log('EN Volt2:', h.includes('Vintage 610 Tone for $199'));
console.log('ES Audient:', he.includes('previos de consola ampliables por ADAT'));
console.log('ES Volt2:', he.includes('tono 610 vintage por'));
console.log('ES roughly:', he.includes('roughly'));
console.log('68dB en seccion (evitado):', h.includes('68dB') || h.includes('68 dB'));