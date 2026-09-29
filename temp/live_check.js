const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36';
(async () => {
  for (const lang of ['', '_es']) {
    const u = 'https://topmusiciangear.com/guides/best-electric-guitars-2026' + lang + '.html?v=' + Date.now();
    const r = await fetch(u, { headers: { 'User-Agent': UA, 'Cache-Control': 'no-cache' } });
    const t = await r.text();
    const c = s => (t.match(s) || []).length;
    console.log('--- ' + u.replace(/\?.*/, ''));
    console.log('  dup PRS 320 ASIN B0G1YMZTPL : ' + c(/B0G1YMZTPL/g) + '  (esperado 0)');
    console.log('  dup PRS 320 MS art-GIT0064831: ' + c(/art-GIT0064831/g) + '  (esperado 0)');
    console.log('  PRS 312 ASIN B0FBXFN1SW      : ' + c(/B0FBXFN1SW/g) + '  (esperado >0)');
    console.log('  PRS MS 312 awin art          : ' + c(/PRS-SE-Custom-24[^&"]{0,60}art-GIT00/g) + '  (esperado >0)');
    console.log('  MS Squier Affinity GIT0056884: ' + c(/GIT0056884/g) + '  (esperado >0)');
    console.log('  MS Ibanez GIT0052359         : ' + c(/GIT0052359/g) + '  (esperado >0)');
    console.log('  ESP Amazon limpio B00ITMPVBE : ' + c(/B00ITMPVBE/g) + '  (esperado >0)');
    console.log('  ESP junk lv=shuf             : ' + c(/lv=shuf/g) + '  (esperado 0)');
    console.log('  MS Squier Sonic (id 309 mal) : ' + c(/Sonic-Stratocaster-MN-2-Colour/g) + '  (esperado 0)');
  }
})();
