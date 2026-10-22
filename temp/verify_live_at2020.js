const url = 'https://topmusiciangear.com/guides/at2020-vs-p120_es.html?cb=' + Date.now();
const urlEn = 'https://topmusiciangear.com/guides/at2020-vs-p120.html?cb=' + Date.now();
const urlBudget = 'https://topmusiciangear.com/guides/budget-mics_es.html?cb=' + Date.now();

(async () => {
  for (const [u, checks] of [
    [url, [
      ['Condensador barato', 'ES title'],
      ['Micrófono de condensador de diafragma mediano AKG P120', 'P120 ES card'],
      ['−32,5 dBV (24 mV/Pa)', 'sensitivity ES'],
      ['48 V, 3 mA', 'phantom ES'],
      ['Atenuador (pad)', 'pad label ES'],
      ['algo de material absorbente detrás del cantante', 'absorber ES'],
    ]],
    [urlEn, [
      ['Medium-Diaphragm Condenser Microphone', 'P120 EN name'],
      ['−32.5 dBV (24 mV/Pa)', 'sensitivity EN'],
      ['48 V, 3 mA', 'phantom EN'],
      ['some acoustic treatment behind the singer', 'absorber EN'],
    ]],
    [urlBudget, [
      ['Diafragma Mediano', 'budget-mics ES rename'],
    ]],
  ]) {
    const r = await fetch(u, { headers: { 'cache-control': 'no-cache' } });
    const h = await r.text();
    console.log('---', r.status, u.split('?')[0]);
    for (const [needle, label] of checks) console.log((h.includes(needle) ? 'OK   ' : 'FAIL ') + label);
    if (u === url) {
      console.log((h.includes('Precio (calle)') ? 'FAIL ' : 'OK   ') + 'price row removed');
      console.log((h.includes('cuesta menos') ? 'FAIL ' : 'OK   ') + 'no blanket price claim');
    }
  }
})();
