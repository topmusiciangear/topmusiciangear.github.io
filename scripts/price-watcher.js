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
  const start = content.indexOf('const TEST_SHOP_BTN = {');
  if (start === -1) throw new Error('TEST_SHOP_BTN no encontrado');
  const end = content.indexOf('};', start) + 2;
  const code = content.slice(start, end);
  // Eval seguro en sandbox
  const vm = require('vm');
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  return sandbox.TEST_SHOP_BTN;
}

async function fetchPrice(url, store) {
  try {
    // Tiendas con Cloudflare / render dinámico usan Playwright
    const needsBrowser = ['zzounds','gear4music','musicstore'].includes(store);
    let html;
    if (needsBrowser){
      const { chromium } = require('playwright');
      const browser = await chromium.launch({ headless: true });
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
      html = await page.content();
      await browser.close();
    } else {
      const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      html = await res.text();
    }
    const blocks = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) || [];
    for (const b of blocks){
      try{
        const jsonStr = b.replace(/<script[^>]*>/,'').replace(/<\/script>/,'').trim();
        const data = JSON.parse(jsonStr);
        const findPrice = (obj)=>{
          if(!obj || typeof obj!=='object') return null;
          if(obj.offers?.price) return obj.offers.price;
          if(Array.isArray(obj['@graph'])) {
            for(const item of obj['@graph']){
              if(item.offers?.price) return item.offers.price;
            }
          }
          if(obj.offers && typeof obj.offers==='object'){
            if(obj.offers.price) return obj.offers.price;
          }
          return null;
        };
        const price = findPrice(data);
        if(price) return parseFloat(String(price).replace(/[^0-9.]/g,''));
      }catch{}
    }
    // Fallback regex para zZounds
    if(store==='zzounds'){
      const m = html.match(/"price"\s*:\s*"([^"]+)"/);
      if(m) return parseFloat(String(m[1]).replace(/[^0-9.]/g,''));
    }
    return null;
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
