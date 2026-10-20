const fs = require('fs');
let s = fs.readFileSync('temp/score_overrides.js', 'utf8');
const lines = s.split('\n');
const target = '  "stream-controllers": {';
let idx = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('"stream-controllers"')) {
    idx = i;
    break;
  }
}
console.log('Found at line:', idx + 1);
if (idx !== -1) {
  const insert = '  "starter-studio": {\n    "Rode NT1 Signature Series": 9.5,\n    "SSL 2+ MKII": 9.6,\n    "Focusrite Scarlett 2i2 4th Gen": 9.7,\n    "PreSonus Eris Studio 5": 8.9,\n    "KRK Rokit 7 G5": 9.3,\n    "Yamaha HS8": 9.8,\n    "Universal Audio Apollo Twin X Gen 2": 9.8,\n    "Neumann TLM 102": 9.8,\n    "Paneles de Tratamiento Acustico G4M Acoustics Squarewave (4-Unidades)": 9.4,\n    "G4M Acoustics Squarewave Acoustic Treatment Panels (4-Pack)": 9.4,\n    "Soporte de Microfono K&M 210/2": 9.6,\n    "K&M 210/2 Mic Stand": 9.6,\n    "Filtro Antipop Aston Microphones Shield GN": 9.1,\n    "Aston Microphones Shield GN Pop Filter": 9.1,\n    "Cable Mogami Gold Studio XLR": 9.3,\n    "Mogami Gold Studio XLR Cable": 9.3,\n    "Rode NT1 5th Generation": 9.6,\n    "Audio-Technica ATH-M50x": 9.5,\n    "Audio-Technica ATH-M20x": 9.0,\n    "Sony MDR-7506": 9.4\n  },\n';
  lines.splice(idx, 0, insert);
  fs.writeFileSync('temp/score_overrides.js', lines.join('\n'), 'utf8');
  console.log('Added');
}