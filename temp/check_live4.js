(async () => {
  const u = 'https://topmusiciangear.com/guides/best-home-studio-speakers_es.html?cb=' + Date.now();
  const h = await (await fetch(u, { headers: { 'user-agent': 'Mozilla/5.0' } })).text();
  for (const key of ['"1052"', '1052:', '1052":']) {
    const i = h.indexOf(key);
    if (i > 0) { console.log('KEY', key, '->', h.slice(i - 60, i + 220).replace(/\n/g, ' ')); break; }
  }
  console.log('u00a3:', h.includes('u00a3'), '| literal £142:', h.includes('£142'));
  const m = h.match(/\\u00a3142[^"]*|£142[^"]*/);
  console.log('match:', m && m[0]);
})();
