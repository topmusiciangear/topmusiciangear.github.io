const fs = require('fs');
const p = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
let s = fs.readFileSync(p, 'utf8');

// Best For: add after "Everyday cleanup on a budget"
s = s.replace(
  `              "value": "Everyday cleanup on a budget",
              "value_es": "Limpieza diaria con presupuesto"
            }
          ]`,
  `              "value": "Everyday cleanup on a budget",
              "value_es": "Limpieza diaria con presupuesto"
            },
            {
              "value": "Real-time dialogue isolation",
              "value_es": "Aislamiento de diálogos en tiempo real"
            }
          ]`
);

// Type: add after "4-tool restoration suite"
s = s.replace(
  `              "value": "4-tool restoration suite",
              "value_es": "Suite de 4 herramientas"
            }
          ]`,
  `              "value": "4-tool restoration suite",
              "value_es": "Suite de 4 herramientas"
            },
            {
              "value": "AI voice isolation processor",
              "value_es": "Procesador de aislamiento de voz por IA"
            }
          ]`
);

// Format: add after "VST/VST3/AU/AAX" (the one before Platforms)
s = s.replace(
  `              "value": "VST/VST3/AU/AAX",
              "value_es": "VST/VST3/AU/AAX"
            }
          ]
        },
        {
          "label": "Platforms",`,
  `              "value": "VST/VST3/AU/AAX",
              "value_es": "VST/VST3/AU/AAX"
            },
            {
              "value": "VST3/AU/AAX",
              "value_es": "VST3/AU/AAX"
            }
          ]
        },
        {
          "label": "Platforms",`
);

// Platforms: add after 4th macOS & Windows before Standout Feature
s = s.replace(
  `            {
              "value": "macOS & Windows",
              "value_es": "macOS y Windows"
            }
          ]
        },
        {
          "label": "Standout Feature",`,
  `            {
              "value": "macOS & Windows",
              "value_es": "macOS y Windows"
            },
            {
              "value": "macOS & Windows",
              "value_es": "macOS y Windows"
            }
          ]
        },
        {
          "label": "Standout Feature",`
);

// Standout Feature: add after "DeNoise, DeHum, DeClick and DeReverb in one"
s = s.replace(
  `              "value": "DeNoise, DeHum, DeClick and DeReverb in one",
              "value_es": "DeNoise, DeHum, DeClick y DeReverb en uno"
            }
          ]`,
  `              "value": "DeNoise, DeHum, DeClick and DeReverb in one",
              "value_es": "DeNoise, DeHum, DeClick y DeReverb en uno"
            },
            {
              "value": "Real-time neural noise removal",
              "value_es": "Eliminación de ruido por red neuronal en tiempo real"
            }
          ]`
);

fs.writeFileSync(p, s);
console.log('done');
