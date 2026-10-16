const fs = require('fs');
const t = JSON.stringify(JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8')).find(x => x.id === 'monitor-setup'));
['Forma primero', 'Saca los monitores', 'El trato honesto.', 'La contrapartida.', 'traducción es una cadena', 'Levanta cualquiera', 'Después mide:', 'territorio solo-SAM', 'hierro pesado'].forEach(k => {
  const i = t.indexOf(k);
  console.log('### ' + k + ' ###');
  console.log(i > -1 ? JSON.stringify(t.slice(Math.max(0, i - 70), i + 90)) : '(no existe)');
});
