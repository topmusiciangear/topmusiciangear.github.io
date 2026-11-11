const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guidesPath = B + 'data/guides.json';
const productsPath = B + 'data/products.json';
const guides = JSON.parse(fs.readFileSync(guidesPath, 'utf8'));
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
const mode = process.argv[2] || 'audit';

function cap(v, orig) {
  if (orig && orig[0] && orig[0] === orig[0].toUpperCase() && orig[0] !== orig[0].toLowerCase()) {
    return v.charAt(0).toUpperCase() + v.slice(1);
  }
  return v;
}

const FIXES = [
  { n: 'punto dulce', re: /punto dulce/gi, to: 'punto ideal' },
  { n: 'cereza del pastel', re: /la cereza del pastel/gi, to: 'la guinda del pastel' },
  { n: 'en conclusion,', re: /en conclusión,/gi, to: 'en definitiva,' },
  { n: 'es importante +verbo', re: /es importante (señalar|destacar|mencionar|recordar)/gi, to: 'conviene $1' },
  { n: 'cuando se trata de', re: /cuando se trata de/gi, to: 'a la hora de' },
  { n: 'lo que es mas,', re: /lo que es más,/gi, to: 'además,' },
  { n: 'genuinamente', re: /genuinamente/gi, to: 'realmente' },
  { n: 'sumérgete', re: /sumérgete/gi, to: 'adéntrate' },
  { n: 'sumergirse', re: /sumergirse/gi, to: 'adentrarse' },
  { n: 'la razon es porque', re: /la razón es porque/gi, to: 'la razón es que' },
  { n: 'muy único', re: /muy único/gi, to: 'único' },
  { n: 'un solo perilla', re: /un solo perilla/gi, to: 'una sola perilla' },
  { n: 'a solo un clic de distancia', re: /a solo un clic de distancia/gi, to: 'a un solo clic' },
  { n: 'entrega resultados', re: /entrega resultados/gi, to: 'ofrece resultados' },
  { n: 'cambia las reglas del juego', re: /cambia las reglas del juego/gi, to: 'marca un antes y un después' },
  { n: 'huelga decir', re: /huelga decir/gi, to: 'no hace falta decir' },
  { n: 'dicho eso', re: /dicho eso/gi, to: 'dicho esto' },
  { n: '¿Que', re: /¿que /gi, to: '¿qué ' },
  { n: '¿Como', re: /¿como /gi, to: '¿cómo ' },
  { n: '¿Cuando', re: /¿cuando /gi, to: '¿cuándo ' },
  { n: 'por que?', re: /por que\?/gi, to: 'por qué?' },
  { n: 'el más óptimo', re: /el más óptimo/gi, to: 'óptimo' },
  { n: 'más preferido', re: /más preferido/gi, to: 'preferido' },
  { n: 'fonemas duros', re: /fonemas duros/gi, to: 'sonidos duros' },
  { n: 'el material fuente', re: /el material fuente/gi, to: 'la fuente' },
  { n: 'curva de aprendizaje es real', re: /la curva de aprendizaje es real/gi, to: 'la curva de aprendizaje es considerable' },
  { n: 'basado de', re: /basado de\b/gi, to: 'basado en' },
  { n: 'Redución (typo)', re: /Redución/g, to: 'Reducción' },
  { n: 'une la brecha', re: /une la brecha/gi, to: 'cierra la brecha' },
  { n: 'mantiene fluyendo las ideas', re: /mantiene fluyendo las ideas/gi, to: 'mantiene las ideas fluyendo' },
  { n: 'elimina del problema', re: /elimina del problema/gi, to: 'elimina el problema' },
  { n: 'un caballo de batalla', re: /un caballo de batalla/gi, to: 'una herramienta de trabajo' },
  { n: 'el caballo de batalla', re: /el caballo de batalla/gi, to: 'la herramienta de trabajo' },
  { n: 'los caballos de batalla', re: /los caballos de batalla/gi, to: 'las herramientas de trabajo' },
  { n: 'caballos de batalla', re: /caballos de batalla/gi, to: 'herramientas de trabajo' },
  { n: 'con presupuesto (calco on a budget)', re: /con presupuesto\b(?! (mínimo|de|ajustado|limitado|amplio|holgado|grande|alto|definido|extra|suficiente))/gi, to: 'con poco presupuesto' },
  { n: 'Ozone es impulsado por IA', re: /es impulsado por IA y todo en uno/gi, to: 'apuesta por la IA y el formato todo en uno' },
  { n: 'impulsado por IA (marketing)', re: /impulsado por IA/gi, to: 'con IA' },
  { n: 'impulsado por redes neuronales', re: /impulsado por redes neuronales/gi, to: 'basado en redes neuronales' },
  { n: 'sin fisuras (subwoofer)', re: /para combinarla sin fisuras con cualquier top/gi, to: 'para combinarla a la perfección con cualquier top' },
  { n: 'sin fisuras (compresor)', re: /de forma invisible y sin fisuras/gi, to: 'de forma invisible y fluida' },
  { n: 'sin fisuras (UI)', re: /interfaz de ventana única sin fisuras/gi, to: 'interfaz de ventana única sin complicaciones' },
  { n: 'por tu dinero', re: /por tu dinero/gi, to: 'por el precio' },
  { n: 'sweet spot EN en campo ES', re: /sweet spot/gi, to: 'punto ideal' },
  { n: 'in-your-face EN', re: /in-your-face/gi, to: 'frontal' },
  { n: 'vale cada centavo de la prima', re: /vale cada centavo de la prima/gi, to: 'compensa de sobra la prima' },
  { n: 'prueba del tiempo', re: /ha resistido la prueba del tiempo/gi, to: 'ha sabido mantenerse vigente' },
  { n: 'mas sin tilde', re: /\bmas\b/g, to: 'más' },
  { n: 'disruptor (desc producto)', re: /El disruptor absoluto de la industria para la restauración de ruido/gi, to: 'Rompe el molde de la restauración de ruido' },
  { n: 'disruptor (sección)', re: /es el disruptor absoluto de la industria para la restauración de ruido/gi, to: 'rompe el molde de la restauración de ruido' }
];

