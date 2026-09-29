const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36';
const URLS = [
  'https://www.andertons.co.uk/search?sSearch=Fender+American+Professional+II+Stratocaster',
  'https://www.andertons.co.uk/fender-american-professional-ii-stratocaster-mystic-surf-green-maple-fingerboard/?search_query=Fender+American+Professional+II+Stratocaster',
  'https://www.andertons.co.uk/search?search_query=Fender+Stratocaster'
];
(async () => {
  for (const u of URLS) {
    try {
      const r = await fetch(u, { headers: { 'User-Agent': UA, 'Accept-Language': 'en-GB,en;q=0.9' } });
      console.log(r.status + '  ' + u);
    } catch (e) { console.log('ERR ' + u + ' ' + e.message); }
  }
})();
