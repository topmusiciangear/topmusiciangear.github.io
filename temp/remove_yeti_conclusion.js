var fs = require('fs');
var BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
var d = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
var g = d.find(function (x) { return x.id === 'usb-mics'; });

// Remove Blue Yeti recommendation from conclusion
g.conclusion = g.conclusion.replace(
  'If you want the classic multi-pattern USB mic that started it all, with gain, mute and headphone volume on the body, get the <strong>Blue Yeti USB Microphone</strong>. ',
  ''
);
g.conclusion_es = g.conclusion_es.replace(
  'Si quieres el clásico micro USB multipatrón que lo empezó todo, con ganancia, mute y volumen de auriculares en el cuerpo, ve por el <strong>Blue Yeti USB Microphone</strong>. ',
  ''
);

fs.writeFileSync(BASE + 'data/guides.json', JSON.stringify(d, null, 2));
console.log('Removed Blue Yeti from conclusion');