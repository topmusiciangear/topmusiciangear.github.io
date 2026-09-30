var fs = require('fs');
var s = fs.readFileSync('js/translations.v4.min.js', 'utf8');
var a = 'escúchalo en Spotify</a>). Después de graduarme en la Escuela de Música en Cuba en el 2005 y con más de 20 Años de experiencia, he tenido la fortuna';
var b = 'escúchalos en Spotify</a>). Me gradué en la Escuela de Música de Cuba en 2005 y, con más de 20 años de experiencia, he tenido la fortuna';
if (s.indexOf(a) < 0) { console.log('NO ENCONTRADO'); process.exit(1); }
s = s.split(a).join(b);
fs.writeFileSync('js/translations.v4.min.js', s);
new Function(fs.readFileSync('js/translations.v4.min.js', 'utf8'));
console.log('ok + sintaxis OK');
