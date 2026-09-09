var fs = require('fs');
var p = 'data/guides.json';
var txt = fs.readFileSync(p, 'utf8');

var ti = txt.indexOf('"id": "best-bass-practice-amps"');
if (ti < 0) { console.log('ERROR guide not found'); process.exit(1); }

var ptStart = txt.indexOf('"productTable": {', ti);
var ptEnd = txt.indexOf('"verdictProsCons": [', ptStart);
if (ptStart < 0 || ptEnd < 0) { console.log('ERROR anchors not found'); process.exit(1); }

var slicePT = txt.substring(ptStart, ptEnd);

var oldCol = '"title_es": "Positive Grid Spark MINI"\n        }\n      ],';
var newCol = '"title_es": "Positive Grid Spark MINI"\n        },\n        {\n          "title": "Yamaha THR30II",\n          "title_es": "Yamaha THR30II"\n        },\n        {\n          "title": "Boss WAZA-AIR Bass",\n          "title_es": "Boss WAZA-AIR Bass"\n        },\n        {\n          "title": "Darkglass DG210A",\n          "title_es": "Darkglass DG210A"\n        }\n      ],';
var ci = slicePT.indexOf(oldCol);
if (ci < 0) { console.log('ERROR columns needle not found'); process.exit(1); }
slicePT = slicePT.slice(0, ci) + newCol + slicePT.slice(ci + oldCol.length);

var rows = {
  'Best For': [
    ['Desktop hi-fi practice', 'Pr\u00e1ctica de escritorio hi-fi'],
    ['Silent wireless practice', 'Pr\u00e1ctica silenciosa inal\u00e1mbrica'],
    ['Premium studio-grade tone', 'Tono premium de nivel estudio']
  ],
  'Power': [
    ['30W stereo', '30W est\u00e9reo'],
    ['Headphone amp', 'Amplificador de auriculares'],
    ['500W Class D', '500W Clase D']
  ],
  'Speaker': [
    ['2 x 3.5"', '2 x 3.5"'],
    ['None \u2014 wireless headphones', 'Ninguno \u2014 auriculares inal\u00e1mbricos'],
    ['2 x 10"', '2 x 10"']
  ],
  'Type': [
    ['Modeling desktop amp', 'Amplificador de escritorio de modelado'],
    ['Wireless modeling headphone amp', 'Amplificador de auriculares de modelado inal\u00e1mbrico'],
    ['Class D head + 2x10 cab', 'Cabezal Clase D + cabina 2x10']
  ],
  'Connectivity': [
    ['Bluetooth, USB audio, L/R line outs, headphone', 'Bluetooth, USB audio, salidas de l\u00ednea L/R, auriculares'],
    ['Bluetooth, 5 IR modes, USB, app', 'Bluetooth, 5 modos IR, USB, app'],
    ['Cab-emulated XLR out, aux, headphone', 'Salida XLR con emulaci\u00f3n de cabina, aux, auriculares']
  ],
  'Battery': [
    ['No (AC powered)', 'No (alimentaci\u00f3n de red)'],
    ['Yes, ~3.5h', 'S\u00ed, ~3.5h'],
    ['No (AC powered)', 'No (alimentaci\u00f3n de red)']
  ]
};

Object.keys(rows).forEach(function (label) {
  var li = slicePT.indexOf('"label": "' + label + '",');
  if (li < 0) { console.log('ERROR row label not found: ' + label); process.exit(1); }
  var vs = slicePT.indexOf('"values": [', li);
  var close = slicePT.indexOf('\n          ]', vs);
  if (vs < 0 || close < 0) { console.log('ERROR values close not found: ' + label); process.exit(1); }
  var parts = rows[label].map(function (v) {
    return '            {\n              "value": ' + JSON.stringify(v[0]) + ',\n              "value_es": ' + JSON.stringify(v[1]) + '\n            }';
  });
  var insert = ',' + parts.join(',\n');
  slicePT = slicePT.slice(0, close) + insert + slicePT.slice(close);
});

var d = txt.indexOf('"datePublished"', ptEnd);
if (d < 0) { console.log('ERROR datePublished not found'); process.exit(1); }
var slicePC = txt.substring(ptEnd, d);

