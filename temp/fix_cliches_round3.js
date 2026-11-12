/**
 * fix_cliches_round3.js — dos remates reales tras round2
 */
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
let rawG = fs.readFileSync(B + 'data/guides.json', 'utf8');
let okG = 0, failG = [];
function repG(par) { const a = rawG; rawG = rawG.split(par[0]).join(par[1]); if (rawG !== a) okG++; else failG.push(par[0]); }

// "the real MVP" en budget-bass-like-expensive sections[2] content EN
repG(['The 5-way Performance EQ active circuit is the real MVP.', 'The 5-way Performance EQ active circuit is what does the most here.']);
repG(['El circuito activo Performance EQ de 5 vías es el verdadero MVP.', 'El circuito activo Performance EQ de 5 vías es lo que más aporta.']);

// "una verdadera navaja suiza" en budget-bass-like-expensive sections[14] content_es
repG(['son una verdadera navaja suiza (pasivo para una redondez vintage', 'hacen de todo (pasivo para una redondez vintage']);

fs.writeFileSync(B + 'data/guides.json', rawG, 'utf8');
console.log('guides OK: ' + okG + ' | FAIL: ' + failG.length); failG.forEach(f => console.log('  G-FAIL: ' + f.slice(0, 90)));
