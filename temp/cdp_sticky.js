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
  const W = Number(process.argv[3] || 1440);
  await send('Emulation.setDeviceMetricsOverride', { width: W, height: 900, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url: process.argv[2] });
  await sleep(2500);
  const r = await send('Runtime.evaluate', {
    expression: `(async () => {
      const h = document.querySelector('header');
      const before = h ? h.getBoundingClientRect().top : null;
      const cs = h ? getComputedStyle(h) : null;
      window.scrollTo(0, 1200);
      await new Promise(r => setTimeout(r, 400));
      const after = h ? h.getBoundingClientRect().top : null;
      const bodyCs = getComputedStyle(document.body);
      return JSON.stringify({
        scrollY: window.scrollY,
        headerTopBefore: before,
        headerTopAfter: after,
        position: cs && cs.position,
        top: cs && cs.top,
        zIndex: cs && cs.zIndex,
        bodyOverflowX: bodyCs.overflowX,
        bodyOverflowY: bodyCs.overflowY,
        htmlOverflowX: getComputedStyle(document.documentElement).overflowX
      }, null, 1);
    })()`,
    awaitPromise: true, returnByValue: true
  });
  console.log(r.result.value);
  ws.close(); process.exit(0);
})().catch(e => { console.log('ERR', e.message); process.exit(1); });
