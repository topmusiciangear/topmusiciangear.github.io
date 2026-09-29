const fs = require('fs');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36';

const ASIN_CAPTURE = /\/(?:dp|gp\/product|gp\/aw\/d|product)\/([A-Z0-9]{10})/;
const OUT = 'temp/amz_live_results.json';

function loadProducts() {
  const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
  const rows = [];
  products.forEach(p => {
    const u = p.stores && p.stores.amazon;
    if (!u) return;
    const m = ASIN_CAPTURE.exec(u);
    rows.push({ id: p.id, title: p.title, url: u, asin: m ? m[1] : null, isSearch: /\/s\?k=/.test(u) });
  });
  return rows;
}

function clean(s) {
  return (s || '').replace(/^Amazon\.com:\s*/i, '').replace(/\s*:\s*Amazon\.com.*$/i, '')
    .replace(/\s*[-|:]\s*(Amazon|Musical Instruments|Instruments|Software)\s*$/i, '')
    .replace(/\s+/g, ' ').trim();
}

// Marketing fluff we ignore when comparing our short name vs Amazon's long title
const STOP = new Set(['the','a','an','and','or','of','for','with','in','on','to','by','new','plus','pro','series','model','pack','pair','set','kit','unit','single','gen','generation','edition','version','original','genuine','brand','best','top','full','size','large','small','medium','black','white','type','style','premium','professional','studio','quality','hot','sale','deal','free','shipping','us','usa','uk','au','value','upgrade','bundle','system','monitor','speakers','speaker','color','colour','finish','includes','included','comes','warranty'].map(w=>w));

// Brands: our titles are "Brand + Model + Descriptor", so brand words must not be
// treated as discriminative or we get false mismatches (Rode vs RØDE, SSL vs Solid State Logic).
const BRANDS = new Set(['shure','rode','sennheiser','neumann','akg','fender','squier','gibson','epiphone','taylor','martin','prs','yamaha','arturia','behringer','midas','km','k','m','roland','krk','telarc','hifiman','focal','quad','genelec','positive','grid','audio','technica','beyerdynamic','allen','heath','universal','ssl','solid','state','logic','ev','electro','voice','smythson','se','logitech','blue','marshall','orange','boss','boss','walrus','audio','twelve','cherub','riser','gear','lab','adam','soundcraft','allen','heath','presonus','avid','mackie','ld','systems','turbosound','honeywell','hollyland','dji','fifine','maono','tonor','elgato','razer','hyperx','beacn','lava','music','en','ya','donner','headrush','dynaudio','rcf','telefunken','dakko','daddys','audio','interface','serum','izotope','native','instruments','fabfilter','soundtoys','celemony','celemony','waves','ableton','university','logical','explain','all','and','heath','audio','technica','audio','tascam','zoom','rode','audio','mxl','audio','slate','digital','audio','universal','audio','avalon','universal','audio','chord','mario','ni','native','instruments','best','denon','yamaha','vox','bugera','tascam','behringer','ev','electro','voice'].map(w=>w));

function norm(s) {
  return (s || '').toLowerCase()
    .replace(/&amp;/g, ' and ').replace(/&[a-z]+;/g, ' ')
    .replace(/ø/g, 'o').replace(/æ/g, 'ae').replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '');
}

function tokens(s) {
  return (s || '').toLowerCase()
    .replace(/&amp;/g, ' and ').replace(/&[a-z]+;/g, ' ')
    .replace(/ø/g, 'o').replace(/æ/g, 'ae').replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, ' ')
    .split(' ')
    .filter(w => w.length >= 2);
}

function similarity(ours, theirs) {
  const all = tokens(ours);
  if (!all.length) return { score: 1, missing: [] };
  // Discriminative tokens = contains a digit, or a long word that is not brand/stop fluff
  const model = all.filter(w => /\d/.test(w) || (w.length >= 4 && !STOP.has(w) && !BRANDS.has(w)));
  const use = model.length ? model : all.filter(w => !BRANDS.has(w));
  if (!use.length) return { score: 1, missing: [] };
  const flat = norm(theirs);
  let hit = 0;
  const missing = [];
  use.forEach(w => {
    if (flat.includes(norm(w))) hit++;
    else missing.push(w);
  });
  return { score: +(hit / use.length).toFixed(2), missing };
}

