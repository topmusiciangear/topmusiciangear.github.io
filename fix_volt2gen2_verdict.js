const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const guide = guides.find(g => g.id === 'best-interface');

// Fix English verdict
guide.verdict = guide.verdict.replace(
  '<p><strong><span class="product-name">Universal Audio Volt 2 Gen 2</span></strong> — UA quality with simple plug-and-play operation. Vintage Mic Preamp mode emulates the classic UA 610 tube preamp.</p>',
  '<p><strong><span class="product-name">Universal Audio Volt 2 Gen 2</span></strong> — UA quality with three Tone Shaping modes (Warmth, Focus, Shine), 32-bit/192 kHz conversion, a full-color Smart Display, and Auto-Gain with Clip Protection. Two digitally controlled preamps with 60 dB gain and independent 48V phantom per channel.</p>'
);

// Fix Spanish verdict
guide.verdict_es = guide.verdict_es.replace(
  '<p><strong><span class="product-name">Universal Audio Volt 2 Gen 2</span></strong> — Calidad UA con manejo simple y directo. El modo Vintage Mic Preamp emula el clásico previo de tubo UA 610. MIDI I/O y construcción sólida con diseño retro que destaca.</p>',
  '<p><strong><span class="product-name">Universal Audio Volt 2 Gen 2</span></strong> — Calidad UA con tres modos de moldeado tonal (Warmth, Focus, Shine), conversión de 32 bits/192 kHz, pantalla Smart Display a color y Auto-Gain con protección contra recorte. Dos previos controlados digitalmente con 60 dB de ganancia y phantom 48V independiente por canal.</p>'
);

// Also fix the Audient iD2 verdict to include updated info
guide.verdict = guide.verdict.replace(
  '<p><strong><span class="product-name">Audient iD2</span></strong> — Console-grade preamps in a compact interface. The same Class-A mic pres found in Audient\'s ASP8024 console. Dual headphone outputs and JFET DI input for instruments.</p>',
  '<p><strong><span class="product-name">Audient iD2</span></strong> — Console-grade preamps with ADAT expansion. Two Audient Console mic preamps with 75 dB gain, 32-bit/192 kHz conversion, onboard DSP (EQ, compression, reverb), RoomTune monitor correction, and monitor control for two speaker pairs.</p>'
);

guide.verdict_es = guide.verdict_es.replace(
  '<p><strong><span class="product-name">Audient iD2</span></strong> — Preamplificadores con calidad de consola en una interfaz compacta. Los mismos previos de micrófono Clase A que se encuentran en la consola ASP8024 de Audient.</p>',
  '<p><strong><span class="product-name">Audient iD2</span></strong> — Preamplificadores con calidad de consola con expansión ADAT. Dos previos Audient Console con 75 dB de ganancia, conversión de 32 bits/192 kHz, DSP integrado (EQ, compresión, reverb), corrección de monitores RoomTune y control de monitores para dos pares de altavoces.</p>'
);

// Update the guide in the array
const idx = guides.findIndex(g => g.id === 'best-interface');
guides[idx] = guide;
fs.writeFileSync('data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('Verdict updated successfully');

// Verify
const updated = guides.find(g => g.id === 'best-interface');
console.log('\nVolt 2 Gen 2 in verdict:', updated.verdict.includes('Volt 2 Gen 2') ? 'YES' : 'NO');
console.log('Vintage Mic Preamp remaining:', updated.verdict.includes('Vintage Mic Preamp') ? 'YES (ERROR)' : 'NO (GOOD)');