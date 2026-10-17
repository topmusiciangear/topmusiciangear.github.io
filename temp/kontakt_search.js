const urls = [
  'https://www.andertons.co.uk/search/?q=Kontakt+8',
  'https://www.andertons.co.uk/search?search_query=Kontakt+8'
];
urls.forEach(u => {
  fetch(u, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } })
    .then(async r => {
      const t = await r.text();
      const links = [...t.matchAll(/href="(\/[^"]*kontakt[^"]*)"/gi)].map(m => m[1]);
      const uniq = [...new Set(links)].slice(0, 20);
      console.log(r.status + ' ' + u);
      console.log('  ' + (uniq.length ? uniq.join('\n  ') : 'sin links kontakt'));
    })
    .catch(e => console.log('ERROR ' + u + ': ' + e.message));
});