const ACCENT_MAP = {
  dialogos: 'diálogos', sesion: 'sesión', musica: 'música', practica: 'práctica',
  tecnica: 'técnica', facil: 'fácil', dificil: 'difícil', ademas: 'además',
  dia: 'día', estan: 'están', grabacion: 'grabación', tambien: 'también',
  conexion: 'conexión', opcion: 'opción', informacion: 'información',
  solucion: 'solución', condicion: 'condición', razon: 'razón', funcion: 'función',
  aplicacion: 'aplicación', configuracion: 'configuración', seleccion: 'selección',
  descripcion: 'descripción', microfono: 'micrófono', microfonos: 'micrófonos',
  cancelacion: 'cancelación', produccion: 'producción', cancion: 'canción',
  reflexion: 'reflexión', compresion: 'compresión', saturacion: 'saturación',
  limitacion: 'limitación', reverberacion: 'reverberación', atenuacion: 'atenuación',
  amplificacion: 'amplificación', precision: 'precisión', percusion: 'percusión',
  presion: 'presión', tension: 'tensión', emocion: 'emoción', decision: 'decisión'
};
const accentRe = new RegExp('\\b(' + Object.keys(ACCENT_MAP).join('|') + ')\\b', 'g');
FIXES.push({
  n: 'acentos faltantes',
  re: accentRe,
  to: function (m, w) { return cap(ACCENT_MAP[w.toLowerCase()], m); },
  fn: true
});
FIXES.push({ n: 'espacios dobles', re: /(\S) {2,}/g, to: '$1 ' });
FIXES.push({ n: 'espacio antes de coma/punto y coma', re: / +([,;])/g, to: '$1' });

