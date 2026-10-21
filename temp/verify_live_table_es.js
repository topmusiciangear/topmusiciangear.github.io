(async () => {
  const s = await (await fetch('https://topmusiciangear.com/guides/monitor-setup_es.html', { cache: 'no-store' })).text();
  const t = s.indexOf('<table class="guide-comp-table"');
  const head = s.slice(t, s.indexOf('</thead>', t));
  const re = /<th>([\s\S]*?)<\/th>/g;
  let m;
  console.log('CABECERAS ES:');
  while ((m = re.exec(head))) console.log('  ' + m[1].replace(/<[^>]+>/g, '').trim());
  console.log('quedan (Unidad)/(par) en cabeceras:', /\(Unidad\)|\(par\)/.test(head));
})();
