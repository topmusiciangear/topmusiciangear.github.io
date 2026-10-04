const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/beginner-guitar.html', 'utf8');
console.log('sec CN:', h.includes('Fender CN-60S (Nylon): A Closer Look'));
console.log('sec GC1:', h.includes('Takamine GC1 (Nylon): A Closer Look'));
console.log('col GC1:', h.includes('Takamine GC1 (Nylon)</th>'));
console.log('veredicto GC1:', h.includes('>Takamine GC1 (Nylon)<'));
console.log('sin restos Classical col:', !h.includes('Takamine GC1 Classical</th>'));