var fs = require('fs');
var s = fs.readFileSync('js/translations.v4.min.js', 'utf8');
var pairs = [
['Apasionado del Gear', 'Apasionado del equipo'],
['donde la música lo atraviesa todo. Desde el son cubano que resuena en las calles hasta los clubes de jazz, he estado inmerso en el sonido toda mi vida.', 'donde la música está en todas partes. Entre el son cubano de las calles y los clubes de jazz, llevo toda la vida inmerso en el sonido.'],
['con Topaz Sound de Suecia — la disquera que manejaba a la superestrella jamaicana Sean Paul. Juntos produjimos Regueton a lo Cubano, el primer disco de reguetón hecho en Cuba con una disquera extranjera. Produje 7 pistas de ese CD — grabando voces con un micrófono Neumann M149 Tube usando Logic Pro y creando beats con FL Studio.', 'con Topaz Sound, Suecia — el sello que llevaba a la superestrella jamaicana Sean Paul. Juntos produjimos Regueton a lo Cubano, el primer disco de reguetón hecho en Cuba con un sello extranjero. Produje 7 de sus temas — grabando voces con un Neumann M149 de válvulas en Logic Pro y creando beats con FL Studio.'],
['escúchalo en Spotify</a>). Después de graduarme en la Escuela de Música en Cuba en el 2005 y con más de 20 años de experiencia, he tenido la fortuna', 'escúchalos en Spotify</a>). Me gradué en la Escuela de Música de Cuba en 2005 y, con más de 20 años de experiencia, he tenido la fortuna'],
['trabajando y aprendiendo de los ingenieros de sonido más expertos y probando los sistemas de sonido más top del mundo.', 'aprendiendo de los mejores ingenieros de sonido y probando los mejores sistemas de sonido del mundo.'],
['en Londres — una ciudad donde he vivido por muchos años. Fue allí donde tuve la oportunidad de grabar en el mismo estudio que inmortalizó', 'en Londres — una ciudad donde viví muchos años. Allí grabé en el mismo estudio que inmortalizó'],
['Todo lo que recomiendo es equipo en el que realmente creo que puede elevar tu sonido — ya sea que estés comenzando o encabezando tu propia gira.', 'Todo lo que recomiendo es equipo en el que creo de verdad porque puede mejorar tu sonido — estés empezando o encabezando tu propia gira.'],
];
var fails = [];
pairs.forEach(function ([a, b]) {
  if (s.indexOf(a) < 0) { fails.push(a.slice(0, 50)); return; }
  s = s.split(a).join(b);
});
if (fails.length) { console.log('FALLOS:'); fails.forEach(f => console.log(' ! ' + f)); process.exit(1); }
fs.writeFileSync('js/translations.v4.min.js', s);
new Function(fs.readFileSync('js/translations.v4.min.js', 'utf8'));
console.log('v4.min sincronizado y sintaxis OK (' + pairs.length + ' reemplazos)');
