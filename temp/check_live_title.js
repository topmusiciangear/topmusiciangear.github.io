(async () => {
  for (const u of [
    'https://topmusiciangear.com/guides/best-studio-monitors-under-150.html',
    'https://topmusiciangear.com/guides/best-studio-monitors-under-150_es.html'
  ]) {
    const h = await (await fetch(u + '?cb=' + Date.now(), { headers: { 'user-agent': 'Mozilla/5.0' } })).text();
    const t = (h.match(/<title>([\s\S]*?)<\/title>/) || [])[1];
    const h1 = (h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1].replace(/<[^>]+>/g, '').trim();
    const d = (h.match(/name="description" content="([^"]*)"/) || [])[1];
    console.log(u.split('/').pop());
    console.log('  title:', t);
    console.log('  h1   :', h1);
    console.log('  desc :', d);
  }
  const es = await (await fetch('https://topmusiciangear.com/guides/best-studio-monitors-under-150_es.html?cb=' + Date.now(), { headers: { 'user-agent': 'Mozilla/5.0' } })).text();
  const intro = es.slice(es.indexOf('guide-intro'), es.indexOf('guide-intro') + 900).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  console.log('\nES intro:', intro.slice(0, 260));
})();
