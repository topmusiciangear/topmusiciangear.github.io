const fs = require('fs');
const h = fs.readFileSync('guides/best-hardware-samplers_es.html', 'utf8');
const want = ['20 GB internos (+Drive)', 'RAM de trabajo', 'Conectividad', 'sin ranura para tarjetas', 'RGB sensibles'];
const gone = ['>microSD card<', '>Tarjeta microSD<', 'unas 5 horas lejos de un enchufe'];
want.forEach(k => console.log('WANT ' + k + ': ' + (h.includes(k) ? 'OK' : 'FALTA')));
gone.forEach(k => console.log('GONE ' + k + ': ' + (!h.includes(k) ? 'OK' : 'TODAVIA')));