async function check(row) {
  if (!row.asin) return { ...row, status: 'SEARCH_URL', verdict: 'SEARCH_URL' };
  const url = 'https://www.amazon.com/dp/' + row.asin;
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 30000);
    const r = await fetch(url, {
      headers: {
        'User-Agent': UA,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'no-cache'
      },
      signal: ctrl.signal
    });
    clearTimeout(timer);
    const body = await r.text();
    const title = clean((body.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1]);
    const hasProductTitle = /id="productTitle"/i.test(body) || /<h1[^>]*id="title"/i.test(body);
    // Amazon's 404 "dog" page ALSO contains the phrase "automated access to Amazon data",
    // so NOT_FOUND must be evaluated BEFORE the captcha check.
    const notFound = /Sorry! We couldn't find that page/i.test(body) ||
                     /<h1>Looking for something\?<\/h1>/i.test(body) ||
                     /a\.jpg"[^>]*alt="[^"]*[Dd]og/i.test(body);
    const captcha = !notFound && /Enter the characters you see below|sorry we just need to make sure|automated access to Amazon data/i.test(body);
    const redirected = /\/s\?k=|\/s\?i=/.test(r.url);
    // strict: only trust an explicit marker in the TITLE, page HTML contains hidden templates
    const unbuyable = /\[Actual Image \/ Undisplayed Item\]/i.test(title);
    const finalAsin = (ASIN_CAPTURE.exec(r.url) || [])[1] || null;
    let verdict = 'OK';
    if (notFound) verdict = 'NOT_FOUND';
    else if (captcha) verdict = 'BLOCKED';
    else if (r.status !== 200) verdict = 'HTTP_' + r.status;
    else if (redirected) verdict = 'REDIRECT_TO_SEARCH';
    else if (!hasProductTitle) verdict = 'NO_PRODUCT_BLOCK';
    const sim = similarity(row.title, title);
    if (verdict === 'OK' && sim.score < 0.7) verdict = 'TITLE_MISMATCH';
    return { ...row, status: r.status, finalUrl: r.url, finalAsin, amzTitle: title, verdict, hasProductTitle, unbuyable, score: sim.score, missing: sim.missing, bytes: body.length };
  } catch (e) {
    return { ...row, status: 'ERR', verdict: 'ERROR', err: e.message };
  }
}

(async () => {
  const mode = process.argv[2] || 'full';
  let items = loadProducts();
  if (mode === 'pilot') items = items.filter(r => r.asin).slice(0, 10);
  const prevAll = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : {};
  if (mode === 'retry') {
    const bad = Object.values(prevAll).filter(r => r.verdict === 'BLOCKED').map(r => r.id);
    console.log('retrying ' + bad.length + ' previously blocked ids');
    items = items.filter(r => bad.includes(r.id));
  }
  const conc = mode === 'retry' ? 1 : (parseInt(process.env.CONC, 10) || 4);
  const delay = parseInt(process.env.DELAY, 10) || 0;
  console.log('checking ' + items.length + ' items, concurrency ' + conc + (delay ? ', delay ' + delay + 'ms' : '') + (mode === 'retry' ? ' [RETRY]' : ''));
  const t0 = Date.now();
  const res = [];
  let i = 0;
  const workers = Array.from({ length: conc }, async () => {
    while (i < items.length) {
      const item = items[i++];
      res.push(await check(item));
      process.stdout.write('.');
      if (delay) await new Promise(r => setTimeout(r, delay + Math.random() * delay));
    }
  });
  await Promise.all(workers);
  console.log('');
  const secs = ((Date.now() - t0) / 1000).toFixed(0);
  console.log('done in ' + secs + 's\n');
  const tally = {};
  res.forEach(r => { tally[r.verdict] = (tally[r.verdict] || 0) + 1; });
  console.log('=== VERDICTS ===');
  Object.entries(tally).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log('  ' + String(v).padStart(4) + '  ' + k));
  console.log('\n=== DETAIL (problems + lowest scores) ===');
  const problems = res.filter(r => r.verdict !== 'OK');
  const okSorted = res.filter(r => r.verdict === 'OK').sort((a, b) => a.score - b.score);
  const lowOk = okSorted.slice(0, parseInt(process.env.TOP_OK || '0', 10));
  [...problems, ...lowOk].forEach(r => {
    console.log('  #' + String(r.id).padStart(3) + ' ' + (r.asin || '--------') + ' [' + r.verdict + '] score=' + (r.score != null ? r.score : '-') + (r.unbuyable ? ' UNBUYABLE' : ''));
    console.log('      OURS:   ' + r.title);
    console.log('      AMAZON: ' + (r.amzTitle || '-'));
    if (r.missing && r.missing.length) console.log('      MISSING: ' + r.missing.join(', '));
    if (r.finalAsin && r.finalAsin !== r.asin) console.log('      REDIRECTED TO: ' + r.finalAsin);
  });
  if (!problems.length && !lowOk.length) console.log('  (none)');
  res.forEach(r => { prevAll[r.id] = r; });
  fs.writeFileSync(OUT, JSON.stringify(prevAll, null, 1));
  console.log('\nsaved -> ' + OUT);
})();
