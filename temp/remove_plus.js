const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';

// el boton se escribe en el fuente con el escape \u2212, no con el caracter
const reBtn = /<button class="guide-product-card-desc-toggle" onclick="var w=this\.parentElement;var d=w\.querySelector\('\.guide-product-card-desc'\);d\.classList\.toggle\('expanded'\);this\.textContent=d\.classList\.contains\('expanded'\)\?'(?:\\u2212|−)':'\+'">\+<\/button>/g;
const reScript = "document.querySelectorAll('.guide-product-card-desc').forEach(function(e){var b=e.nextElementSibling;if(b&&b.classList.contains('guide-product-card-desc-toggle')&&e.scrollHeight<=e.clientHeight)b.remove()});";

function limpiar(file, label) {
  let s = fs.readFileSync(B + file, 'utf8');
  const n = (s.match(reBtn) || []).length;
  const nS = s.split(reScript).length - 1;
  if (n === 0 && nS === 0) { console.log(label + ': nada que quitar (ya limpio)'); return null; }
  s = s.replace(reBtn, '');
  if (nS === 1) s = s.replace(reScript, '');
  fs.writeFileSync(B + file, s, 'utf8');
  console.log(label + ': quitados ' + n + ' boton(es) + y ' + nS + ' script(s) inline');
  return s;
}

const bg = limpiar('build-guides.js', 'build-guides.js');
if (!bg) process.exit(1);
const a = limpiar('js/app.js', 'js/app.js');
const m = limpiar('js/app.min.js', 'js/app.min.js');

new Function(a);
new Function(m);
console.log('app.js y app.min.js sintaxis OK');
['build-guides.js', 'js/app.js', 'js/app.min.js'].forEach(f => {
  const s = fs.readFileSync(B + f, 'utf8');
  console.log('  ' + f + ': desc-toggle=' + s.includes('guide-product-card-desc-toggle') + ' | expanded=' + s.includes("classList.toggle('expanded')"));
});