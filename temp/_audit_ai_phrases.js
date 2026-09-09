const fs = require('fs');
const t = fs.readFileSync('data/guides.json', 'utf8');
const terms = ['caballo de batalla', 'la máquina de', 'a prueba de balas', 'el santo grial', 'todoterreno', 'sin igual', 'no tiene rival', 'arma definitiva', 'la bestia', 'bestia de', 'monstruo de', 'jugador de élite', 'nivel profesional', 'cambio de juego', 'cambiarlo todo', 'eleva tu', 'lleva tu', 'potencia tu', 'desbloquea', 'imprescindible', 'obligatorio', 'al siguiente nivel', 'benchmark', 'sin complicaciones', 'sin esfuerzo', 'fluido', 'un básico', 'el rey', 'estándar de la industria', 'estándar dorado', 'a otro nivel', 'con clase', 'increíble', 'impresionante', 'asombroso', 'fantástico', 'impresionar'];
function esc(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
terms.forEach(function (tm) {
  const re = new RegExp(esc(tm), 'g');
  let m, n = 0;
  while ((m = re.exec(t)) !== null) n++;
  if (n > 0) console.log(n + '\t' + tm);
});