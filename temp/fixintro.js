const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const g = guides.find(x => x.id === 'repitch-vs-melodyne');
g.intro_es = 'Si grabas voces, tarde o temprano necesitarás corrección de tono. Los dos editores quirúrgicos más respetados del mercado son Synchro Arts RePitch 2 Standard y Celemony Melodyne 5 Essential. Ambos trabajan de forma externa (offline), nota por nota, y son capaces de lograr que una voz suene perfectamente afinada sin que nadie lo note. La diferencia principal radica en su flujo de trabajo: RePitch 2 está diseñado para ofrecer una velocidad brutal gracias a su edición multipista, macros de afinación y herramientas de tiempo en una sola ventana; por su parte, Melodyne 5 ofrece el motor de audio de referencia de la industria, con la opción de actualizar a edición polifónica y control de formantes en sus versiones superiores. Esta guía los compara frente a frente para que aciertes con tu compra a la primera.';
fs.writeFileSync(B + 'data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('intro aplicada');
