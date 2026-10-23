const fs = require('fs');
const path = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
let c = fs.readFileSync(path, 'utf8');
let obj = JSON.parse(c);
const g = obj.find(x => x.id === 'best-monitors');

console.log('=== AUDITORIA PROFUNDA - PROBLEMAS ENCONTRADOS ===');
console.log('');

// 1. Sección 10 (WS-6.2) - DEBE ELIMINARSE
console.log('1. Sección 10 (WS-6.2 subwoofer) - ELIMINAR completamente');
console.log('   Titulo:', g.sections[10].heading_es);
console.log('');

// 2. Sección 2 (LP-6 V2) - 'fue fundada' sin sujeto
console.log('2. Sección 2 (LP-6 V2) - Inicio con minuscula, falta sujeto:');
console.log('   Texto:', g.sections[2].content_es.substring(0, 100));
console.log('');

// 3. Sección 11 (IN-UNF) - 'va sobre tu escritorio', 'colocan'
console.log('3. Sección 11 (IN-UNF) - Expresiones informales:');
console.log('   Texto:', g.sections[11].content_es.substring(0, 150));
console.log('');

// 4. Sección 12 (LP-UNF) - 'monitoreo serio'
console.log('4. Sección 12 (LP-UNF) - "monitoreo serio":');
console.log('   Texto:', g.sections[12].content_es.substring(0, 100));
console.log('');

// 5. Sección 13 (Focal) - 'usando en su lugar' (anglicismo)
console.log('5. Sección 13 (Focal) - "usando en su lugar" (anglicismo):');
console.log('   Texto:', g.sections[13].content_es.substring(0, 120));
console.log('');

// 6. Conclusion ES - 'sin pensarlo dos veces', 'via'
console.log('6. Conclusion ES - informal/anglicismos:');
console.log('   Texto:', g.conclusion_es.substring(0, 150));
console.log('');

// 7. Verdict ES - 'nearfield', 'según la colocación'
console.log('7. Verdict ES - anglicismos:');
console.log('   Buscando "nearfield":', g.verdict_es.includes('nearfield') ? 'SÍ' : 'NO');
console.log('   Buscando "según la colocación":', g.verdict_es.includes('según la colocación') ? 'SÍ' : 'NO');
console.log('');

// 8. FAQ 2 - duplicado
console.log('8. FAQ 2 - Texto duplicado:');
console.log('   Respuesta:', g.faq[1].a_es.substring(0, 200));
console.log('');

// 9. FAQ 4 - frase incompleta
console.log('9. FAQ 4 - Frase incompleta:');
console.log('   Respuesta:', g.faq[3].a_es.substring(0, 200));
console.log('');

// 10. FAQ 5 - 'cabe en cualquier sitio'
console.log('10. FAQ 5 - "cabe en cualquier sitio":');
console.log('   Respuesta:', g.faq[4].a_es.substring(0, 150));