const pages = [
  ['EN', 'https://topmusiciangear.com/guides/adam-vs-genelec.html', 'All rights reserved.', '/affiliate-disclosure.html'],
  ['ES', 'https://topmusiciangear.com/guides/adam-vs-genelec_es.html', 'Todos los derechos reservados.', '/es/affiliate-disclosure.html'],
  ['EN2', 'https://topmusiciangear.com/guides/best-acoustic-guitars-for-beginners.html', 'Built by a musician, for musicians.', 'More info'],
  ['ES2', 'https://topmusiciangear.com/guides/best-acoustic-guitars-for-beginners_es.html', 'Hecho por un m\u00fasico', 'M\u00e1s info'],
  ['EN3', 'https://topmusiciangear.com/guides/wireless-intercom-systems.html', 'Hollyland', 'is a participant in affiliate programs']
];
(async () => {
  let allOk = true;
  for (const [tag, url, needle, needle2] of pages) {
    try {
      const r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      const c = await r.text();
      const hits = (c.match(/id="disclosureLink"/g) || []).length;
      const ok = r.status === 200 && hits === 1 && c.includes(needle) && c.includes(needle2) && c.includes('</footer>');
      if (!ok) allOk = false;
      console.log(`${ok ? 'OK  ' : 'FAIL'} ${tag} ${r.status} disclosureLink=${hits} | ${needle.slice(0, 28)}`);
    } catch (e) {
      allOk = false;
      console.log(`FAIL ${tag} ${e.message}`);
    }
  }
  const d = await fetch('https://topmusiciangear.com/affiliate-disclosure.html', { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const de = await fetch('https://topmusiciangear.com/es/affiliate-disclosure.html', { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const okd = d.status === 200 && de.status === 200;
  if (!okd) allOk = false;
  console.log(`${okd ? 'OK  ' : 'FAIL'} disclosure targets: EN=${d.status} ES=${de.status}`);
  console.log(allOk ? '=== LIVE OK ===' : '=== LIVE PROBLEMS ===');
})();
