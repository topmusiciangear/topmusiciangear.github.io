var fs = require('fs');
var guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
var g = guides.find(function (x) { return x.id === 'budget-mics'; });
var fixes = 0;
function repAll(obj, fields, a, b) {
  fields.forEach(function (f) {
    if (typeof obj[f] === 'string' && obj[f].indexOf(a) >= 0) { obj[f] = obj[f].split(a).join(b); fixes++; }
  });
}
var CF = ['content', 'content_es', 'heading', 'heading_es'];
g.sections.forEach(function (s) {
  repAll(s, CF, 'does not mea bad microphone', 'does not mean a bad microphone');
  repAll(s, CF, '(the inexpensive range runs –40, a Mogami Gold is)', '(budget cables run $20–$40, a Mogami Gold is $50 and up)');
  repAll(s, CF, "poor man'sM57", "poor man's SM57");
  repAll(s, CF, 'a accessory on its own', 'an accessory on its own');
  repAll(s, CF, 'Buy the Rode PodMic if consider a podcasting microphone.', "Buy the Rode PodMic if you're considering a podcasting microphone.");
  repAll(s, CF, 'Buy the Rode NT1 Signature Series if consider a studio-grade XLR condenser.', "Buy the Rode NT1 Signature Series if you're considering a studio-grade XLR condenser.");
  repAll(s, CF, 'Buy the Audio-Technica AT2020 if consider a professional microphone.', "Buy the Audio-Technica AT2020 if you're considering a professional microphone.");
  repAll(s, CF, 'Buy the Audio-Technica AT2035 if consider a versatile XLR condenser.', "Buy the Audio-Technica AT2035 if you're considering a versatile XLR condenser.");
});
// e945 review section (the missing 23rd) after e935 (index 11)
var e945sec = {
  heading: 'Sennheiser e945: A Closer Look',
  heading_es: 'Sennheiser e945: análisis detallado',
  content: '<p><strong>The e935 with a tighter grip: supercardioid focus for loud stages.</strong> The e945 takes the same German-built dynamic platform as the e935 — shock-mounted capsule, hum-compensating coil, neodymium magnet — and narrows the pickup to supercardioid with a presence boost between 2.5 kHz and 6 kHz. That combination pushes lead vocals above guitars and cymbals while rejecting monitors and bleed far better than its cardioid sibling, which is exactly what dense, high-volume mixes demand.</p><p>The trade-off is technique: the tight pattern punishes singers who drift off-axis, where the forgiving e935 keeps them covered. For frontwomen and frontmen who stay on the mic in loud wedge-heavy lineups, the e945 is the sharper, more authoritative tool; everyone else saves money with the e935.</p>',
  content_es: '<p><strong>El e935 con agarre más firme: enfoque supercardioide para escenarios ruidosos.</strong> El e945 parte de la misma plataforma dinámica alemana que el e935 — cápsula con suspensión, bobina antirruido e imán de neodimio — y estrecha la captación a supercardioide con realce de presencia entre 2.5 kHz y 6 kHz. Esa combinación pone la voz solista por encima de guitarras y platillos mientras rechaza monitores y sangrados mucho mejor que su hermano cardioide, justo lo que piden las mezclas densas a gran volumen.</p><p>La contrapartida es la técnica: el patrón cerrado castiga a quien se sale del eje, donde el tolerante e935 sigue cubriendo. Para vocalistas que no se apartan del micro en escenarios ruidosos con monitores potentes, el e945 es la herramienta más afilada y autoritaria; el resto ahorra con el e935.</p>',
  products: [228]
};
g.sections.splice(12, 0, e945sec);
fixes++;
fs.writeFileSync('data/guides.json', JSON.stringify(guides, null, 2));
console.log('fixes=' + fixes + ' sections=' + g.sections.length);
// confirm no leftovers
var s = JSON.stringify(g);
['mea bad microphone', 'runs –40', "man'sM57", 'a accessory on its own', 'if consider a'].forEach(function (t) {
  console.log(t + ': ' + (s.split(t).length - 1));
});
