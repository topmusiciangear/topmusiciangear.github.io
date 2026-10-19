const fs = require('fs');
const path = require('path');

const g = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/guides.json'), 'utf8'));

const gd = g.find(x => x.id === 'portable-interfaces');

gd.verdict_es = 'En la Élite Profesional (Referencia Absoluta): La RME Babyface Pro FS es la interfaz de referencia definitiva en movilidad, ofreciendo la construcción más robusta, la conversión más limpia y los drivers más estables de la industria musical. En la Gama Alta (Las más completas y fiables): La Focusrite Scarlett 2i2 4th Gen, la Audient iD14 MkII y la SSL 2+ MKII son las herramientas de referencia en su categoría. Destacan por integrar convertidores y previos heredados de consolas y sistemas de gran formato en un chasis robusto alimentado por bus. Gama Media Avanzada (Calidad de estudio con funciones especiales): La Universal Audio Volt 276, la MOTU M2 y la Arturia MiniFuse 2 OTG ofrecen calidad de estudio profesional con excelentes previos y drivers estables, destacando por sus añadidos de hardware como compresión analógica, pantallas LCD a color o puertos de conectividad móvil. Gama de Entrada Portátil (Rendimiento compacto y eficiente): La Universal Audio Volt 2 y la Audient EVO 4 ofrecen calidad de estudio con excelentes previos y drivers estables en los formatos más ligeros, simplificados y accesibles para llevar en cualquier mochila.';

gd.verdict = 'Professional Elite (Absolute Reference): The RME Babyface Pro FS is the definitive reference interface in mobility, offering the most robust construction, cleanest conversion, and most stable drivers in the music industry. High Tier (The most complete and reliable): The Focusrite Scarlett 2i2 4th Gen, Audient iD14 MkII, and SSL 2+ MKII are reference tools in their category. They stand out for integrating converters and preamps inherited from consoles and large-format systems in a robust bus-powered chassis. Advanced Mid Tier (Studio quality with special features): The Universal Audio Volt 276, MOTU M2, and Arturia MiniFuse 2 OTG offer professional studio quality with excellent preamps and stable drivers, standing out for their hardware additions like analog compression, color LCD screens, or mobile connectivity ports. Portable Entry Tier (Compact and efficient performance): The Universal Audio Volt 2 and Audient EVO 4 offer studio quality with excellent preamps and stable drivers in the lightest, most simplified, and accessible formats to carry in any backpack.';

gd.conclusion_es = 'La RME Babyface Pro FS es la opción definitiva para quien busca la mejor calidad. La Scarlett 2i2 4th Gen, iD14 MkII y SSL 2+ MKII completan la gama alta. La Volt 276, MOTU M2 y MiniFuse 2 OTG son la gama media avanzada. La Volt 2 y EVO 4 son la opción portátil de entrada.';

gd.conclusion = 'The RME Babyface Pro FS is the definitive choice for those seeking the best quality. The Scarlett 2i2 4th Gen, iD14 MkII, and SSL 2+ MKII complete the high tier. The Volt 276, MOTU M2, and MiniFuse 2 OTG are the advanced mid tier. The Volt 2 and EVO 4 are the portable entry option.';

fs.writeFileSync(path.join(__dirname, '../data/guides.json'), JSON.stringify(g, null, 2));
console.log('OK - portable-interfaces actualizado con el veredicto del usuario.');
