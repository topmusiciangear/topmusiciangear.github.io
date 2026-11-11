const fs = require('fs');
const p = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
let s = fs.readFileSync(p, 'utf8');
const target = '        "name_es": "Zynaptiq Unveil"\n      },\n    ],';
const insert = `        "name_es": "Zynaptiq Unveil"
      },
      {
        "pros": [
          "Real-time noise isolation with a single knob",
          "Multi-band processing for surgical cleaning",
          "Ambient gate reduces residual noise",
          "Ambience extraction mode"
        ],
        "pros_es": [
          "Aislamiento en tiempo real con una sola perilla",
          "Procesamiento multibanda para limpieza quirúrgica",
          "Compuerta de ambiente reduce ruido residual",
          "Modo de extracción de ambiente"
        ],
        "cons": [
          "Heavy CPU usage",
          "Artifacts with extreme settings",
          "Shares basic engine with standard version",
          "Does not repair digital artifacts"
        ],
        "cons_es": [
          "Consumo masivo de CPU",
          "Artefactos con configuraciones extremas",
          "Comparte motor básico con la versión estándar",
          "No repara artefactos digitales"
        ],
        "name": "Waves Clarity Vx Pro",
        "name_es": "Waves Clarity Vx Pro"
      }
    ],`;
if (s.includes(target)) {
  s = s.replace(target, insert);
  fs.writeFileSync(p, s);
  console.log('done');
} else {
  console.log('target not found');
}
