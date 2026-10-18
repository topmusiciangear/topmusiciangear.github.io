const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const productos = JSON.parse(fs.readFileSync(B + 'temp/pb_urls_to_scrape.json', 'utf8'))
  .filter(p => [29,1001,1002,1003,1004,1005,1006,1007,1007,1008,1009,1010,1011,1012,1013,1014,1016,1017,1018,1019,1020,1021,1022,1023,1025,1027,1028,1030,1032,1034,1035,1036,1038,1039,1040,1041].includes(p.id));

// Headers para que parezca navegador real
const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
  'Accept-Language': 'en-GB,en;q=0.9',
  'Accept-Encoding': 'gzip, deflate, br',
  'Sec-Fetch-Dest': 'document',
  'Sec-Fetch-Mode': 'navigate',
  'Sec-Fetch-Site': 'none',
  'Sec-Fetch-User': '?1',
  'Upgrade-Insecure-Requests': '1',
  'Cache-Control': 'max-age=0'
};

// Función para extraer precios del HTML de PB
function extraerPrecios(html) {
  const precios = { eur: null, usd: null, gbp: null, promo: null, lista: null };
  
  // 1. Buscar en el bloque otpPrice (precio actual y tachado)
  const otpMatch = html.match(/otpPrice[\s\S]{0,800}?<\/div>\s*<\/div>/);
  if (otpMatch) {
    const bloque = otpMatch[0];
    // Precio actual (sin line-through)
    const actualMatch = bloque.match(/>([\u20AC$£]\s*[\d.,]+)\s*<\s*\/span>/);
    if (actualMatch) {
      const val = actualMatch[1].trim();
      if (val.startsWith('€')) precios.eur = val;
      else if (val.startsWith('$')) precios.usd = val;
      else if (val.startsWith('£')) precios.gbp = val;
    }
    // Precio tachado (line-through)
    const tachadoMatch = bloque.match(/line-through[^>]*>\s*([\u20AC$£]\s*[\d.,]+)/);
    if (tachadoMatch) {
      precios.lista = tachadoMatch[1].trim();
    }
    // Badge de promo
    const promoMatch = bloque.match(/(\d+%\s*off[^<]*)/i);
    if (promoMatch) precios.promo = promoMatch[1].trim();
  }
  
  // 2. JSON-LD (Product.offers.price)
  const jsonld = [...html.matchAll(/"price"\s*:\s*"?([\d.,]+)"?/g)].map(m => m[1]);
  if (jsonld.length && !precios.eur) {
    // El primero suele ser EUR
    precios.eur = '€' + jsonld[0].replace(/,/g, '');
  }
  
  // 3. Meta og:price:amount
  const ogPrice = html.match(/property="og:price:amount"\s+content="([\d.,]+)"/);
  if (ogPrice && !precios.eur) precios.eur = '€' + ogPrice[1];
  
  // 4. Meta product:price:amount
  const prodPrice = html.match(/property="product:price:amount"\s+content="([\d.,]+)"/);
  if (prodPrice && !precios.eur) precios.eur = '€' + prodPrice[1];
  
  return precios;
}

// Scraper principal
async function scrapear() {
  const B = 'C:/Users/Daniel/projects/topmusiciangear/';
  const productos = JSON.parse(require('fs').readFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/pb_scrape_final.json', 'utf8'));
  
  console.log('Total a scrapear: ' + productos.length);
  const resultados = [];
  
  for (let i = 0; i < productos.length; i++) {
    const p = productos[i];
    console.log('\n[' + (i+1) + '/' + productos.length + '] ' + p.id + ' ' + p.title);
    console.log('  URL: ' + p.url);
    
    try {
      const response = await fetch(p.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-GB,en;q=0.9',
          'Accept-Encoding': 'gzip, deflate, br',
          'Sec-Fetch-Dest': 'document',
          'Sec-Fetch-Mode': 'navigate',
          'Sec-Fetch-Site': 'none',
          'Sec-Fetch-User': '?1',
          'Upgrade-Insecure-Requests': '1',
          'Cache-Control': 'max-age=0'
        },
        // No seguir redirects automáticamente para ver la URL final
        redirect: 'follow'
      });
      
      const html = await response.text();
      const precios = extraerPrecios(html);
      
      console.log('  Status: ' + response.status);
      console.log('  EUR: ' + (precios.eur || 'NO'));
      console.log('  USD: ' + (precios.usd || 'NO'));
      console.log('  GBP: ' + (precios.gbp || 'NO'));
      if (precios.promo) console.log('  Promo: ' + precios.promo);
      if (precios.lista) console.log('  Lista: ' + precios.lista);
      
      resultados.push({
        id: p.id,
        title: p.title,
        url: p.url,
        precios: precios,
        status: response.status
      });
      
      // Pausa para no saturar
      if (i < productos.length - 1) {
        await new Promise(r => setTimeout(r, 1500 + Math.random() * 1000));
      }
      
    } catch (e) {
      console.log('  ERROR: ' + e.message);
      resultados.push({ id: p.id, title: p.title, url: p.url, error: e.message });
    }
  }
  
  // Guardar resultados
  const fs = require('fs');
  require('fs').writeFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/pb_scraped_results.json', JSON.stringify(resultados, null, 2), 'utf8');
  console.log('\n\nResultados guardados en temp/pb_scraped_results.json');
  console.log('Exitosos: ' + resultados.filter(r => !r.error).length + '/' + resultados.length);
}

scrapear().catch(console.error);