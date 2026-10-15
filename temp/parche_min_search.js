const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/js/app.min.js';
let s = fs.readFileSync(F, 'utf8');

const ANCLA = '},250)}),document.querySelectorAll(".nav-link[data-nav]")';
if (!s.includes(ANCLA)) { console.log('ANCLA NO ENCONTRADA'); process.exit(1); }

const MIN = '}),' +
  'var tmgPSF=document.getElementById("productSearchInput"),' +
  'tmgPCB=document.getElementById("productSearchClear");' +
  'function tmgSyncSearchClear(){' +
  'if(!tmgPSF||!tmgPCB)return;' +
  'var h=tmgPSF.value.length>0;' +
  'tmgPCB.style.display=h?"block":"none";' +
  'tmgPCB.setAttribute("aria-label",(document.documentElement.lang||"en").indexOf("es")===0?"Limpiar búsqueda":"Clear search")}' +
  'function tmgClearProductSearch(){' +
  'if(!tmgPSF)return;' +
  'tmgPSF.value="";' +
  'var r=document.getElementById("productSearchResults");' +
  'if(r){r.style.display="none";r.innerHTML=""}' +
  'tmgSyncSearchClear();' +
  'tmgPSF.focus()}' +
  'tmgPSF&&tmgPSF.addEventListener("input",tmgSyncSearchClear),' +
  'tmgPSF&&tmgPSF.addEventListener("keydown",function(e){if(e.key==="Escape"&&tmgPSF.value)tmgClearProductSearch()}),' +
  'tmgPCB&&tmgPCB.addEventListener("click",tmgClearProductSearch),' +
  'tmgSyncSearchClear(),' +
  'document.querySelectorAll(".nav-link[data-nav]")';

s = s.replace(ANCLA, '},250)})' + MIN);
fs.writeFileSync(F, s, 'utf8');
console.log('parche aplicado');

try { new Function(s); console.log('sintaxis app.min.js: OK'); }
catch (e) { console.log('SINTAXIS ROTA: ' + e.message); }

// comprobar que app.js tambien parsea
try { new Function(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/js/app.js', 'utf8')); console.log('sintaxis app.js: OK'); }
catch (e) { console.log('app.js ROTO: ' + e.message); }
