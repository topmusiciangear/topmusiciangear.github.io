// Diagnóstico de ancho real en móvil vía CDP (sin dependencias).
const http = require('http');

function getJSON(path) {
  return new Promise((res, rej) => {
    http.get({ host: '127.0.0.1', port: 9333, path }, r => {
      let d = '';
      r.on('data', c => d += c);
      r.on('end', () => { try { res(JSON.parse(d)); } catch (e) { rej(e); } });
    }).on('error', rej);
  });
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  let targets = [];
  for (let i = 0; i < 30; i++) {
    try { targets = await getJSON('/json/list'); if (targets.length) break; } catch (e) {}
    await sleep(300);
  }
  const page = targets.find(t => t.type === 'page');
  if (!page) { console.log('NO PAGE TARGET'); process.exit(1); }

  const ws = new WebSocket(page.webSocketDebuggerUrl);
  let id = 0;
  const pending = new Map();
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

  await send('Page.enable');
  await send('Runtime.enable');
  const W = Number(process.argv[3] || 390);
  const H = Number(process.argv[4] || 844);
  const MOB = (process.argv[5] || '1') === '1';
  await send('Emulation.setDeviceMetricsOverride', {
    width: W, height: H, deviceScaleFactor: 2, mobile: MOB
  });
  await send('Emulation.setUserAgentOverride', {
    userAgent: 'Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36'
  });

  const url = process.argv[2] || 'http://localhost:8899/';
  await send('Page.navigate', { url });
  await sleep(3500);

  const expr = `
  (() => {
    const de = document.documentElement;
    const vw = window.innerWidth;
    const out = {
      url: location.pathname,
      innerWidth: vw,
      clientWidth: de.clientWidth,
      scrollWidth: de.scrollWidth,
      bodyScrollWidth: document.body.scrollWidth,
      visualViewportScale: window.visualViewport ? window.visualViewport.scale : null,
      docRect: de.getBoundingClientRect().width,
      bad: []
    };
    const pad = v => Math.round(v * 10) / 10;
    document.querySelectorAll('body *').forEach(el => {
      const cs = getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden' || cs.position === 'fixed') return;
      const r = el.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) return;
      const overflow = r.right > vw + 1 || r.left < -1;
      const fixedWide = (parseFloat(cs.width) > vw + 1) ||
        (parseFloat(cs.minWidth) > vw + 1) ||
        (parseFloat(cs.flexBasis) > vw + 1);
      if (overflow || fixedWide) {
        out.bad.push({
          tag: el.tagName.toLowerCase(),
          cls: (el.className && el.className.toString().slice(0, 70)) || '',
          id: el.id || '',
          left: pad(r.left), right: pad(r.right), width: pad(r.width),
          cssW: cs.width, minW: cs.minWidth, transform: cs.transform
        });
      }
    });
    out.bad = out.bad.slice(0, 40);
    return JSON.stringify(out, null, 2);
  })()
  `;

  const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: false });
  console.log(r.result.value);
  ws.close();
  process.exit(0);
})().catch(e => { console.log('ERR', e.message); process.exit(1); });
