var fs = require('fs');
var guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
var g = guides.find(function (x) { return x.id === 'budget-mics'; });
var S = g.sections;
function rep(i, a, b) {
  var s = S[i].content_es;
  if (s.indexOf(a) < 0) { console.log('MISS s' + i + ': ' + a.slice(0, 60)); return; }
  S[i].content_es = s.split(a).join(b);
  console.log('ok s' + i);
}
rep(0, 'consulta nuestra breve lista de los <a href="/guides/budget-usb-mics_es.html" class="guide-link-btn">Mejores Micrófonos USB Económicos</a>', 'consulta nuestra guía de <a href="/guides/budget-usb-mics_es.html" class="guide-link-btn">micrófonos USB económicos</a>');
rep(1, '<strong>Combínalo con:</strong> el SM57 viene sin accesorios, así que consigue', '<strong>Para completarlo:</strong> el SM57 viene pelado, así que consigue');
rep(1, 'un cable Mogami Gold Studio XLR</a> <a href="https://www.amazon.com/dp/B0006PQOF4', 'un cable Mogami Gold Studio XLR</a> y <a href="https://www.amazon.com/dp/B0006PQOF4');
rep(2, '<strong>Combínalo con:</strong> viene con pinza y estuche pero sin cable, así que consigue', '<strong>Súmale:</strong> trae pinza y estuche pero no cable, así que consigue');
rep(5, '<strong>Combínalo con:</strong> el SM58 se entrega sin cable ni soporte, así que añade', '<strong>Para completarlo:</strong> el SM58 llega sin cable ni soporte, así que añade');
rep(5, 'un cable Mogami Gold Studio XLR</a> <a href="https://www.amazon.com/dp/B0006PQOF4', 'un cable Mogami Gold Studio XLR</a> y <a href="https://www.amazon.com/dp/B0006PQOF4');
rep(6, 'para salir al aire — o <a href="https://www.amazon.com/dp/B0006PQOF4', 'para empezar a grabar — o <a href="https://www.amazon.com/dp/B0006PQOF4');
rep(6, 'Para una visión general completa, consulta nuestra <a href="/guides/best-mic-for-podcasting_es.html" class="guide-link-btn">guía del mejor micrófono para podcasting</a>', 'Tienes la comparativa completa en nuestra <a href="/guides/best-mic-for-podcasting_es.html" class="guide-link-btn">guía de micrófonos para podcasting</a>');
rep(7, 'Para una visión general completa, consulta nuestra <a href="/guides/best-microphone_es.html" class="guide-link-btn">guía del mejor micrófono</a>', 'Para ver el panorama completo, consulta nuestra <a href="/guides/best-microphone_es.html" class="guide-link-btn">guía del mejor micrófono</a>');
rep(8, '<strong>Combínalo con:</strong> el AT2020 incluye un soporte pivotante', '<strong>Para completarlo:</strong> el AT2020 incluye un soporte pivotante');
rep(8, 'un cable Mogami Gold Studio XLR</a> <a href="https://www.amazon.com/dp/B079GXTKN3', 'un cable Mogami Gold Studio XLR</a> y <a href="https://www.amazon.com/dp/B079GXTKN3');
rep(8, 'Para una visión general completa, consulta nuestra <a href="/guides/best-microphone_es.html" class="guide-link-btn">guía del mejor micrófono</a>', 'Para la comparativa completa, consulta nuestra <a href="/guides/best-microphone_es.html" class="guide-link-btn">guía del mejor micrófono</a>');
rep(9, '<strong>Combínalo con:</strong> el AT2035 se entrega con el soporte AT8458 (un accesorio por separado)', '<strong>Para completarlo:</strong> el AT2035 se entrega con el soporte AT8458 (que también se vende por separado)');
rep(9, 'un cable Mogami Gold Studio XLR</a> <a href="https://www.amazon.com/dp/B079GXTKN3', 'un cable Mogami Gold Studio XLR</a> y <a href="https://www.amazon.com/dp/B079GXTKN3');
rep(9, 'Para más opciones de condensadores, consulta nuestra <a href="/guides/best-microphone_es.html" class="guide-link-btn">guía del mejor micrófono</a>', 'Más condensadores en nuestra <a href="/guides/best-microphone_es.html" class="guide-link-btn">guía del mejor micrófono</a>');
fs.writeFileSync('data/guides.json', JSON.stringify(guides, null, 2));
console.log('done');
