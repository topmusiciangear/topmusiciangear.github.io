const fs = require('fs');
const path = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
let c = fs.readFileSync(path, 'utf8');
let obj = JSON.parse(c);
const g = obj.find(x => x.id === 'best-monitors');

console.log('=== APLICANDO CORRECCIONES EXHAUSTIVAS ===\n');

// 1. ELIMINAR Sección 10 (WS-6.2 subwoofer) - estaba en índice 10
g.sections.splice(10, 1);
console.log('1. Sección WS-6.2 eliminada');

// 2. Corregir Sección 2 (LP-6 V2) - "fue fundada" -> "Kali Audio fue fundada"
g.sections[2].content_es = g.sections[2].content_es.replace(
  '<strong> fue fundada por antiguos ingenieros',
  '<strong>Kali Audio fue fundada por antiguos ingenieros'
);
console.log('2. Sección LP-6 V2: "fue fundada" -> "Kali Audio fue fundada"');

// 3. Corregir Sección 11 (IN-UNF) - ahora índice 10 tras borrar WS-6.2
// "va sobre tu escritorio" -> "se coloca sobre el escritorio"
// "colocan" -> "se sitúan"
g.sections[10].content_es = g.sections[10].content_es
  .replace('va sobre tu escritorio', 'se coloca sobre el escritorio')
  .replace('colocan un medio', 'sitúan un medio')
  .replace('a la altura del oído', 'a la altura de los oídos');
console.log('3. Sección IN-UNF: expresiones informales corregidas');

// 4. Corregir Sección 12 (LP-UNF) - ahora índice 11
// "monitoreo serio" -> "monitoreo profesional"
g.sections[11].content_es = g.sections[11].content_es
  .replace('monitoreo serio', 'monitoreo profesional');
console.log('4. Sección LP-UNF: "monitoreo serio" -> "monitoreo profesional"');

// 5. Corregir Sección 13 (Focal) - ahora índice 12
// "usando en su lugar" -> "empleando en su lugar"
g.sections[12].content_es = g.sections[12].content_es
  .replace('usando en su lugar', 'empleando en su lugar');
console.log('5. Sección Focal: "usando en su lugar" -> "empleando en su lugar"');

// 6. Corregir Conclusion ES
g.conclusion_es = g.conclusion_es
  .replace('sin pensarlo dos veces', 'sin dudarlo')
  .replace('vía GLM AutoCal', 'mediante GLM AutoCal');
console.log('6. Conclusion ES: "sin pensarlo dos veces" -> "sin dudarlo", "vía" -> "mediante"');

// 7. Corregir Verdict ES - "nearfield" -> "campo cercano", "según la colocación" -> "según la posición"
g.verdict_es = g.verdict_es
  .replace(/nearfield/gi, 'campo cercano')
  .replace('según la colocación', 'según la posición');
console.log('7. Verdict ES: "nearfield" -> "campo cercano", "según la colocación" -> "según la posición"');

// 8. Corregir FAQ 2 - duplicado
g.faq[1].a_es = g.faq[1].a_es.replace(
  'con puerto frontal y EQ de sala DSP, así que los',
  'así que los'
);
console.log('8. FAQ 2: duplicado eliminado');

// 9. Corregir FAQ 4 - frase incompleta
g.faq[3].a_es = g.faq[3].a_es.replace(
  'X-ART que reproduce',
  'X-ART que reproduce agudos precisos y sin fatiga'
);
console.log('9. FAQ 4: frase completada');

// 10. Corregir FAQ 5 - "cabe en cualquier sitio" -> "encaja en cualquier espacio"
g.faq[4].a_es = g.faq[4].a_es.replace(
  'cabe en cualquier sitio',
  'encaja en cualquier espacio'
);
console.log('10. FAQ 5: "cabe en cualquier sitio" -> "encaja en cualquier espacio"');

// 11. Corregir FAQ 6 - "nada más sacarlo de la caja" -> "directamente"
g.faq[5].a_es = g.faq[5].a_es.replace(
  'nada más sacarlo de la caja',
  'directamente'
);
console.log('11. FAQ 6: "nada más sacarlo de la caja" -> "directamente"');

// 12. Corregir FAQ 7 - "de salida" -> "de SPL"
g.faq[6].a_es = g.faq[6].a_es.replace(
  'de salida',
  'de SPL'
);
console.log('12. FAQ 7: "de salida" -> "de SPL"');

// Guardar guides.json
fs.writeFileSync(path, JSON.stringify(obj, null, 2));
console.log('guides.json guardado con correcciones');

console.log('\n=== CORRECCIONES EN GUIDES.JSON TERMINADAS ===');