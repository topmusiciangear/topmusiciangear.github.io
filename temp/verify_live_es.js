const base = 'https://topmusiciangear.com/';

(async () => {
  const es = await (await fetch(base + 'guides/monitor-setup_es.html', { cache: 'no-store' })).text();
  console.log('ES titulo producto:', es.includes('Auralex MoPAD-XL (par)'));
  console.log('ES precio 39,99:', es.includes('39,99'));
  console.log('ES menciona pad ancho:', es.includes('más anchas que las MoPAD estándar'));
  console.log('ES restos "Pack 4":', es.includes('Pack 4'));

  // fila de musicstore presente y zzounds no listado para este producto
  const i = es.indexOf('REC0011572');
  console.log('ES enlace MusicStore presente:', i > -1);

  const en = await (await fetch(base + 'guides/monitor-setup.html', { cache: 'no-store' })).text();
  const j = en.indexOf('B00266HBSU');
  console.log('EN enlace Amazon ASIN nuevo:', j > -1);
  console.log('EN menciona 100 lb:', en.includes('100 lb'));
  console.log('EN restos "4-pack":', /4-Pack|4 pack/i.test(en));
})();
