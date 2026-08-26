var fs = require('fs');

// EN version
var h = fs.readFileSync('guides/best-keyboard.html', 'utf8');

var calloutEN = `<div class="guide-callout">
  <p><strong>&#9888;&#65039; Note for Beginners:</strong> Keyboards labeled as <strong>MIDI Controllers</strong> (like the Arturia, Akai, or Novation below) do <strong>not</strong> have built-in speakers or sounds. They must be connected to a computer, tablet, or smartphone to work. If you want a keyboard that plays sound the second you turn it on, jump straight to our <a href="#sec-6">Digital Pianos</a> or <a href="#sec-5">Arranger Keyboards</a> sections below!</p>
</div>`;

// Insert callout right after the opening of sec-4 section, before the h2
var sec4marker = '<div class="guide-section">\n      <h2 class="guide-section-heading" id="sec-4">';
if (h.includes(sec4marker)) {
  h = h.replace(sec4marker, '<div class="guide-section">\n      ' + calloutEN + '\n      <h2 class="guide-section-heading" id="sec-4">');
  fs.writeFileSync('guides/best-keyboard.html', h);
  console.log('EN: callout added before sec-4');
} else {
  // Try alternate pattern
  var sec4alt = h.indexOf('id="sec-4"');
  if (sec4alt >= 0) {
    // Find the opening div of this section
    var sectionStart = h.lastIndexOf('<div class="guide-section">', sec4alt);
    var h2Start = h.indexOf('<h2', sec4alt);
    var insertPoint = h2Start;
    h = h.substring(0, insertPoint) + calloutEN + '\n      ' + h.substring(insertPoint);
    fs.writeFileSync('guides/best-keyboard.html', h);
    console.log('EN: callout added before h2 in sec-4 (alt method)');
  } else {
    console.log('EN: sec-4 not found!');
  }
}

// ES version
var hES = fs.readFileSync('guides/best-keyboard_es.html', 'utf8');

var calloutES = `<div class="guide-callout">
  <p><strong>&#9888;&#65039; Nota para Principiantes:</strong> Los teclados etiquetados como <strong>Controladores MIDI</strong> (como el Arturia, Akai o Novation que verás más abajo) <strong>no</strong> tienen altavoces ni sonidos integrados. Deben conectarse a una computadora, tableta o smartphone para funcionar. Si quieres un teclado que suene desde el momento en que lo enciendes, ¡ve directamente a nuestras secciones de <a href="#sec-6">Pianos Digitales</a> o <a href="#sec-5">Teclados Arreglista</a> más abajo!</p>
</div>`;

var sec4markerES = '<div class="guide-section">\n      <h2 class="guide-section-heading" id="sec-4">';
if (hES.includes(sec4markerES)) {
  hES = hES.replace(sec4markerES, '<div class="guide-section">\n      ' + calloutES + '\n      <h2 class="guide-section-heading" id="sec-4">');
  fs.writeFileSync('guides/best-keyboard_es.html', hES);
  console.log('ES: callout added before sec-4');
} else {
  var sec4altES = hES.indexOf('id="sec-4"');
  if (sec4altES >= 0) {
    var h2StartES = hES.indexOf('<h2', sec4altES);
    hES = hES.substring(0, h2StartES) + calloutES + '\n      ' + hES.substring(h2StartES);
    fs.writeFileSync('guides/best-keyboard_es.html', hES);
    console.log('ES: callout added before h2 in sec-4 (alt method)');
  } else {
    console.log('ES: sec-4 not found!');
  }
}
