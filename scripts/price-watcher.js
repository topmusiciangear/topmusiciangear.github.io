/**
 * price-watcher.js
 * Chequea precios de Music Store, Andertons, zZounds y Gear4Music cada 5 días
 * Umbral de cambio: 2% absoluto
 */
const fs = require('fs');
const path = require('path');

const PRODUCTS_PATH = path.join(__dirname, '..', 'data', 'products.json');
const GUIDES_PATH = path.join(__dirname, '..', 'build-guides.js');

const THRESHOLD = parseFloat(process.env.THRESHOLD || '0.01');

function loadProducts() {
  return JSON.parse(fs.readFileSync(PRODUCTS_PATH, 'utf8'));
}

function loadTestShopBtn() {
  const content = fs.readFileSync(GUIDES_PATH, 'utf8');
  const match = content.match(/const TEST_SHOP_BTN = ({[\s\S]*?});/);
  if (!match) throw new Error('TEST_SHOP_BTN no encontrado');
  // Eval seguro limitado a objeto
  return JSON.parse('{' + match[1].replace(/(\w+):/g, '"$1":') + '}');
}

async function fetchPrice(url, store) {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const html = await res.text();
    // Búsqueda simple de JSON-LD con offers.price
    const ldMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    if (!ldMatch) return null;
    const data = JSON.parse(ldMatch[1]);
    const offers = data.offers || data;
    const price = offers.price || offers.aggregateRating?.ratingValue;
    if (!price) return null;
    return parseFloat(String(price).replace(/[^0-9.]/g, ''));
  } catch (e) {
    console.warn(`Fetch error ${store}:`, e.message);
    return null;
  }
}

async function run() {
  const products = loadProducts();
  const testBtn = loadTestShopBtn();
  let changed = false;

  for (const p of products) {
    const id = p.id;
    const cfg = testBtn[id];
    if (!cfg || !cfg.prices) continue;

    const stores = p.stores || {};
    for (const store of ['zzounds','andertons','musicstore','gear4music']) {
      const url = stores[store];
      if (!url) continue;
      const current = cfg.prices[store];
      if (!current) continue;
      const currentNum = parseFloat(String(current).replace(/[^0-9.]/g, ''));
      const newPrice = await fetchPrice(url, store);
      if (!newPrice) continue;
      const diff = Math.abs(newPrice - currentNum) / currentNum;
      if (diff >= THRESHOLD) {
        // sanity check ratio vs catálogo
        const cat = parseFloat(String(p.price || 0).replace(/[^0-9.]/g,''));
        if (cat && newPrice / cat < 0.55 || newPrice / cat > 1.5) {
          console.log(`Producto ${id} ${store} fuera de rango, requiere revisión`);
          continue;
        }
        console.log(`Producto ${id} ${store}: ${current} -> ${newPrice}`);
        cfg.prices[store] = newPrice.toFixed(2);
        changed = true;
      }
    }
  }

  if (changed) {
    // Reescribe TEST_SHOP_BTN en build-guides.js
    let content = fs.readFileSync(GUIDES_PATH, 'utf8');
    const newBlock = 'const TEST_SHOP_BTN = ' + JSON.stringify(testBtn, null, 2) + ';';
    content = content.replace(/const TEST_SHOP_BTN = ({[\s\S]*?});/, newBlock);
    fs.writeFileSync(GUIDES_PATH, content, 'utf8');
    console.log('TEST_SHOP_BTN actualizado');
  } else {
    console.log('No hay cambios');
  }
}

run().catch(console.error);
