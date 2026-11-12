/**
 * fix_cliches_round2.js — cierres pendientes tras fix_cliches.js
 * Agujas byte-exactas, raw split/join.
 */
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
let rawG = fs.readFileSync(B + 'data/guides.json', 'utf8');
let rawP = fs.readFileSync(B + 'data/products.json', 'utf8');
let okG = 0, failG = [], okP = 0, failP = [];
function repG(par) { const a = rawG; rawG = rawG.split(par[0]).join(par[1]); if (rawG !== a) okG++; else failG.push(par[0]); }
function repP(par) { const a = rawP; rawP = rawP.split(par[0]).join(par[1]); if (rawP !== a) okP++; else failP.push(par[0]); }

// player-strat-vs-pacifica sections[1] heading EN + ES
repG(['The Pacifica 112V: The Budget Workhorse', 'Yamaha Pacifica 112V: The Budget Guitar That Does It All']);
repG(['La Pacifica 112V: la guitarra todoterreno', 'La Pacifica 112V: la guitarra que lo cubre todo']);

// best-microphone sections[0].heading_es
repG(['Micrófonos dinámicos: los todoterrenos', 'Micrófonos dinámicos: los clásicos de escenario']);

// P276 Q2U desc EN + desc_ES
repP(['The Q2U is the classic budget podcasting workhorse: a dynamic cardioid mic',
      'The Q2U is the classic budget podcasting pick: a dynamic cardioid mic']);
repP(['El Q2U es el clásico todoterreno del podcasting económico: un micrófono dinámico cardioide',
      'El Q2U es el clásico económico del podcasting: un micrófono dinámico cardioide']);

// best-parlor-guitars sections[2] content_es — parlor todoterreno
repG(['necesitan una parlor todoterreno', 'necesitan una parlor que lo cubre todo']);

// best-practice-amps sections[2] content_es — primer ampli serio todoterreno
repG(['Ideal como primer ampli serio todoterreno', 'Ideal como primer ampli serio y versátil']);

fs.writeFileSync(B + 'data/guides.json', rawG, 'utf8');
fs.writeFileSync(B + 'data/products.json', rawP, 'utf8');
console.log('guides OK: ' + okG + ' | FAIL: ' + failG.length); failG.forEach(f => console.log('  G-FAIL: ' + f.slice(0, 90)));
console.log('products OK: ' + okP + ' | FAIL: ' + failP.length); failP.forEach(f => console.log('  P-FAIL: ' + f.slice(0, 90)));
