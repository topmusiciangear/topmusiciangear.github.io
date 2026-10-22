const base = 'https://topmusiciangear.com';
const cb = '?cb=' + Date.now();

(async () => {
  const css = await (await fetch(base + '/css/style.min.css' + cb)).text();
  const box = css.match(/\.guide-card-img\{[^}]*\}/);
  const img = css.match(/\.guide-card-img img\{[^}]*\}/);
  console.log('guide-card:', box && box[0]);
  console.log('guide-card img:', img && img[0]);

  const guide = await (await fetch(base + '/guides/at2020-vs-p120.html' + cb)).text();
  const i = guide.indexOf('AKGP120');
  console.log('P120 zzounds link present:', i > -1);
  if (i > -1) console.log(guide.slice(Math.max(0, i - 180), i + 40).replace(/\s+/g, ' '));
  console.log('P120 zzounds row gray:', /data-store="zzounds"[^>]*background:#262626/.test(guide));

  const hs = await (await fetch(base + '/js/shop-buttons.js' + cb)).text();
  console.log('live shop-buttons has AKGP120:', hs.includes('AKGP120'));

  const home = await (await fetch(base + '/' + cb)).text();
  const m = home.match(/style\.min\.css\?v=[a-f0-9]+/);
  console.log('home css version:', m && m[0]);
})();
