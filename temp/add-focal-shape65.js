const fs = require('fs');
const path = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const guides = JSON.parse(fs.readFileSync(path, 'utf8'));
const arr = Array.isArray(guides) ? guides : guides.guides || [];
const idx = arr.findIndex(x => x.id === 'best-monitors');
if (idx === -1) { console.error('Guía best-monitors no encontrada'); process.exit(1); }
const g = arr[idx];

// Verificar si ya está agregado
if (g.featuredProducts.includes(1054)) {
  console.log('El Focal Shape 65 ya está en featuredProducts');
} else {
  g.featuredProducts.push(1054);
  console.log('Agregado a featuredProducts');
}

// 1. Agregar sección para Focal Shape 65 (después de la última sección actual)
const focalSection = {
  "heading": "Is the Focal Shape 65 the Best Studio Monitor for Accurate Mixing?",
  "heading_es": "¿Es el Focal Shape 65 el mejor monitor de estudio para mezcla precisa?",
  "content": "<p><strong>Focal's Shape 65 skips the traditional bass-reflex port entirely, using two side-firing passive radiators instead.</strong> That means you can place it right against a wall without the bass getting boomy or uncontrolled — a real advantage in small rooms and desktop setups. The 6.5-inch Flax cone woofer delivers tight, natural low end with the organic character Focal is known for, while the 1-inch inverted dome tweeter handles highs with precision and no harshness. Class AB amplification keeps the sound musical and fatigue-free across long mixing sessions. Before buying, note that passive radiators need a little breathing room on the sides, and the monitor is sold individually so a stereo pair costs around $1,400.</p>",
  "content_es": "<p><strong>El Focal Shape 65 prescinde del puerto bass-reflex tradicional, usando en su lugar dos radiadores pasivos laterales.</strong> Eso significa que puedes colocarlo justo contra una pared sin que los graves se vuelvan boomios o descontrolados — una ventaja real en salas pequeñas y escritorios. El woofer de cono Flax de 6,5 pulgadas ofrece graves bajos naturales y precisos con el carácter orgánico por el que Focal es conocida, mientras que el tweeter de cúpula invertida de 1 pulgada maneja los agudos con precisión y sin aspereza. La amplificación Clase AB mantiene el sonido musical y sin fatiga durante largas sesiones de mezcla. Antes de comprar, ten en cuenta que los radiadores pasivos necesitan un poco de espacio en los lados, y el monitor se vende individualmente, así que un par estéreo ronda los $1,400.</p>",
  "products": [1054],
  "verdict": "",
  "verdict_es": "",
  "pros": [],
  "pros_es": [],
  "cons": [],
  "cons_es": [],
  "specs": {}
};
g.sections.push(focalSection);
console.log('Agregada sección para Focal Shape 65');

// 2. Agregar columna a productTable.columns
g.productTable.columns.push({
  "title": "Focal Shape 65",
  "title_es": "Focal Shape 65"
});
console.log('Agregada columna a productTable.columns');

// 3. Agregar valor a cada fila de productTable.rows
const focalRowValues = {
  "Best For": { "value": "Wall-adjacent nearfield mixing", "value_es": "Mezcla de campo cercano pegado a la pared" },
  "Type": { "value": "2-way powered", "value_es": "Biamplificado de 2 vías" },
  "Woofer": { "value": "6.5\" Flax", "value_es": "6,5\" cono Flax" },
  "Tweeter": { "value": "1\" inverted dome", "value_es": "Cúpula invertida de 1\"" },
  "Power": { "value": "80W Class AB", "value_es": "80W Clase AB" },
  "Frequency Response": { "value": "40 Hz – 35 kHz", "value_es": "40 Hz – 35 kHz" },
  "Max SPL": { "value": "108 dB", "value_es": "108 dB" },
  "Dimensions": { "value": "13 x 8.3 x 10.6 in", "value_es": "33 x 21 x 27 cm" }
};

g.productTable.rows.forEach(row => {
  const fv = focalRowValues[row.label];
  if (fv) {
    row.values.push(fv);
  } else {
    row.values.push({ "value": "N/A", "value_es": "N/D" });
  }
});
console.log('Agregados valores a productTable.rows');

