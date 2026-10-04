const fs = require('fs');
let txt = fs.readFileSync('data/guides.json', 'utf8');

// Find and replace the entire productTable object for guitar-bass-amps
const startIdx = txt.indexOf('"id": "guitar-bass-amps"');
const sectionStart = txt.indexOf('"productTable":', startIdx);
if (sectionStart === -1) {
  console.log('productTable not found');
  process.exit(1);
}

// Find the matching closing brace for productTable
let braceCount = 0;
let endIdx = -1;
for (let i = sectionStart; i < txt.length; i++) {
  if (txt[i] === '{') braceCount++;
  if (txt[i] === '}') {
    braceCount--;
    if (braceCount === 0) {
      endIdx = i + 1;
      break;
    }
  }
}

if (endIdx === -1) {
  console.log('Could not find end of productTable');
  process.exit(1);
}

console.log('Found productTable from', sectionStart, 'to', endIdx);

// New productTable JSON
const newProductTable = `"productTable": {
    "title": "Guitar & Bass Amps Compared",
    "title_es": "Comparativa de amplis de guitarra y bajo",
    "columns": [
      {
        "title": "Fender Blues Junior IV",
        "title_es": "Fender Blues Junior IV"
      },
      {
        "title": "Boss Katana 50 Gen 3",
        "title_es": "Boss Katana 50 Gen 3"
      },
      {
        "title": "Vox AC30",
        "title_es": "Vox AC30"
      },
      {
        "title": "Marshall DSL40CR",
        "title_es": "Marshall DSL40CR"
      },
      {
        "title": "Ampeg Rocket Bass RB-210",
        "title_es": "Ampeg Rocket Bass RB-210"
      },
      {
        "title": "Fender Rumble 500 V3",
        "title_es": "Fender Rumble 500 V3"
      },
      {
        "title": "Yamaha THR30II Wireless Desktop Amp",
        "title_es": "Yamaha THR30II Wireless Desktop Amp"
      },
      {
        "title": "Positive Grid Spark 2",
        "title_es": "Positive Grid Spark 2"
      }
    ],
    "rows": [
      {
        "label": "Best For",
        "label_es": "Ideal para",
        "values": [
          {
            "value": "Small-venue blues and rock gigs",
            "value_es": "bolos pequeños de blues y rock"
          },
          {
            "value": "Versatile modeling amp for home",
            "value_es": "Ampli modelador versátil para casa"
          },
          {
            "value": "Live pop and rock gigging",
            "value_es": "Directos de pop y rock"
          },
          {
            "value": "Live rock and hard-rock gigs",
            "value_es": "Directos de rock y hard rock"
          },
          {
            "value": "Live bass gigs with classic tone",
            "value_es": "bolos de bajo con tono clásico"
          },
          {
            "value": "Gigging bassists needing portability",
            "value_es": "Bajistas de directo que buscan portabilidad"
          },
          {
            "value": "Desktop modeling for home, studio & wireless playing",
            "value_es": "Modelado de escritorio para casa, estudio y tocar sin cables"
          },
          {
            "value": "Smart practice amp with app, AI jamming & optional battery",
            "value_es": "Ampli de práctica inteligente con app, jamming IA y batería opcional"
          }
        ]
      },
      {
        "label": "Estimated Price",
        "label_es": "Precio estimado",
        "values": [
          {
            "value": "~$789.99",
            "value_es": "~$789.99"
          },
          {
            "value": "$349.99–$350",
            "value_es": "$349.99–$350"
          },
          {
            "value": "~$1,799.99",
            "value_es": "~$1,799.99"
          },
          {
            "value": "~$749.99",
            "value_es": "~$749.99"
          },
          {
            "value": "~$749.99",
            "value_es": "~$749.99"
          },
          {
            "value": "~$749.99",
            "value_es": "~$749.99"
          },
          {
            "value": "~$439.99",
            "value_es": "~$439.99"
          },
          {
            "value": "$279–$349",
            "value_es": "$279–$349"
          }
        ]
      },
      {
        "label": "Type",
        "label_es": "Tipo",
        "values": [
          {
            "value": "Tube (2x EL84)",
            "value_es": "Válvulas (2x EL84)"
          },
          {
            "value": "Solid-state modeling",
            "value_es": "Modelador de estado sólido"
          },
          {
            "value": "Tube (4x EL84)",
            "value_es": "Válvulas (4x EL84)"
          },
          {
            "value": "Tube (2x EL34)",
            "value_es": "Válvulas (2x EL34)"
          },
          {
            "value": "Solid-state, 350W (500W w/ ext. cab)",
            "value_es": "Estado sólido, 350W (500W c/ cab. extensión)"
          },
          {
            "value": "Solid-state, 350W (500W w/ ext. cab)",
            "value_es": "Estado sólido, 350W (500W c/ cab. extensión)"
          },
          {
            "value": "Desktop modeling, stereo, wireless ready",
            "value_es": "Modelado de escritorio, estéreo, listo inalámbrico"
          },
          {
            "value": "Smart modeling combo, stereo, battery optional",
            "value_es": "Combo inteligente de modelado, estéreo, batería opcional"
          }
        ]
      },
      {
        "label": "Power",
        "label_es": "Potencia",
        "values": [
          {
            "value": "15W",
            "value_es": "15W"
          },
          {
            "value": "50W",
            "value_es": "50W"
          },
          {
            "value": "30W",
            "value_es": "30W"
          },
          {
            "value": "40W",
            "value_es": "40W"
          },
          {
            "value": "350W (500W w/ ext. cab)",
            "value_es": "350W (500W c/ cab. extensión)"
          },
          {
            "value": "350W (500W w/ ext. cab)",
            "value_es": "350W (500W c/ cab. extensión)"
          },
          {
            "value": "30W stereo (15W+15W)",
            "value_es": "30W estéreo (15W+15W)"
          },
          {
            "value": "50W stereo",
            "value_es": "50W estéreo"
          }
        ]
      },
      {
        "label": "Channels",
        "label_es": "Canales",
        "values": [
          {
            "value": "1 + FAT switch",
            "value_es": "1 + switch FAT"
          },
          {
            "value": "6 amp types",
            "value_es": "5 tipos de ampli"
          },
          {
            "value": "2 (Normal + Top Boost)",
            "value_es": "2 (Normal + Top Boost)"
          },
          {
            "value": "2 (4 voices)",
            "value_es": "2 (4 voces)"
          },
          {
            "value": "1",
            "value_es": "1"
          },
          {
            "value": "1 (2 modes)",
            "value_es": "1 (2 modos)"
          },
          {
            "value": "3 bass models (Classic/Boutique/Modern) + 15 guitar + 3 acoustic",
            "value_es": "3 modelos bajo (Classic/Boutique/Modern) + 15 guitarra + 3 acústica"
          },
          {
            "value": "App-driven presets via ToneCloud",
            "value_es": "Presets por app vía ToneCloud"
          }
        ]
      },
      {
        "label": "Speaker",
        "label_es": "Altavoz",
        "values": [
          {
            "value": "1x12\\" Jensen C-12N",
            "value_es": "1x12\\" Jensen C-12N"
          },
          {
            "value": "1x12\\"",
            "value_es": "1x12\\""
          },
          {
            "value": "2x12\\" Celestion G12M Greenback",
            "value_es": "2x12\\" Celestion G12M Greenback"
          },
          {
            "value": "1x12\\" Celestion V-Type",
            "value_es": "1x12\\" Celestion V-Type"
          },
          {
            "value": "2x10\\" + 1\\" tweeter",
            "value_es": "2x10\\" + tweeter de 1\\""
          },
          {
            "value": "2x10\\" + 1\\" tweeter",
            "value_es": "2x10\\" + tweeter de 1\\""
          },
          {
            "value": "2x3.5\\" full-range stereo",
            "value_es": "2x3.5\\" rango completo estéreo"
          },
          {
            "value": "2x4\\" stereo",
            "value_es": "2x4\\" estéreo"
          }
        ]
      },
      {
        "label": "Outputs",
        "label_es": "Salidas",
        "values": [
          {
            "value": "External speaker out (8Ω), no FX loop, no headphone out, no line/DI",
            "value_es": "Salida de altavoz externo (8Ω), sin FX loop, sin salida de auriculares, sin línea/DI"
          },
          {
            "value": "Headphones, REC out, 0.5W mode",
            "value_es": "Auriculares, salida REC, modo 0,5W"
          },
          {
            "value": "Speaker out, no FX loop",
            "value_es": "Salida de altavoz, sin FX loop"
          },
          {
            "value": "FX loop, 2x speaker out",
            "value_es": "FX loop, 2 salidas de altavoz"
          },
          {
            "value": "XLR DI out, FX loop, aux in, headphone out",
            "value_es": "Salida DI XLR, loop de FX, entrada aux, auriculares"
          },
          {
            "value": "XLR D.I., headphones",
            "value_es": "D. I. XLR, auriculares"
          },
          {
            "value": "USB interface, stereo 1/4\\" L/R line out, headphone, aux, wireless receiver",
            "value_es": "USB interfaz, salida de línea L/R 1/4\\" estéreo, auriculares, aux, receptor inalámbrico"
          },
          {
            "value": "USB-C recording, headphone, aux, optional battery",
            "value_es": "Grabación USB-C, auriculares, aux, batería opcional"
          }
        ]
      },
      {
        "label": "Reverb / FX",
        "label_es": "Reverb / FX",
        "values": [
          {
            "value": "Spring reverb",
            "value_es": "Reverb de muelle"
          },
          {
            "value": "Built-in digital FX",
            "value_es": "FX digitales integrados"
          },
          {
            "value": "Optional (on some models)",
            "value_es": "Opcional (en algunos modelos)"
          },
          {
            "value": "Digital reverb",
            "value_es": "Reverb digital"
          },
          {
            "value": "Super Grit Technology overdrive",
            "value_es": "Overdrive Super Grit Technology"
          },
          {
            "value": "Overdrive",
            "value_es": "Overdrive"
          },
          {
            "value": "Built-in FX + THR Remote app",
            "value_es": "FX integrados + app THR Remote"
          },
          {
            "value": "Onboard FX + app + AI Smart Jam",
            "value_es": "FX a bordo + app + AI Smart Jam"
          }
        ]
      },
      {
        "label": "Weight / Power Source",
        "label_es": "Peso / Alimentación",
        "values": [
          {
            "value": "31 lb (14 kg), mains powered",
            "value_es": "14 kg, red eléctrica"
          },
          {
            "value": "25.5 lb (11.6 kg), mains powered",
            "value_es": "11,6 kg, red eléctrica"
          },
          {
            "value": "71 lb (32.2 kg), mains powered",
            "value_es": "32,2 kg, red eléctrica"
          },
          {
            "value": "50.4 lb (22.9 kg), mains powered",
            "value_es": "22,9 kg, red eléctrica"
          },
          {
            "value": "48 lb (21.8 kg), mains powered",
            "value_es": "21,8 kg, red eléctrica"
          },
          {
            "value": "36.5 lb (16.56 kg), mains powered",
            "value_es": "16,56 kg, red eléctrica"
          },
          {
            "value": "Desktop format, optional battery / mains",
            "value_es": "Formato escritorio, batería opcional / red"
          },
          {
            "value": "Desktop format, optional battery / mains",
            "value_es": "Formato escritorio, batería opcional / red"
          }
        ]
      }
    ]
  }`;

txt = txt.substring(0, sectionStart) + newProductTable + txt.substring(endIdx);

fs.writeFileSync('data/guides.json', txt);
console.log('productTable replaced successfully');