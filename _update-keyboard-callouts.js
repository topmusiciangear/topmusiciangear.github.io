var g=JSON.parse(require('fs').readFileSync('data/guides.json','utf8'));
var r=g.find(function(x){return x.id==='best-keyboard'});

// Section index 1 = digital pianos (Yamaha/Roland) - add beginner callout at end
var s2=r.sections[1];
var beginnerCallout='<div class="guide-callout" style="background:#fff3cd;border-left:4px solid #ffc107;padding:16px 20px;margin:24px 0;border-radius:4px;"><p style="margin:0 0 8px 0;"><strong>Note for Beginners:</strong></p><p style="margin:0;">Keyboards labeled as MIDI Controllers (like the Arturia or Akai below) do not have built-in speakers or sounds. They must be connected to a computer, tablet, or smartphone to work. If you want a keyboard that plays sound the second you turn it on, jump straight to our <a class="guide-link-btn" href="/guides/best-digital-pianos.html">Digital Pianos</a> or Arranger Keyboards sections below!</p></div>';
var beginnerCalloutEs='<div class="guide-callout" style="background:#fff3cd;border-left:4px solid #ffc107;padding:16px 20px;margin:24px 0;border-radius:4px;"><p style="margin:0 0 8px 0;"><strong>Nota para Principiantes:</strong></p><p style="margin:0;">Los teclados etiquetados como Controladores MIDI (como el Arturia o Akai que verás abajo) no tienen altavoces ni sonidos integrados. Deben conectarse a una computadora, tableta o teléfono inteligente para funcionar. Si quieres un teclado que suene al encenderlo, ve directamente a nuestras secciones de <a class="guide-link-btn" href="/guides/best-digital-pianos_es.html">Pianos Digitales</a> o Teclados Arreglistas más abajo!</p></div>';
s2.content+=beginnerCallout;
s2.content_es+=beginnerCalloutEs;

// Section index 4 = Roland GO:KEYS 3 - add recommendation callout at start
var s5=r.sections[4];
var gokeysCallout='<div class="guide-callout" style="background:#d4edda;border-left:4px solid #28a745;padding:16px 20px;margin:24px 0;border-radius:4px;"><p style="margin:0 0 8px 0;"><strong>Best All-in-One Keyboard:</strong></p><p style="margin:0;">If you want an all-in-one electronic keyboard with built-in speakers, auto-accompaniment rhythms, and hundreds of sounds \u2014 without needing a computer \u2014 the <strong>Roland GO:KEYS 3</strong> is the best choice.</p></div>';
var gokeysCalloutEs='<div class="guide-callout" style="background:#d4edda;border-left:4px solid #28a745;padding:16px 20px;margin:24px 0;border-radius:4px;"><p style="margin:0 0 8px 0;"><strong>Mejor Teclado Todo-en-Uno:</strong></p><p style="margin:0;">Si quieres un teclado electr\u00f3nico todo-en-uno con altavoces integrados, ritmos de acom\u00f1amiento autom\u00e1tico y cientos de sonidos \u2014 sin necesitar una computadora \u2014 el <strong>Roland GO:KEYS 3</strong> es la mejor opci\u00f3n.</p></div>';
s5.content=gokeysCallout+s5.content;
s5.content_es=gokeysCalloutEs+s5.content_es;

require('fs').writeFileSync('data/guides.json',JSON.stringify(g,null,2));
console.log('done');
