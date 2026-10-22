// Refinado: solo elementos que REALMENTE extienden el documento (sin ancestro recortador).
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
  ws.addEventListener('message', ev => {
    const m = JSON.parse(ev.data);
    if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
  });
  const send = (method, params = {}) => new Promise((res, rej) => {
    const i = ++id;
    pending.set(i, m => m.error ? rej(new Error(JSON.stringify(m.error))) : res(m.result));
    ws.send(JSON.stringify({ id: i, method, params }));
  });
  await new Promise(r => ws.addEventListener('open', r));
  await send('Page.enable'); await send('Runtime.enable');
  const W = Number(process.argv[3] || 390), H = Number(process.argv[4] || 844);
  const MOB = (process.argv[5] || '1') === '1';
  await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 2, mobile: MOB });
  await send('Emulation.setUserAgentOverride', { userAgent: 'Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36' });
  await send('Page.navigate', { url: process.argv[2] });
  await sleep(3500);
  const expr = `(() => {
    const vw = window.innerWidth, de = document.documentElement;
    const res = { url: location.pathname, innerWidth: vw, scrollWidth: de.scrollWidth, ratio: +(vw/de.scrollWidth*100).toFixed(1), contrib: [] };
    const clipped = el => {
      let p = el.parentElement;
      while (p && p !== document.body) {
        const cs = getComputedStyle(p);
        if (cs.overflowX !== 'visible' || cs.contain === 'paint' || cs.contain === 'layout') return true;
        p = p.parentElement;
      }
      return false;
    };
    const path = el => {
      const parts = [];
      let e = el;
      while (e && e !== document.body && parts.length < 5) {
        parts.unshift(e.tagName.toLowerCase() + (e.id ? '#'+e.id : '') + (e.className ? '.'+e.className.toString().trim().split(/\\s+/).slice(0,3).join('.') : ''));
        e = e.parentElement;
      }
      return parts.join(' > ');
    };
    document.querySelectorAll('body *').forEach(el => {
      const cs = getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden' || cs.position === 'fixed') return;
      const r = el.getBoundingClientRect();
      if (!r.width && !r.height) return;
      if (r.right <= vw + 1 && r.left >= -1) return;
      if (clipped(el)) return;
      res.contrib.push({ path: path(el), left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width), pos: cs.position, cssW: cs.width, transform: cs.transform });
    });
    res.contrib.sort((a,b)=>b.right-a.right);
    res.contrib = res.contrib.slice(0, 25);
    // también: contenedores con overflow que scrollean
    res.scrollers = [];
    document.querySelectorAll('body *').forEach(el => {
      if (el.scrollWidth > el.clientWidth + 2) {
        const cs = getComputedStyle(el);
        if (cs.overflowX === 'auto' || cs.overflowX === 'scroll') {
          res.scrollers.push({ path: path(el), scrollW: el.scrollWidth, clientW: el.clientWidth, cssW: cs.width });
        }
      }
    });
    res.scrollers = res.scrollers.slice(0, 10);
    return JSON.stringify(res, null, 2);
  })()`;
  const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true });
  console.log(r.result.value);
  ws.close(); process.exit(0);
})().catch(e => { console.log('ERR', e.message); process.exit(1); });
