var fs = require('fs');
var p = 'data/guides.json';
var d = JSON.parse(fs.readFileSync(p, 'utf8'));

// Comprehensive Spanish naturalization
function fixSpanish(text) {
  if (!text || typeof text !== 'string') return text;
  
  var result = text;
  
  // Missing tildes (accents) - most common
  var accents = [
    ['grabacion', 'grabación'],
    ['opcion', 'opción'],
    ['configuracion', 'configuración'],
    ['aplicacion', 'aplicación'],
    ['seleccion', 'selección'],
    ['razon', 'razón'],
    ['condicion', 'condición'],
    ['solucion', 'solución'],
    ['tambien', 'también'],
    ['conexion', 'conexión'],
    ['microfono', 'micrófono'],
    ['version', 'versión'],
    ['cancelacion', 'cancelación'],
    ['informacion', 'información'],
    ['descripcion', 'descripción'],
    ['funcion', 'función'],
    ['analisis', 'análisis'],
    ['estudio', 'estudio'], // already correct
    ['musica', 'música'],
    ['musico', 'músico'],
    ['practica', 'práctica'],
    ['tecnica', 'técnica'],
    ['generico', 'genérico'],
    ['especifico', 'específico'],
    ['publico', 'público'],
    ['politica', 'política'],
    ['critica', 'crítica'],
    ['otica', 'ótica'],
    ['acustico', 'acústico'],
    ['electrico', 'eléctrico'],
    ['electronico', 'electrónico'],
    ['digital', 'digital'], // already correct
    ['manual', 'manual'], // already correct
    ['automatico', 'automático'],
    ['sistemico', 'sistémico'],
    ['organico', 'orgánico'],
    ['logico', 'lógico'],
    ['simbolico', 'simbólico'],
    ['economico', 'económico'],
    ['periodico', 'periódico'],
    ['medico', 'médico'],
    ['clinico', 'clínico'],
    ['historico', 'histórico'],
    ['artistic', 'artístico'],
    ['realistico', 'realista'], // already correct
    ['optimico', 'óptico'],
    ['geometrico', 'geométrico'],
    ['teorico', 'teórico'],
    ['practico', 'práctico'],
    ['critico', 'crítico'],
    ['topico', 'tópico'],
    ['topico', 'tópico'],
    ['exotico', 'exótico'],
    ['explicito', 'explícito'],
    ['implicito', 'implícito'],
    ['explicito', 'explícito'],
    ['explicito', 'explícito'],
  ];
  
  accents.forEach(function(pair) {
    var re = new RegExp('\\b' + pair[0] + '\\b', 'gi');
    result = result.replace(re, pair[1]);
  });
  
  // Unnatural literal translations
  var unnatural = [
    ['\\bpunto justo\\b', 'punto ideal'],
    ['\\bvia\\b', 'vía'],
    ['\\bes el mejor para\\b', 'es ideal para'],
    ['\\batras\\b', 'atrás'],
    ['\\bcaballos de batalla\\b', 'referentes'],
    ['\\bgrabar a un\\b', 'grabar en un'],
    ['\\bvia USB\\b', 'vía USB'],
    ['\\bvia MIDI\\b', 'vía MIDI'],
    ['\\bgrabar a un DAW\\b', 'grabar en un DAW'],
    ['\\bgrabar a un ordenador\\b', 'grabar en un ordenador'],
  ];
  
  unnatural.forEach(function(pair) {
    var re = new RegExp(pair[0], 'gi');
    result = result.replace(re, pair[1]);
  });
  
  return result;
}

function processObject(obj) {
  if (typeof obj === 'string') {
    return fixSpanish(obj);
  }
  if (Array.isArray(obj)) {
    return obj.map(processObject);
  }
  if (obj && typeof obj === 'object') {
    var out = {};
    for (var k in obj) {
      out[k] = processObject(obj[k]);
    }
    return out;
  }
  return obj;
}

var fixed = processObject(d);
fs.writeFileSync(p, JSON.stringify(fixed, null, 2));
console.log('Comprehensive Spanish fix applied');