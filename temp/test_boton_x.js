// Simula el comportamiento del boton X con un DOM falso
const fs = require('fs');
const src = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/js/app.js', 'utf8');

// extraer el bloque de la X
const ini = src.indexOf('var productSearchField = document.getElementById("productSearchInput");');
const finMarc = 'productSearchClearBtn?.addEventListener("click", tmgClearProductSearch);';
const fin = src.indexOf(finMarc, ini) + finMarc.length;
const bloque = src.slice(ini, fin) + '\ntmgSyncSearchClear();';

const listeners = {};
const el = (id) => ({
  id, value: '', style: { display: '' },
  attrs: {},
  setAttribute(k, v) { this.attrs[k] = v; },
  addEventListener(ev, fn) { listeners[id + ':' + ev] = fn; },
  focus() { this.focused = true; }
});
const field = el('productSearchInput');
const btn = el('productSearchClear');
const results = el('productSearchResults');
results.style.display = 'none';

const document = {
  getElementById: (id) => ({ productSearchInput: field, productSearchClear: btn, productSearchResults: results }[id] || null),
  documentElement: { lang: 'es' }
};

eval(bloque);

const fire = (id, ev, arg) => listeners[id + ':' + ev] && listeners[id + ':' + ev](arg);
const estado = (et) => console.log('  ' + et + ' -> boton: ' + btn.style.display + ' | input: "' + field.value + '" | resultados: ' + results.style.display + ' | aria: ' + btn.attrs['aria-label']);

console.log('=== simulacion ===');
estado('inicio (vacio)');
field.value = 'nt1'; fire('productSearchInput', 'input', { target: field });
estado('tras escribir "nt1"');
results.style.display = 'block';
fire('productSearchClear', 'click', {});
estado('tras clic en X');
console.log('  foco en input: ' + (field.focused ? 'si' : 'NO'));
field.value = 'hs8'; fire('productSearchInput', 'input', { target: field });
results.style.display = 'block';
fire('productSearchInput', 'keydown', { key: 'Escape' });
estado('tras Escape con texto');
document.documentElement.lang = 'en';
field.value = 'x'; fire('productSearchInput', 'input', { target: field });
console.log('  aria en EN: ' + btn.attrs['aria-label']);
