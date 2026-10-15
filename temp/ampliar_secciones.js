// Amplia las dos secciones mas cortas de la guia (0 y 2) con criterio util,
// no con relleno. Todo lo anadido o es referencia interna a la propia guia
// o es juicio: ninguna spec nueva que no este verificada.
const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const s = g.find(x => x.id === 'starter-studio');

const palabras = h => h.replace(/<[^>]+>/g, ' ').trim().split(' ').filter(w => /[a-zA-ZáéíóúñÁÉÍÓÚÑ]/.test(w)).length;

/* ══ SECCION 0 · la cadena de señal ══ */
const antes0 = { en: palabras(s.sections[0].content), es: palabras(s.sections[0].content_es) };

s.sections[0].content +=
  '<p><strong>Those five stages are what the table in this guide is actually buying.</strong> The source is the microphone. The preamp and the conversion are the interface, which is why they never appear as two separate line items. Monitoring is the headphones for checking a take and the pair of speakers for deciding one. The room is the four panels, and it is the only stage on this list that improves everything you already own instead of adding to it.</p>' +
  '<p>The same order is also the order to spend money in later. When some turns up, it turns up in sequence: interface before monitors, monitors before a second microphone, and the room before anything else on the list gets upgraded. An interface with Auto Gain removes a task you were doing by ear. A nicer microphone removes no task at all — it just records the same room more accurately.</p>';

s.sections[0].content_es +=
  '<p><strong>Esas cinco etapas son lo que compra en realidad la tabla de esta guía.</strong> La fuente es el micrófono. El preamplificador y la conversión son la interfaz, y por eso nunca aparecen como dos partidas distintas. La monitorización son los auriculares para comprobar una toma y el par de altavoces para decidir una. La sala son los cuatro paneles, y es la única etapa de esta lista que mejora todo lo que ya tienes en lugar de añadir algo.</p>' +
  '<p>Ese mismo orden es también el orden en el que deberías gastar el dinero más adelante. Cuando aparezca, aparece en secuencia: interfaz antes que monitores, monitores antes que un segundo micrófono, y la sala antes de mejorar cualquier otra cosa de la lista. Una interfaz con Auto Gain elimina una tarea que hacías de oído. Un micrófono más bonito no elimina ninguna: solo graba la misma sala con más precisión.</p>';

/* ══ SECCION 2 · $299 frente a $199 ══ */
const antes2 = { en: palabras(s.sections[2].content), es: palabras(s.sections[2].content_es) };

s.sections[2].content +=
  '<p>There is a third case, and it is the one people get wrong. If your source is already bright — a condenser in an untreated room, an acoustic guitar with a great deal of top end — the 4K circuit lifts the high frequencies further and you are colouring a problem you already had. In that situation the Scarlett is not the neutral option, it is the corrective one. Treat that button as a decision about what you are recording, not as a quality setting you leave switched on.</p>' +
  '<p>What the extra hundred buys on the SSL side is convenience you can see: MIDI for a controller, and two headphone outputs so you can cue a second pair. It does not buy a different class of conversion — both convert at 24 bits — and it does not buy silence, because silence was never the argument here. The Scarlett keeps the Auto Gain and Clip Safe that take the guesswork out of levels, and gives up the MIDI, the second headphone output and the colour. That is the whole trade, and it is a fair one either way.</p>';

s.sections[2].content_es +=
  '<p>Hay un tercer caso, y es el que la gente suele equivocarse. Si tu fuente ya es brillante —un condensador en una sala sin tratar, una guitarra acústica con mucho agudo—, el circuito 4K realza todavía más las altas frecuencias y estás tiñendo un problema que ya tenías. En esa situación la Scarlett no es la opción neutra, es la correctora. Trata ese botón como una decisión sobre lo que estás grabando, no como un ajuste de calidad que se deja puesto.</p>' +
  '<p>Lo que compra el ciento de dólares extra en la SSL es comodidad que se ve: MIDI para un controlador y dos salidas de auriculares para preparar un segundo par. No compra otra clase de conversión —las dos convierten a 24 bits— ni compra silencio, porque el silencio nunca fue el argumento. La Scarlett conserva el Auto Gain y el Clip Safe que quitan la adivinanza de los niveles, y a cambio deja el MIDI, la segunda salida de auriculares y el color. Ese es todo el intercambio, y en los dos casos es razonable.</p>';

fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');

/* CONTROL */
const s2 = JSON.parse(fs.readFileSync(F, 'utf8')).find(x => x.id === 'starter-studio');
console.log('=== LONGITUD ===\n');
[0, 2].forEach(i => {
  console.log('  sec[' + i + '] ' + s2.sections[i].heading_es.slice(0, 50));
  console.log('        EN  ' + antes0 && palabras(s2.sections[i].content) + ' palabras (' + (i === 0 ? antes0.en : antes2.en) + ' antes)');
  console.log('        ES  ' + palabras(s2.sections[i].content_es) + ' palabras (' + (i === 0 ? antes0.es : antes2.es) + ' antes)');
});
const todas = s2.sections.map(x => palabras(x.content_es)).sort((a, b) => a - b);
console.log('\n  minimo de la guia ahora : ' + todas[0] + ' palabras');
console.log('  promedio                : ' + Math.round(todas.reduce((a, b) => a + b, 0) / todas.length));
console.log('  las 4 mas cortas        : ' + todas.slice(0, 4).join(', '));
console.log('\n  parrafos sec[0]: ' + (s2.sections[0].content.match(/<p>/g) || []).length + ' EN / ' + (s2.sections[0].content_es.match(/<p>/g) || []).length + ' ES');
console.log('  parrafos sec[2]: ' + (s2.sections[2].content.match(/<p>/g) || []).length + ' EN / ' + (s2.sections[2].content_es.match(/<p>/g) || []).length + ' ES');
console.log('  EN y ES mismo numero de parrafos: ' +
  ([0, 2].every(i => (s2.sections[i].content.match(/<p>/g) || []).length === (s2.sections[i].content_es.match(/<p>/g) || []).length) ? 'si' : 'NO'));
console.log('  mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
