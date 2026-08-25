const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));
const hub = g.find(x => x.id === 'best-interface');

hub.sections[1].content = '<p><strong>If you record on the go, portability matters.</strong> A good portable interface should be compact, bus-powered (no external power supply needed), and built to withstand travel. Look for lightweight aluminum bodies and USB-C connectivity.</p><p>For our full breakdown of the best portable interfaces, visit our <a class="guide-link-btn" href="/guides/portable-interfaces.html">Best Portable Interfaces</a> guide.</p>';
hub.sections[1].content_es = '<p><strong>Si grabas sobre la marcha, la portabilidad importa.</strong> Una buena interface port\u00e1til debe ser compacta, alimentada por bus (sin fuente de alimentaci\u00f3n externa) y resistente al transporte. Busca cuerpos de aluminio ligeros y conectividad USB-C.</p><p>Para nuestro an\u00e1lisis completo de las mejores interfaces port\u00e1tiles, visita nuestra gu\u00eda de <a class="guide-link-btn" href="/guides/portable-interfaces_es.html">Mejores Interfaces Port\u00e1tiles</a>.</p>';
hub.sections[1].products = [263, 15];

hub.sections[2].content = '<p><strong>Streaming interfaces handle multiple audio sources in real-time.</strong> Unlike standard recording interfaces, they let you mix your mic, game audio, music, and notifications without routing through your DAW. Built-in effects, physical faders, and app integration are common features.</p><p>For our complete guide to streaming interfaces, visit our <a class="guide-link-btn" href="/guides/streaming-interfaces.html">Best Streaming Interfaces</a> guide.</p>';
hub.sections[2].content_es = '<p><strong>Las interfaces de streaming manejan m\u00faltiples fuentes de audio en tiempo real.</strong> A diferencia de las interfaces de grabaci\u00f3n est\u00e1ndar, te permiten mezclar tu micr\u00f3fono, audio de juego, m\u00fasicas y notificaciones sin pasar por tu DAW. Efectos integrados, faders f\u00edsicos e integraci\u00f3n con apps son caracter\u00edsticas comunes.</p><p>Para nuestra gu\u00eda completa de interfaces de streaming, visita nuestra gu\u00eda de <a class="guide-link-btn" href="/guides/streaming-interfaces_es.html">Mejores Interfaces de Streaming</a>.</p>';
hub.sections[2].products = [239, 240];

fs.writeFileSync('data/guides.json', JSON.stringify(g,null,2),'utf8');
console.log('Rewritten best-interface sections 1-2');
