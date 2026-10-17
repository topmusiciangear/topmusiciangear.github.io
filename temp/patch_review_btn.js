const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';

let bg = fs.readFileSync(B + 'build-guides.js', 'utf8');

// ---------- 1) Cabecera de la card: fuera el boton de resena ----------
const oldHead = "  const btnLabel = lang === 'es' ? 'Escribe una rese\u00f1a' : 'Write a review';\n" +
  '  return `<div class="guide-product-card-rating-row">${ratingHtml}<button class="guide-review-write-btn" onclick="openReviewModal(${p.id})">${btnLabel}</button></div>`;';
const newHead = "  // El boton de resena vive al final del desplegable de tiendas (shopButtonsTest),\n" +
  '  // no en la cabecera de la card.\n' +
  '  return `<div class="guide-product-card-rating-row">${ratingHtml}</div>`;';
if (!bg.includes(oldHead)) { console.log('CABECERA: patron no encontrado'); process.exit(1); }
if (bg.indexOf(oldHead) !== bg.lastIndexOf(oldHead)) { console.log('CABECERA: ambiguo'); process.exit(1); }
bg = bg.replace(oldHead, newHead);
console.log('cabecera de card: boton de resena eliminado');

// ---------- 2) starSvg junto a cartSvg ----------
const starSvg = "  const starSvg = '<svg viewBox=\"0 0 576 512\" width=\"1em\" height=\"1em\" fill=\"#FFC107\" style=\"flex-shrink:0\"><path d=\"M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L374 150.2 308.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z\"/></svg>';\n";
const oldCart = "  const cartSvg = '<svg viewBox=\"0 0 576 512\"";
if (!bg.includes(oldCart)) { console.log('cartSvg no encontrado'); process.exit(1); }
bg = bg.replace(oldCart, starSvg + oldCart);
console.log('starSvg anadido');

// ---------- 3) reviewRow antes de rowCount ----------
const oldTail = '  const rowCount = order.filter(k => k !== primaryStoreKey).length;';
const reviewRow = [
  '  // Fila final del desplegable: escribir resena. Se declara fuera del .map() de rows',
  '  // para que quede SIEMPRE despues de todas las tiendas.',
  '  const reviewRow = \'<button type="button" class="shop-btn-review" onclick="openReviewModal(\' + p.id + \')" \'',
  '    + \'style="width:100%;box-sizing:border-box;flex:none;display:flex;align-items:center;gap:8px;padding:8px 16px;min-height:40px;\' +',
  '    + \'border-radius:12px;background:#262626;color:#ffffff;font-family:inherit;font-size:15px;font-weight:800;\' +',
  '    + \'border:none;cursor:pointer;transition:background .2s ease;margin-top:2px" \'',
  '    + \'onmouseover="this.style.background=\\\'#34383d\\\'" onmouseout="this.style.background=\\\'#262626\\\'">\'',
  '    + starSvg + '\'<span style="white-space:nowrap">\' + t(\'Escribe una rese\u00f1a\', \'Write a review\') + \'</span></button>\';',
  oldTail
].join('\n');
if (!bg.includes(oldTail)) { console.log('ancla rowCount no encontrada'); process.exit(1); }
bg = bg.replace(oldTail, reviewRow);
console.log('reviewRow anadido');

// ---------- 4) el desplegable lo incluye al final; Logic (sin desplegable) la muestra suelta ----------
const oldJoin = "'overflow:hidden;max-height:0;transition:max-height .3s ease\">' + rows + '</div>'\n  return isLogic ? primaryBtn : primaryBtn + moreBtn;";
const newJoin = "'overflow:hidden;max-height:0;transition:max-height .3s ease\">' + rows + reviewRow + '</div>'\n  return isLogic ? primaryBtn + reviewRow : primaryBtn + moreBtn;";
if (!bg.includes(oldJoin)) { console.log('join del desplegable no encontrado'); process.exit(1); }
bg = bg.replace(oldJoin, newJoin);
console.log('desplegable: resena al final (y en Logic como boton suelto)');

fs.writeFileSync(B + 'build-guides.js', bg, 'utf8');
new Function('return 0');
console.log('\nbuild-guides.js guardado');