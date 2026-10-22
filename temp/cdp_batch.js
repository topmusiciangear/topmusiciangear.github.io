const http = require('http');
function getJSON(path) {
  return new Promise((res, rej) => {
    http.get({ host: '127.0.0.1', port: 9333, path }, r => {
      let d = ''; r.on('data', c => d += c);
      r.on('end', () => { try { res(JSON.parse(d)); } catch (e) { rej(e); } });
    }).on('error', rej);
  });
}
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const targets = await getJSON('/json/list');
  const page = targets.find(t => t.type === 'page');
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  let id = 0; const pending = new Map();
  ws.addEventListener('message', ev => { const m = JSON.parse(ev.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } });
  const send = (method, params = {}) => new Promise((res, rej) => { const i = ++id; pending.set(i, m => m.error ? rej(new Error(JSON.stringify(m.error))) : res(m.result)); ws.send(JSON.stringify({ id: i, method, params })); });
  await new Promise(r => ws.addEventListener('open', r));
  await send('Page.enable'); await send('Runtime.enable');
  const urls = process.argv.slice(2);
  const widths = [390, 980, 1279, 1280, 1920];
  const expr = `(() => {
    const de = document.documentElement;
    const vw = window.innerWidth;
    const clipped = el => { let p = el.parentElement; while (p && p !== document.body) { const cs = getComputedStyle(p); if (cs.overflowX !== 'visible') return true; p = p.parentElement; } return false; };
    let worst = null;
    document.querySelectorAll('body *').forEach(el => {
      const cs = getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden' || cs.position === 'fixed' || cs.position === 'absolute') return;
      const r = el.getBoundingClientRect();
      if (!r.width && !r.height) return;
      if (r.right <= vw + 1) return;
      if (clipped(el)) return;
      if (!worst || r.right > worst.right) worst = { tag: el.tagName, cls: (el.className||'').toString().slice(0,50), right: Math.round(r.right) };
    });
    return JSON.stringify({ vw, scroll: de.scrollWidth, worst });
  })()`;
  for (const w of widths) {
    await send('Emulation.setDeviceMetricsOverride', { width: w, height: 1000, deviceScaleFactor: 1, mobile: w < 800 });
    for (const u of urls) {
      await send('Page.navigate', { url: u });
      await sleep(2200);
      const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true });
      const o = JSON.parse(r.result.value);
      const bad = o.scroll > o.vw + 1;
      console.log(`${bad ? 'FAIL' : 'ok  '} w=${w} scroll=${o.scroll} ${u.split('/').pop()}${bad ? '  worst=' + JSON.stringify(o.worst) : ''}`);
    }
  }
  ws.close(); process.exit(0);
})().catch(e => { console.log('ERR', e.message); process.exit(1); });
