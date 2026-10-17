const url = 'https://www.pluginboutique.com/product/2-Effects/21-Channel-Strip/11503-UAD-Sound-City-Studios-Plugin';
fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'Accept-Language': 'en-GB,en;q=0.9' } })
  .then(async r => {
    console.log('status: ' + r.status);
    const t = await r.text();
    console.log('len: ' + t.length);
    const title = (t.match(/<title>([^<]{0,120})/) || [])[1];
    console.log('title: ' + title);
    const dl = [...new Set([...t.matchAll(/"price"\s*:\s*"?([\d.,]+)"?/g)].map(m => m[1]))].slice(0, 8);
    console.log('data-layer price: ' + JSON.stringify(dl));
    const eur = [...new Set([...t.matchAll(/[\u20AC$£]\s?[\d.,]{2,}/g)].map(m => m[0]))].slice(0, 12);
    console.log('importes en la pagina: ' + JSON.stringify(eur));
    const sale = /sale|on sale|discount|\-\d+%/.test(t);
    console.log('marcas de oferta en el HTML: ' + sale);
    const rr = [...new Set([...t.matchAll(/(?:RRP|List Price|Regular Price|Was)[^0-9$€£]{0,20}([\u20AC$£][\d.,]{2,})/gi)].map(m => m[0]))].slice(0, 6);
    console.log('precios tachados/lista: ' + JSON.stringify(rr));
  })
  .catch(e => console.log('ERROR ' + e.message));