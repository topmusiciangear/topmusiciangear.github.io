const fs = require('fs');
let t = fs.readFileSync('data/guides.json', 'utf8');

const marker = '"products": [\n          132\n        ]\n      }\n    ],';
if (!t.includes(marker)) {
  console.log('MARKER NOT FOUND');
  process.exit(1);
}

const newSection = `"products": [
          132
        ]
      },
      {
        "heading": "What Are the Best Modern Bass Amps for Gigs in 2026?",
        "heading_es": "¿Cuáles son los mejores amplificadores de bajo modernos para tocar en vivo en 2026?",
        "content": "<strong>Today's gigging bassist has options that go far beyond a traditional combo.</strong> The Positive Grid Spark LIVE is a 150W four-channel smart amp that works as a combo, a mini PA and a studio speaker in one wireless box — ideal for rehearsals, silent rooms and song covering. The Orange Crush Bass 50 keeps it all-analog: a Class A/B transistor combo with a sweepable semi-parametric mid control and a drive channel with Blend, so the bass cuts through the mix at home or on a small stage. And for the tone purist, the Darkglass DG210A brings the 500W Class-D Microtubes 500 head into a compact 2x10 with Eminence neodymium drivers and a cab-emulated XLR out, so pros get that huge punchy low end even at quiet bedroom volume.",
        "content_es": "<strong>El bajista de directo de hoy tiene opciones que van mucho más allá del combo tradicional.</strong> El Positive Grid Spark LIVE es un amplificador inteligente de 150W y cuatro canales que funciona como combo, mini PA y altavoz de estudio en una sola caja inalámbrica — ideal para ensayos, habitaciones insonorizadas y sacar canciones a la primera. El Orange Crush Bass 50 se mantiene 100% analógico: un combo de transistores Clase A/B con control paramétrico de medios ajustable y canal de drive con Blend, para que el bajo se abra paso en la mezcla en casa o en escenarios pequeños. Y para el purista del tono, el Darkglass DG210A mete el cabezal Microtubes 500 de 500W Clase D en un 2x10 compacto con drivers de neodimio Eminence y salida XLR con emulación de cabina, de modo que los pros consiguen ese grave enorme y contundente incluso a volumen bajo en el dormitorio.",
        "products": [
          483,
          484,
          485
        ]
      }
    ],`;

t = t.replace(marker, newSection);
fs.writeFileSync('data/guides.json', t);
console.log('SECTION ADDED');