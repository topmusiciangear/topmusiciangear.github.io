const fs = require('fs');
const path = 'C:/Users/Daniel/projects/topmusiciangear/build-guides.js';
let content = fs.readFileSync(path, 'utf8');

// Verificar si ya existe
if (content.includes('1054:')) {
  console.log('Ya existe entrada 1054 en TEST_SHOP_BTN');
  process.exit(0);
}

// Buscar la línea con 1053 para insertar después
const lines = content.split('\n');
let insertIdx = -1;
for (let i = 0; i < lines.length; i++) {
  if (/^\s*1053:\s*\{/.test(lines[i])) {
    insertIdx = i + 1;
    break;
  }
}

if (insertIdx === -1) {
  console.error('No se encontró la entrada 1053 para insertar después');
  process.exit(1);
}

const newEntry = `  1054: {prices:{andertons:"£540.00",gear4music:"£568.00",musicstore:"€699.00",zzounds:"$899.00"}}`;

// Insertar la nueva entrada
lines.splice(insertIdx, 0, newEntry);
content = lines.join('\n');

fs.writeFileSync(path, content);
console.log('Entrada 1054 agregada a TEST_SHOP_BTN después de 1053');
console.log(newEntry);