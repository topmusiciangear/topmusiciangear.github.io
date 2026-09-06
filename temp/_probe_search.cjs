const u = 'https://www.andertons.co.uk/search.php?search_query=' + encodeURIComponent(process.argv[2] || 'KRK S10.4');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36';
fetch(u, { headers: { 'User-Agent': UA, 'Accept-Language': 'en-GB,en;q=0.9' } })
  .then(async r => {
    const html = await r.text();
    console.log('STATUS', r.status, r.url, 'len', html.length);
    const links = [...html.matchAll(/href="(\/\/www\.andertons\.co\.uk\/[^"#]*[^/])"|href="(https?:\/\/www\.andertons\.co\.uk\/[^"#]*[^/])"/g)]
      .map(m => m[1] || m[2]);
    const unique = [...new Set(links)].filter(l => !/(search|compare|cart|account|help|brands|sale|new|info)/.test(l));
    console.log('UNIQUE product-ish links sample:');
    unique.slice(0, 30).forEach(l => console.log('  ', l));
    const tt = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
    console.log('TITLE:', tt);
    fs && null;
  }).catch(e => console.log('ERR', e.message));