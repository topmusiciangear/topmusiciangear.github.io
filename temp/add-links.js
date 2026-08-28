var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var idx = g.findIndex(function(x){return x.id==='best-32-channel-digital-mixers'});
var guide = g[idx];

var internalLinks = '<p style="margin-top:20px;font-size:14px;color:var(--text-secondary)"><strong>También te puede interesar:</strong> ' +
  '<a href="/guides/best-digital-mixers.html" style="color:var(--accent)">Mejores Mezcladoras Digitales</a> · ' +
  '<a href="/guides/best-analog-mixers.html" style="color:var(--accent)">Mejores Mezcladoras Analógicas</a> · ' +
  '<a href="/guides/best-compact-mixers.html" style="color:var(--accent)">Mejores Mezcladoras Compactas</a> · ' +
  '<a href="/guides/best-live-sound-mixers.html" style="color:var(--accent)">Mejores Mezcladoras para Sonido en Vivo</a> · ' +
  '<a href="/guides/best-daw-for-beginners.html" style="color:var(--accent)">Mejores DAWs para Principiantes</a>' +
  '</p>';

guide.conclusion = guide.conclusion + internalLinks;
guide.conclusion_es = guide.conclusion_es + internalLinks;

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2), 'utf8');
console.log('Added internal links');
