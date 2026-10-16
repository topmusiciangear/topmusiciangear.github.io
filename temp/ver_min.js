const fs = require('fs');
const min = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/css/style.min.css', 'utf8');
const i = min.indexOf('@media(max-width:768px){.guide-link-btn{');
console.log(i > -1 ? min.slice(i, i + 260) : 'BLOQUE NO ENCONTRADO');
