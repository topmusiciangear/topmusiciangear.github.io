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
  const W = Number(process.argv[3] || 980), H = Number(process.argv[4] || 1743), MOB = (process.argv[5] || '0') === '1';
  await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 1, mobile: MOB });
  await send('Page.navigate', { url: process.argv[2] });
  await sleep(3500);
  const expr = `(() => {
    const out = { vw: innerWidth, scrollWidth: document.documentElement.scrollWidth, blocks: [] };
    const grid = document.querySelector('.guide-detail-sections');
    out.gridCols = getComputedStyle(grid).gridTemplateColumns;
    out.gridW = Math.round(grid.getBoundingClientRect().width);
    const secs = [...grid.children].slice(0, 4);
    const measure = (el) => {
      const host = document.createElement('div');
      host.style.cssText = 'position:absolute;left:-99999px;top:0;width:min-content;visibility:hidden;';
      const c = el.cloneNode(true);
      host.appendChild(c);
      document.body.appendChild(host);
      const w = Math.round(host.getBoundingClientRect().width);
      host.remove();
      return w;
    };
    secs.forEach((s, i) => {
      const info = { i, w: Math.round(s.getBoundingClientRect().width), min: measure(s), kids: [] };
      [...s.children].forEach(k => {
        info.kids.push({ cls: k.className.toString().slice(0,60), tag: k.tagName, w: Math.round(k.getBoundingClientRect().width), min: measure(k) });
      });
      const mb = s.querySelector('.guide-section-mediabuy');
      if (mb) {
        info.mediabuy = { w: Math.round(mb.getBoundingClientRect().width), min: measure(mb) };
        info.mbKids = [...mb.children].map(k => ({ cls: k.className.toString().slice(0,50), w: Math.round(k.getBoundingClientRect().width), min: measure(k) }));
      }
      out.blocks.push(info);
    });
    return JSON.stringify(out, null, 2);
  })()`;
  const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true });
  console.log(r.result.value);
  ws.close(); process.exit(0);
})().catch(e => { console.log('ERR', e.message); process.exit(1); });
