const fs = require('fs');
const t = JSON.stringify(JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8')).find(x => x.id === 'budget-usb-mics'));
['tienes todo lo que necesitas', 'rechazan el ruido', 'dinámico cardioide', 'rechazan el ruido de la sala', 'than un dinámico', 'offers voz clara', 'than un condensador', 'conserva el micrófono', 'than las funciones', 'is la cómoda', 'and mezcla', 'The cápsula', 'The contrapartida', 'and pierdes', 'of streaming', 'and quieres', 'The Samson Q2U'].forEach(k => {
  const i = t.indexOf(k);
  console.log('### ' + k + ' ###');
  console.log(i > -1 ? JSON.stringify(t.slice(Math.max(0, i - 60), i + 100)) : '(no existe)');
});