// 4. Agregar entrada a verdictProsCons
const focalVerdict = {
  "name": "Focal Shape 65",
  "name_es": "Focal Shape 65",
  "pros": [
    "No bass-reflex port means wall-adjacent placement without boom",
    "Flax cone delivers organic, detailed midrange with natural timbre",
    "Inverted dome tweeter is smooth and fatigue-free for long sessions",
    "Class AB amplification sounds musical rather than clinical"
  ],
  "cons": [
    "No built-in room correction or DSP",
    "Side-firing passive radiators need side clearance",
    "Sold individually — a stereo pair is expensive",
    "Bass extension is present but not deep for sub-heavy work"
  ],
  "pros_es": [
    "Sin puerto bass-reflex, permite colocación pegada a la pared sin retumbos",
    "El cono Flax ofrece medios orgánicos y detallados con timbre natural",
    "El tweeter de cúpula invertida es suave y sin fatiga para sesiones largas",
    "La amplificación Clase AB suena musical, no clínica"
  ],
  "cons_es": [
    "Sin corrección de sala ni DSP integrados",
    "Los radiadores pasivos laterales necesitan espacio en los costados",
    "Se vende individualmente — un par estéreo es costoso",
    "Los graves están presentes pero no profundos para trabajo con subgraves"
  ]
};
g.verdictProsCons.push(focalVerdict);
console.log('Agregada entrada a verdictProsCons');

// 5. Agregar a conclusion y conclusion_es
g.conclusion = g.conclusion.replace(
  '</p>',
  '<p><strong><span class="product-name">Focal Shape 65</span></strong> — Nearfield monitor with passive radiators for wall-adjacent placement, Flax cone for organic tone, and fatigue-free Class AB sound.</p>'
);
g.conclusion_es = g.conclusion_es.replace(
  '</p>',
  '<p><strong><span class="product-name">Focal Shape 65</span></strong> — Monitor de campo cercano con radiadores pasivos para colocación pegada a la pared, cono Flax para tono orgánico y sonido Clase AB sin fatiga.</p>'
);
console.log('Actualizados conclusion y conclusion_es');

// 6. Agregar a verdict y verdict_es
const focalVerdictBlock = `<p><strong><span class="product-name">Focal Shape 65</span></strong> — Nearfield monitor with dual side-firing passive radiators instead of a bass-reflex port, Flax cone and Class AB amplification. Ideal for small rooms and wall-adjacent placement.</p>`;
const focalVerdictBlock_es = `<p><strong><span class="product-name">Focal Shape 65</span></strong> — Monitor de campo cercano con dos radiadores pasivos laterales en lugar de puerto bass-reflex, cono Flax y amplificación Clase AB. Ideal para salas pequeñas y colocación pegada a la pared.</p>`;

g.verdict = g.verdict.replace('</p>', focalVerdictBlock);
g.verdict_es = g.verdict_es.replace('</p>', focalVerdictBlock_es);
console.log('Actualizados verdict y verdict_es');

// 7. Agregar FAQ
const focalFaq = {
  "q": "Is the Focal Shape 65 good for small rooms?",
  "a": "Yes. The Focal Shape 65 uses two side-firing passive radiators instead of a rear bass port, so you can place it close to a wall without the bass getting boomy. The 6.5-inch Flax cone delivers tight, musical low end and the inverted dome tweeter stays smooth at any volume. It is an excellent choice for small mixing rooms and desktop setups.",
  "q_es": "¿Es el Focal Shape 65 bueno para salas pequeñas?",
  "a_es": "Sí. El Focal Shape 65 usa dos radiadores pasivos laterales en lugar de un puerto de graves trasero, así que puedes colocarlo cerca de una pared sin que los graves se vuelvan boomios. El cono Flax de 6,5 pulgadas ofrece bajos bajos ajustados y musicales, y el tweeter de cúpula invertida se mantiene suave a cualquier volumen. Es una excelente opción para salas de mezcla pequeñas y escritorios."
};
g.faq.push(focalFaq);
console.log('Agregada FAQ para Focal Shape 65');

fs.writeFileSync(path, JSON.stringify(arr, null, 2));
console.log('Guía guardada con éxito');