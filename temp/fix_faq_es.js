const fs=require('fs');
let txt=fs.readFileSync('data/guides.json','utf8');

// Fix FAQ Spanish strings
txt = txt.replace(
  '"faq_a1_es": "FP-30X — la acción PHA-4 más pesada con escape forja fuerza real en los dedos; el P-225 se siente más rápido pero ligero."',
  '"faq_a1_es": "FP-30X — la acción PHA-4 más pesada con escape desarrolla fuerza real en los dedos; el P-225 se siente más rápido pero ligero."'
);

txt = txt.replace(
  '"faq_q2_es": "¿Cuál graba en un DAW con menos lío?"',
  '"faq_q2_es": "¿Cuál graba en un DAW con menos complicaciones?"'
);

txt = txt.replace(
  '"faq_a2_es": "P-225 — un solo USB lleva el audio digital exacto; el FP-30X pide sus salidas de línea a una interfaz."',
  '"faq_a2_es": "Empate técnico en el estudio, pero Roland ofrece más versatilidad. Ambos pianos incluyen interfaz de audio USB integrada, por lo que grabas el sonido digital exacto directo al ordenador con un solo cable. Sin embargo, el FP-30X añade salidas de línea profesionales dedicadas en el panel trasero, permitiéndote conectarlo a monitores de estudio o mesas de mezcla sin deshabilitar la salida de auriculares."'
);

txt = txt.replace(
  '"faq_q3_es": "¿Cuál es mejor para clases y tocar encima?"',
  '"faq_q3_es": "¿Cuál es mejor para tomar clases y tocar encima de canciones?"'
);

txt = txt.replace(
  '"faq_a3_es": "FP-30X — Bluetooth de audio más MIDI conecta apps de lecciones y DAWs; el P-225 transmite audio para tocar encima."',
  '"faq_a3_es": "FP-30X — Bluetooth de audio y MIDI conecta apps de lecciones y DAWs; el P-225 solo transmite audio por Bluetooth."'
);

txt = txt.replace(
  '"faq_q4_es": "¿Cuál llevo a los bolos?"',
  '"faq_q4_es": "¿Cuál es el mejor para transportar a conciertos y presentaciones en vivo?"'
);

txt = txt.replace(
  '"faq_a4_es": "P-225 — 11,5 kg frente a 14,8 kg marcan la diferencia cargando cada fin de semana."',
  '"faq_a4_es": "P-225 — 11,5 kg frente a 14,8 kg marcan una diferencia abismal si tienes que cargar el instrumento en su funda cada fin de semana."'
);

fs.writeFileSync('data/guides.json', txt);
console.log('FAQ ES fixed');