const FLAGS = [
  ['no busques más', /\bno busques más\b/gi],
  ['al final del día', /\bal final del día\b/gi],
  ['nivel de entrada', /\bnivel de entrada\b/gi],
  ['en última instancia', /\ben última instancia\b/gi],
  ['decisión informada', /\bdecisiones? informadas?\b/gi],
  ['tu viaje', /\btu viaje\b/gi],
  ['eleva/desbloquea/libera/potencia tu', /\b(eleva|desbloquea|libera|potencia) tu\b/gi],
  ['el cielo es el límite', /\bel cielo es el límite\b/gi],
  ['cambio/cambia el juego', /\b(cambio de juego|cambia el juego|un cambio de juego)\b/gi],
  ['empaca', /\bempaca\b|\bempacado\b/gi],
  ['por tu dinero', /\bpor tu dinero\b/gi],
  ['vale cada centavo', /\b(vale cada centavo|vale la pena cada centavo)\b/gi],
  ['testimonio/testamento de', /\b(testimonio de|testamento de)\b/gi],
  ['sin mencionar', /\b(sin mencionar|por no mencionar)\b/gi],
  ['la parte emocionante / aquí está / aquí es donde', /\b(la parte (más )?(emocionante|divertida)|aquí está la mejor parte|aquí es donde)\b/gi],
  ['en términos simples/sencillos', /\ben términos (simples|sencillos)\b/gi],
  ['revoluciona*', /\brevoluciona\w*\b/gi],
  ['prueba del tiempo', /\bprueba del tiempo\b/gi],
  ['mezcla perfecta / equilibrio perfecto', /\b(mezcla perfecta de|equilibrio perfecto entre)\b/gi],
  ['un must / must-have', /\b(un must|must-have)\b/gi],
  ['siendo dicho / con esto dicho / habiendo dicho esto', /\b(siendo dicho|con esto dicho|habiendo dicho esto)\b/gi],
  ['mas sin tilde', /\bmas\b/g],
  ['disruptor', /\bdisruptor\w*\b/gi],
  ['masivo', /\bmasiv[oa]\b/gi],
  ['increíblemente', /\bincreíblemente\b/gi],
  ['absolutamente', /\babsolutamente\b/gi],
  ['definitivamente', /\bdefinitivamente\b/gi],
  ['aprovechar al máximo', /\baprovechar al máximo\b/gi],
  ['más a menudo', /\bmás a menudo\b/gi],
  ['no solo ... sino (patrón AI)', /\bno solo\b/gi],
  ['EN leftover: you/your/it\'s', /\b(you|your|it's)\b/i],
  ['EN leftover: seamless', /\bseamless\b/i],
  ['EN leftover: game changer', /\bgame changer\b/i],
  ['EN leftover: sweet spot', /\bsweet spot\b/i],
  ['EN leftover: look no further', /\blook no further\b/i],
  ['EN leftover: next level', /\bnext level\b/i],
  ['EN leftover: worth every penny', /\bworth every penny\b/i],
  ['EN leftover: at the end of the day', /\bat the end of the day\b/i]
];

function walkES(obj, path, out) {
  if (Array.isArray(obj)) { obj.forEach(function (v, i) { walkES(v, path + '[' + i + ']', out); }); return; }
  if (obj && typeof obj === 'object') {
    for (const k of Object.keys(obj)) {
      if (/_es$/.test(k)) {
        const v = obj[k];
        if (typeof v === 'string') out.push({ loc: path + '.' + k, text: v });
        else if (Array.isArray(v)) v.forEach(function (s, i) { if (typeof s === 'string') out.push({ loc: path + '.' + k + '[' + i + ']', text: s }); });
      } else walkES(obj[k], path + '.' + k, out);
    }
  }
}

const fields = [];
guides.forEach(function (g) { walkES(g, 'guide:' + g.id, fields); });
walkES(products, 'products', fields);
console.log('Campos _es escaneados: ' + fields.length + ' (guías + products.json)\n');

// AUDIT
const fixCounts = {};
const flagCounts = {};
const flagExamples = {};
fields.forEach(function (f) {
  FIXES.forEach(function (fx) {
    if (mode === 'fix') return;
    const m = f.text.match(fx.re);
    if (m) { fixCounts[fx.n] = (fixCounts[fx.n] || 0) + m.length; }
  });
  FLAGS.forEach(function (fg) {
    const re = new RegExp(fg[1].source, fg[1].flags.includes('g') ? fg[1].flags : fg[1].flags + 'g');
    const m = f.text.match(re);
    if (m) {
      flagCounts[fg[0]] = (flagCounts[fg[0]] || 0) + m.length;
      if (!flagExamples[fg[0]]) flagExamples[fg[0]] = [];
      if (flagExamples[fg[0]].length < 3) flagExamples[fg[0]].push(f.loc + ' :: ' + f.text.slice(Math.max(0, f.text.search(re) - 40), f.text.search(re) + 70).replace(/\s+/g, ' '));
    }
  });
});

if (mode === 'audit') {
  console.log('=== CALCOS/AI con FIX automático disponible (candidatos a corregir) ===');
  Object.entries(fixCounts).sort(function (a, b) { return b[1] - a[1]; }).forEach(function (e) { console.log('  ' + String(e[1]).padStart(4) + '  ' + e[0]); });
  console.log('\n=== PATRONES FLAGGADOS (revisión manual) ===');
  Object.entries(flagCounts).sort(function (a, b) { return b[1] - a[1]; }).forEach(function (e) {
    console.log('  ' + String(e[1]).padStart(4) + '  ' + e[0]);
    (flagExamples[e[0]] || []).forEach(function (x) { console.log('         ' + x.slice(0, 160)); });
  });
}

// FIX
if (mode === 'fix') {
  let changedFields = 0;
  let totalReps = 0;
  const perFix = {};
  function applyFixes(text) {
    let t = text;
    FIXES.forEach(function (fx) {
      const before = t;
      t = t.replace(fx.re, function () {
        const args = Array.prototype.slice.call(arguments);
        let rep;
        if (typeof fx.to === 'function') rep = fx.to.apply(null, args);
        else rep = fx.to.replace(/\$(\d)/g, function (_, d) { return args[+d] || ''; });
        if (typeof fx.to !== 'function') rep = cap(rep, args[0]);
        return rep;
      });
      if (t !== before) { perFix[fx.n] = (perFix[fx.n] || 0) + 1; }
    });
    return t;
  }
  function fixDeep(obj) {
    if (Array.isArray(obj)) { obj.forEach(function (v) { fixDeep(v); }); return; }
    if (obj && typeof obj === 'object') {
      for (const k of Object.keys(obj)) {
        if (/_es$/.test(k)) {
          const v = obj[k];
          if (typeof v === 'string') {
            const nv = applyFixes(v);
            if (nv !== v) { obj[k] = nv; changedFields++; }
          } else if (Array.isArray(v)) {
            v.forEach(function (s, i) {
              if (typeof s === 'string') {
                const nv = applyFixes(s);
                if (nv !== s) { v[i] = nv; changedFields++; }
              }
            });
          }
        } else fixDeep(obj[k]);
      }
    }
  }
  guides.forEach(function (g) { fixDeep(g); });
  fixDeep(products);
  fs.writeFileSync(guidesPath, JSON.stringify(guides, null, 2), 'utf8');
  fs.writeFileSync(productsPath, JSON.stringify(products, null, 2), 'utf8');
  console.log('Campos _es modificados: ' + changedFields);
  Object.entries(perFix).forEach(function (e) { console.log('  ' + e[0] + ': ' + e[1] + ' campo(s)'); });
}
console.log('done');