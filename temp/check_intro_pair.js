(async () => {
  const es = await (await fetch('https://topmusiciangear.com/guides/best-studio-monitors-under-150_es.html?cb=' + Date.now(), { headers: { 'user-agent': 'Mozilla/5.0' } })).text();
  const i = es.indexOf('Por debajo de $150');
  console.log(i > -1 ? es.slice(i, i + 220).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() : 'no encontrado');
})();
