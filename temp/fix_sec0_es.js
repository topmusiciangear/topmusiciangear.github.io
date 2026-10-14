const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const die = (m) => { console.log('!! ' + m); process.exit(1); };
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));
const g = guides.find(x => x.id === 'premium-interfaces');
const s0 = g.sections[0];
if (!s0 || !s0.content_es.includes('En la gama insignia dejas de comprar funciones y empiezas a comprar certeza')) die('SEC0 ES no es el esperado');
s0.h_es = 'Lo que verdaderamente compras en la gama insignia';
s0.content_es = '<p><strong>En el segmento de las interfaces insignia dejas de pagar por funciones añadidas y empiezas a comprar certeza.</strong> "Premium" significa contar con una conversión que mantiene su honestidad y transparencia incluso en los niveles más bajos de señal, relojes de sincronización que no se desvían cuando la sala se calienta, drivers estables que sobreviven a las actualizaciones del sistema operativo y rutas de monitoreo en las que puedes confiar durante una década.</p><p>La clave para no tirar tu dinero es identificar qué certeza específica necesita tu flujo de trabajo: color analógico al capturar, enrutamiento complejo para directos, audio en red, mezcla inmersiva para Dolby Atmos o transparencia pura para mastering. Paga para eliminar el verdadero cuello de botella de tu estudio, no para coleccionar especificaciones en papel.</p>';
// intro_es como teaser corto para no hacer eco del contenido
s0.intro_es = 'Certeza, no funciones: conversión honesta, reloj estable, drivers eternos y monitoreo fiable.';
fs.writeFileSync(gj, JSON.stringify(guides, null, 2));
console.log('SEC0 ES reemplazado por tu version');
console.log('duplicado viejo restante:', s0.content_es.includes('empiezas a comprar certeza'));
