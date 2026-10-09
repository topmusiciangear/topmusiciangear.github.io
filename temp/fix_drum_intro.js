const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const guide = g.find(x => x.id === 'best-drum-machine');

guide.intro = "La caja de ritmos adecuada es capaz de transformar una pista plana en un ritmo que te atrapa al instante. En esta guía analizamos las mejores opciones del mercado para directo, producción en estudio y creación de beats — desde la clásica Roland TR-8S hasta la potente Elektron Digitakt II. Cada máquina de esta lista ha sido probada a fondo en condiciones reales de estudio.";
guide.intro_es = guide.intro;

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2) + '\n');
console.log('Done.');
