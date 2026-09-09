var fs = require('fs');
var full = fs.readFileSync('data/guides.json', 'utf8');

var si = full.indexOf('"id": "best-microphone"');
var ei = full.indexOf('"id": "best-monitors"', si);
if (si < 0 || ei < 0) throw new Error('guide boundaries not found ' + si + ' ' + ei);
var pre = full.slice(0, si);
var seg = full.slice(si, ei);
var post = full.slice(ei);

function one(oldStr, newStr, tag) {
  var idx = seg.indexOf(oldStr);
  if (idx < 0) throw new Error('anchor not found: ' + tag);
  if (seg.indexOf(oldStr, idx + 1) >= 0) throw new Error('anchor NOT unique: ' + tag + ' (2+ matches)');
  seg = seg.slice(0, idx) + newStr + seg.slice(idx + oldStr.length);
  console.log('ok:', tag);
}

// ---- 1. productTable: column ----
one(
  '"title": "Elgato Wave:3",\n          "title_es": "Elgato Wave:3"\n        }\n      ],\n      "rows":',
  '"title": "Elgato Wave:3",\n          "title_es": "Elgato Wave:3"\n        },\n        {\n          "title": "Shure SM7dB",\n          "title_es": "Shure SM7dB"\n        }\n      ],\n      "rows":',
  'table column SM7dB'
);

// ---- 2. rows values ----
one(
  '"value": "USB streaming & podcasting",\n              "value_es": "Streaming y podcast por USB"\n            }\n          ]',
  '"value": "USB streaming & podcasting",\n              "value_es": "Streaming y podcast por USB"\n            },\n            {\n              "value": "Broadcast voice with built-in preamp",\n              "value_es": "Voz de broadcast con previo integrado"\n            }\n          ]',
  'row Best For'
);
one(
  '"value": "Condenser (USB)",\n              "value_es": "Condensador (USB)"\n            }\n          ]',
  '"value": "Condenser (USB)",\n              "value_es": "Condensador (USB)"\n            },\n            {\n              "value": "Dynamic (with built-in preamp)",\n              "value_es": "Dinámico (con previo integrado)"\n            }\n          ]',
  'row Type'
);
one(
  '"value": "Cardioid",\n              "value_es": "Cardioide"\n            }\n          ]\n        },\n        {\n          "label": "Frequency Response",',
  '"value": "Cardioid",\n              "value_es": "Cardioide"\n            },\n            {\n              "value": "Cardioid",\n              "value_es": "Cardioide"\n            }\n          ]\n        },\n        {\n          "label": "Frequency Response",',
  'row Polar Pattern'
);
one(
  '"value": "20 Hz – 20 kHz",\n              "value_es": "20 Hz – 20 kHz"\n            }\n          ]\n        },\n        {\n          "label": "Connection",',
  '"value": "20 Hz – 20 kHz",\n              "value_es": "20 Hz – 20 kHz"\n            },\n            {\n              "value": "50 Hz – 20 kHz",\n              "value_es": "50 Hz – 20 kHz"\n            }\n          ]\n        },\n        {\n          "label": "Connection",',
  'row Frequency Response'
);
one(
  '"value": "USB-C",\n              "value_es": "USB-C"\n            }\n          ]\n        }\n      ]\n    },',
  '"value": "USB-C",\n              "value_es": "USB-C"\n            },\n            {\n              "value": "XLR",\n              "value_es": "XLR"\n            }\n          ]\n        }\n      ]\n    },',
  'row Connection'
);

// ---- 3. verdictProsCons after Elgato Wave:3 ----
one(
  '"La integración por software es más potente dentro del ecosistema Elgato"\n        ]\n      }\n    ],',
  '"La integración por software es más potente dentro del ecosistema Elgato"\n        ]\n      },\n      {\n        "name": "Shure SM7dB",\n        "name_es": "Shure SM7dB",\n        "pros": [\n          "Same warm, smooth SM7B broadcast voice with +18 or +28 dB of clean gain built in",\n          "No Cloudlifter needed — any 48V interface drives it",\n          "Cardioid with bass roll-off, presence boost, internal shock mount and windscreen",\n          "The everyday broadcast workflow without extra gear"\n        ],\n        "cons": [\n          "Costs more than the plain SM7B — you pay for the built-in preamp",\n          "XLR only, so it still needs an interface or mixer",\n          "Heavier and bulkier than smaller dynamics"\n        ],\n        "pros_es": [\n          "La misma voz cálida y suave de broadcast del SM7B con +18 o +28 dB de ganancia limpia integrada",\n          "Sin necesidad de Cloudlifter — cualquier interfaz con 48V lo impulsa",\n          "Cardioide con corte de graves, realce de presencia, suspensión antigolpes interna y viento",\n          "El flujo de trabajo de broadcast de todos los días sin hardware extra"\n        ],\n        "cons_es": [\n          "Cuesta más que el SM7B normal — pagas por el previo integrado",\n          "Solo XLR, así que aún necesita una interfaz o mesa",\n          "Más pesado y voluminoso que los dinámicos más pequeños"\n        ]\n      }\n    ],',
  'verdictProsCons SM7dB'
);

