const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));
const g = guides.find(x => x.id === 'stream-controllers');
const s = g.sections.find(x => x.products && x.products[0] === 671);

// Corrección 1: Aclarar desde el inicio que los faders son estáticos
// Corrección 2: "EQ, efectos y ruteo solo desde app" → impreciso, la superficie tiene controles
// Corrección 3: Advertir el límite de 2 salidas USB para streamers

const newContentEs = '<p><strong>El FLOW 8 es el único de esta lista que se comporta como un mezclador de estudio en vez de como un juguete para creadores, y cuesta menos de la mitad que una RØDECaster.</strong> No es una interfaz de audio con unos botones pegados encima; es un mezclador digital de ocho canales de verdad. Cuenta con dos entradas de micrófono XLR, dos entradas combo XLR/TRS, dos pares de entradas de línea estéreo balanceadas con jack Hi-Z para instrumentos, y salidas main balanceadas en XLR con envíos de monitor en jack de 1/4" TRS. En su superficie reinan seis faders de canal de 60 mm, los dos de la derecha controlan los pares estéreo 5/6 y 7/8 de forma simultánea, y son piezas analógicas rígidas que jamás se moverán solas.</p>' +
    '<p><strong>Lo que lo distingue del resto de cajas de esta lista es dónde vive el procesamiento.</strong> Cada canal recibe un EQ de cuatro bandas y un compresor, mientras que los buses de monitor y main reciben un EQ de nueve bandas con un limitador a la salida. Todo este procesado corre en coma flotante de 32 bits, la misma precisión interna que usa la RØDECaster Pro II. Encima, añade dos motores de efectos independientes, cada uno con 16 presets, más 12 programas de reverb.</p>' +
    '<p><strong>Tú controlas la precisión de ese ecosistema desde la app FLOW gratuita.</strong> La app se comunica con el mezclador por Bluetooth, y Behringer deja claro que no hace falta red Wi-Fi, así que puedes ecualizar, recuperar FX y cambiar el ruteo desde el móvil en mitad de un directo. Ese mismo chip de Bluetooth también hace A2DP, de modo que el teléfono puede enviar la música directamente a la mezcla como una fuente más. Por USB actúa como una interfaz multipista que graba hasta 10 canales independientes a 48 kHz y 24 bits.</p>' +
    '<p><strong>Tres cosas que conviene saber antes de comprar.</strong> Los faders no son motorizados, así que en un directo el fader de la app y el fader físico pueden separarse y los LEDs de offset están ahí para avisarte cuando lo hacen. El ajuste profundo del EQ paramétrico y la edición detallada de los efectos solo se alcanzan desde la app, no desde la superficie, que solo ofrece controles de navegación esenciales. Y ojo con el límite del streaming: aunque envía 10 pistas a la PC, solo recibe 2 canales de vuelta, así que no podrás separar el audio de Discord, tu videojuego y Spotify en faders físicos independientes usando únicamente el cable USB.</p>';

s.content_es = newContentEs;
fs.writeFileSync(gj, JSON.stringify(guides, null, 2));
console.log('ES actualizado con las 3 correcciones');
console.log('Problema 1 (faders estáticos desde inicio):', s.content_es.indexOf('piezas analógicas rígidas que jamás se moverán solas') > -1 ? 'OK' : 'NO');
console.log('Problema 2 (controles hardware):', s.content_es.indexOf('controles de navegación esenciales') > -1 ? 'OK' : 'NO');
console.log('Problema 3 (límite USB streamers):', s.content_es.indexOf('solo recibe 2 canales de vuelta') > -1 ? 'OK' : 'NO');