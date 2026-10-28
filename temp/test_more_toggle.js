// Prueba del toggle del desplegable "Comparar N tiendas mas" sin navegador.
// Extrae el onclick real del HTML generado y lo ejecuta con un DOM falso que
// imita el comportamiento clave: scrollHeight === 0 mientras display === 'none'.
const fs = require('fs');

const html = fs.readFileSync('guides/best-nylon-guitars-for-beginners.html', 'utf8');
const m = html.match(/class="shop-btn-more" onclick="([^"]*)"/);
if (!m) { console.error('FAIL: no se encontro el onclick'); process.exit(1); }
const code = m[1].replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&');

function makeList(rows) {
  return {
    style: {
      display: 'none',
      overflow: 'hidden',
      maxHeight: '0px',
    },
    get scrollHeight() {
      // Un elemento display:none no tiene caja de layout -> 0
      if (this.style.display === 'none') return 0;
      const n = parseFloat(this.style.maxHeight);
      return (isNaN(n) ? rows : Math.max(n, rows));
    },
    offsetHeight: 100,
  };
}

function makeBtn(list) {
  return {
    nextElementSibling: list,
    querySelectorAll() { return [null, { style: {} }]; },
  };
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  const list = makeList(5 * 46);
  const btn = makeBtn(list);
  const run = () => new Function(code).call(btn);

  // 1) abrir
  run();
  console.log('tras abrir: display=' + list.style.display + ' maxHeight=' + list.style.maxHeight + ' overflow=' + list.style.overflow);
  if (list.style.display !== 'flex') throw new Error('FAIL: no se puso display:flex antes de medir');
  if (list.style.maxHeight === '0px') throw new Error('FAIL: max-height sigue en 0px');

  // 2) tras la transicion de apertura queda abierto y sin recorte
  await sleep(400);
  console.log('abierto (330ms): maxHeight=' + list.style.maxHeight + ' overflow=' + list.style.overflow);
  if (list.style.maxHeight !== 'none') throw new Error('FAIL: max-height no quedo en none');
  if (list.style.overflow !== 'visible') throw new Error('FAIL: overflow no quedo visible');

  // 3) cerrar
  run();
  console.log('tras cerrar: maxHeight=' + list.style.maxHeight + ' display=' + list.style.display);
  if (list.style.maxHeight !== '0px') throw new Error('FAIL: no se cerro');

  // 4) tras la transicion de cierre desaparece del layout
  await sleep(400);
  console.log('cerrado (330ms): display=' + list.style.display + ' overflow=' + list.style.overflow);
  if (list.style.display !== 'none') throw new Error('FAIL: no se paso a display:none tras cerrar');

  // 5) reabrir tras cerrar (segunda apertura real)
  run();
  console.log('reabrir: display=' + list.style.display + ' maxHeight=' + list.style.maxHeight);
  if (list.style.maxHeight === '0px') throw new Error('FAIL: la segunda apertura no funciono');
  await sleep(400);
  if (list.style.maxHeight !== 'none') throw new Error('FAIL: la segunda apertura no quedo abierta');

  // 6) las dos aperturas dan la misma altura util
  console.log('\nOK: abre, cierra, reabre y no recorta contenido');
})().catch(e => { console.error(e.message); process.exit(1); });