// ---- 4. featuredSnippet FAQ (flat keys faq_q4/faq_a4/faq_q4_es/faq_a4_es) ----
one(
  '"faq_a3_es": "Los USB tienen un convertidor digital integrado — te conectas directo a tu ordenador sin necesidad de interfaz. Los XLR requieren una interfaz de audio con phantom (para condensadores). XLR ofrece mejor calidad de sonido, escalabilidad y funciones profesionales. USB es más simple y asequible para principiantes."\n    },',
  '"faq_a3_es": "Los USB tienen un convertidor digital integrado — te conectas directo a tu ordenador sin necesidad de interfaz. Los XLR requieren una interfaz de audio con phantom (para condensadores). XLR ofrece mejor calidad de sonido, escalabilidad y funciones profesionales. USB es más simple y asequible para principiantes."\n      "faq_q4": "Does the Shure SM7dB need a Cloudlifter?",\n      "faq_a4": "No. The SM7dB has +18 or +28 dB of clean gain built in and switchable, so it plugs straight into any 48V interface without a separate booster. It is XLR-only, so you still need an interface or mixer — but you can skip the Cloudlifter.",\n      "faq_q4_es": "¿Necesita el Shure SM7dB un Cloudlifter?",\n      "faq_a4_es": "No. El SM7dB lleva integrados +18 o +28 dB de ganancia limpia (seleccionables), así que se conecta directo a cualquier interfaz con alimentación fantasma de 48V sin necesidad de un booster aparte. Es solo XLR, así que aún necesitas una interfaz o mesa — pero puedes saltarte el Cloudlifter."\n    },',
  'FAQ SM7dB'
);

// ---- 5. verdict ----
one(
  '"verdict": "Dynamic mics for live and loud sources, condenser mics for studio detail, USB mics for simple setups, stage mics for the road. Start with the category that matches your workflow, and check our specialized guides for detailed reviews.",',
  '"verdict": "Dynamic mics for live and loud sources, condenser mics for studio detail, USB mics for simple setups, stage mics for the road. For broadcast voice with a built-in preamp, the Shure SM7dB is the standout. Start with the category that matches your workflow, and check our specialized guides for detailed reviews.",',
  'verdict EN'
);
one(
  '"verdict_es": "Micrófonos dinámicos para fuentes en vivo y fuertes, condensadores para detalle de estudio, USB para setups simples, de escenario para la gira. Empieza con la categoría que coincida con lo que grabas, y consulta nuestras guías especializadas para reseñas detalladas.",',
  '"verdict_es": "Micrófonos dinámicos para fuentes en vivo y fuertes, condensadores para detalle de estudio, USB para setups simples, de escenario para la gira. Para voz de broadcast con previo integrado, el Shure SM7dB destaca. Empieza con la categoría que coincida con lo que grabas, y consulta nuestras guías especializadas para reseñas detalladas.",',
  'verdict ES'
);

// ---- 6. conclusion ----
one(
  'Dynamic mics like the SM57 and SM58 are indestructible workhorses for amps, drums, and live vocals.',
  'Dynamic mics like the SM57 and SM58 are indestructible workhorses for amps, drums, and live vocals. If you want that signature broadcast voice with zero extra gear, the Shure SM7dB adds a built-in preamp to the SM7B recipe.',
  'conclusion EN'
);
one(
  'Los dinámicos como el SM57 y SM58 son trabajadores indestructibles para amplificadores, batería y voces en vivo.',
  'Los dinámicos como el SM57 y SM58 son trabajadores indestructibles para amplificadores, batería y voces en vivo. Si quieres esa voz de broadcast característica sin ningún equipo extra, el Shure SM7dB añade un previo integrado a la receta del SM7B.',
  'conclusion ES'
);

fs.writeFileSync('data/guides.json', pre + seg + post);
JSON.parse(pre + seg + post); // validate
console.log('guides.json patched and valid');