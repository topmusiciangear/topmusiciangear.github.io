const fs = require('fs');
const checks = {
  'guides/at2020-vs-p120.html': [
    ['Audio-Technica AT2020 vs AKG P120: Condensador barato', 'ES title leak? (should not be here)'],
    ['AKG P120 Medium-Diaphragm Condenser Microphone', 'P120 EN card name'],
    ['Medium-Diaphragm Condenser Microphone', 'P120 EN intro/card'],
    ['−32.5 dBV (24 mV/Pa)', 'sensitivity order EN'],
    ['48 V, 3 mA', 'phantom both 48 V EN'],
    ['some acoustic treatment behind the singer', 'absorber EN'],
    ['Costs less than the AT2020', 'old price claim EN'],
  ],
  'guides/at2020-vs-p120_es.html': [
    ['Audio-Technica AT2020 vs AKG P120: Condensador barato', 'ES title'],
    ['Micrófono de condensador de diafragma mediano AKG P120', 'P120 ES card title'],
    ['Condensador de diafragma mediano asequible', 'P120 ES card desc'],
    ['−32,5 dBV (24 mV/Pa)', 'sensitivity order ES'],
    ['48 V, 3 mA', 'phantom both 48 V ES'],
    ['Atenuador (pad)', 'pad label ES'],
    ['algo de material absorbente detrás del cantante', 'absorber ES'],
    ['Precio (calle)', 'price row ES'],
    ['cuesta menos', 'old price claim ES'],
    ['P120 hace más por menos dinero', 'old verdict price claim ES'],
  ],
};

for (const [file, list] of Object.entries(checks)) {
  const h = fs.readFileSync(file, 'utf8');
  console.log('---', file);
  for (const [needle, label] of list) {
    const hit = h.includes(needle);
    const expectAbsent = /price row|old price claim|leak|menos dinero/.test(label);
    console.log((expectAbsent ? (hit ? 'FAIL ' : 'OK   ') : (hit ? 'OK   ' : 'FAIL ')) + label);
  }
}
