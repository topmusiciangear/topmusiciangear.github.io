const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const guide = guides.find(g => g.id === 'best-interface');

// New conclusion in English
guide.conclusion = '<p>If budget is no obstacle and you want the most reliable long-term investment, make it the RME Babyface Pro FS — its rock-solid drivers, SteadyClock FS jitter suppression, and pristine conversion remain unmatched. If you want pro studio sound for a fraction of the price, the Audient iD2 delivers console-grade preamps, onboard DSP, and room to grow, while the Focusrite Scarlett 2i2 4th Gen stays the easiest plug-and-play starting point.</p>';

// New conclusion in Spanish
guide.conclusion_es = '<p>Si el presupuesto no es un obstáculo y quieres la inversión a largo plazo más fiable, elige el RME Babyface Pro FS — sus drivers inquebrantables, la supresión de jitter SteadyClock FS y su conversión impecable siguen sin rival. Si quieres sonido de estudio profesional por una fracción del precio, el Audient iD2 ofrece preamplificadores con calidad de consola, DSP integrado y margen para crecer, mientras que el Focusrite Scarlett 2i2 4th Gen sigue siendo el punto de partida plug-and-play más sencillo.</p>';

// Update the guide in the array
const idx = guides.findIndex(g => g.id === 'best-interface');
guides[idx] = guide;
fs.writeFileSync('data/guides.json', JSON.stringify(guides, null, 2), 'utf8');

// Verify
const updated = guides.find(g => g.id === 'best-interface');
console.log('=== VERIFICATION ===');
console.log('EN Conclusion:', updated.conclusion);
console.log('---');
console.log('ES Conclusion:', updated.conclusion_es);