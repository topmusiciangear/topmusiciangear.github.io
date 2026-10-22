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
  const W = Number(process.argv[3] || 980);
  await send('Emulation.setDeviceMetricsOverride', { width: W, height: 1200, deviceScaleFactor: 1, mobile: W < 800 });
  await send('Page.navigate', { url: process.argv[2] });
  await sleep(2500);
  const expr = `(() => {
    const out = { vw: innerWidth, scroll: document.documentElement.scrollWidth, problems: [], headings: [] };
    document.querySelectorAll('.guide-section').forEach(s => {
      const sr = s.getBoundingClientRect();
      if (s.scrollWidth > s.clientWidth + 1) out.problems.push({ what: 'section internal overflow', w: s.scrollWidth, cw: s.clientWidth });
      s.querySelectorAll('.guide-section-heading, .guide-section-content').forEach(e => {
        const r = e.getBoundingClientRect();
        if (r.right > sr.right + 1 || e.scrollWidth > e.clientWidth + 1) {
          out.problems.push({ what: 'text overflow', txt: e.textContent.trim().slice(0, 40), right: Math.round(r.right), secRight: Math.round(sr.right), sw: e.scrollWidth, cw: e.clientWidth });
        }
      });
    });
    document.querySelectorAll('.guide-section-heading').forEach(h => {
      const r = h.getBoundingClientRect();
      out.headings.push({ t: h.textContent.trim().slice(0, 45), left: Math.round(r.left), right: Math.round(r.right) });
    });
    out.problems = out.problems.slice(0, 10);
    return JSON.stringify(out, null, 2);
  })()`;
  const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true });
  console.log(r.result.value);
  ws.close(); process.exit(0);
})().catch(e => { console.log('ERR', e.message); process.exit(1); });