var pcEntries = [
  {
    name: 'Orange Crush Bass 25',
    name_es: 'Orange Crush Bass 25',
    pros: [
      'Pure analog tone that sounds much bigger than its 25W',
      'Semi-parametric 3-band EQ with sweepable mid control',
      'Built-in tuner, aux input and cab-simulated headphone output',
      'The simplest, most reliable budget pick on this list'
    ],
    pros_es: [
      'Tono anal\u00f3gico puro que suena mucho m\u00e1s grande que sus 25W',
      'EQ semi-param\u00e9trico de 3 bandas con control de medios barrido',
      'Afinador integrado, entrada aux y salida de auriculares con simulaci\u00f3n de cabina',
      'La opci\u00f3n econ\u00f3mica m\u00e1s sencilla y fiable de esta lista'
    ],
    cons: ['Not battery powered, and fewer features than the modeling amps on this list'],
    cons_es: ['No funciona a pilas y tiene menos funciones que los amplificadores de modelado de esta lista']
  },
  {
    name: 'Yamaha THR30II',
    name_es: 'Yamaha THR30II',
    pros: [
      '30W of true stereo with enhanced low end for bass',
      'Physical Mode switch swaps classic, boutique and modern amp voices without an app',
      'Same 3 bass amp models plus 15 guitar amps and 3 acoustic mic models',
      'Dedicated stereo L/R line outs, Bluetooth, USB audio interface and headphone out'
    ],
    pros_es: [
      '30W de verdadero est\u00e9reo con graves mejorados para el bajo',
      'Interruptor f\u00edsico Mode que cambia las voces classic, boutique y modern sin necesidad de app',
      'Los mismos 3 modelos de amplificador de bajo m\u00e1s 15 de guitarra y 3 de micr\u00f3fono ac\u00fastico',
      'Salidas de l\u00ednea est\u00e9reo L/R dedicadas, Bluetooth, interfaz de audio USB y salida de auriculares'
    ],
    cons: ['Not battery powered \u2014 desktop practice only'],
    cons_es: ['No funciona a pilas \u2014 solo para pr\u00e1ctica de escritorio']
  },
  {
    name: 'Darkglass DG210A',
    name_es: 'Darkglass DG210A',
    pros: [
      'Studio-grade Microtubes tone through a 2x10 cab',
      'Cab-emulated balanced XLR out for silent recording and practice',
      'The same premium tone at home as at a gig or session'
    ],
    pros_es: [
      'Tono Microtubes de nivel estudio a trav\u00e9s de una cabina 2x10',
      'Salida XLR balanceada con emulaci\u00f3n de cabina para grabar y practicar en silencio',
      'El mismo tono premium en casa que en un bolo o una sesi\u00f3n'
    ],
    cons: ['Big, heavy and expensive for quiet home practice'],
    cons_es: ['Grande, pesado y caro para practicar en silencio en casa']
  }
];

function pcObj(o) {
  var s = '      {\n';
  s += '        "name": ' + JSON.stringify(o.name) + ',\n';
  s += '        "name_es": ' + JSON.stringify(o.name_es) + ',\n';
  s += '        "pros": [\n';
  s += o.pros.map(function (x) { return '          ' + JSON.stringify(x); }).join(',\n') + '\n';
  s += '        ],\n';
  s += '        "pros_es": [\n';
  s += o.pros_es.map(function (x) { return '          ' + JSON.stringify(x); }).join(',\n') + '\n';
  s += '        ],\n';
  s += '        "cons": [\n';
  s += o.cons.map(function (x) { return '          ' + JSON.stringify(x); }).join(',\n') + '\n';
  s += '        ],\n';
  s += '        "cons_es": [\n';
  s += o.cons_es.map(function (x) { return '          ' + JSON.stringify(x); }).join(',\n') + '\n';
  s += '        ]\n';
  s += '      }';
  return s;
}

var closePC = slicePC.lastIndexOf('\n    ],');
if (closePC < 0) { console.log('ERROR verdictProsCons close not found'); process.exit(1); }
var partsPC = pcEntries.map(pcObj);
slicePC = slicePC.slice(0, closePC) + ',' + partsPC.join(',\n') + slicePC.slice(closePC);

var newTxt = txt.substring(0, ptStart) + slicePT + slicePC + txt.substring(d);

JSON.parse(newTxt);
fs.writeFileSync(p, newTxt);
console.log('PATCHED OK');