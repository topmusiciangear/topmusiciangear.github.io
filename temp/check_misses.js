const G = require('../data/guides.json');
const show = (id, pat) => {
  const s = JSON.stringify(G.find(x => x.id === id));
  let i = -1;
  while ((i = s.indexOf(pat, i + 1)) > -1) console.log(id + ': ...' + s.slice(Math.max(0, i - 70), i + 70).replace(/\s+/g, ' '));
};
console.log('--- drum-machine beatmaking/creación ---');
show('best-drum-machine', 'beatmaking');
show('best-drum-machine', 'creación de beats');
console.log('--- wireless true-wireless remaining ---');
show('wireless-intercom-systems', 'true-wireless');
show('wireless-intercom-systems', 'inalámbrico real');
console.log('--- daw-guide De pago ---');
show('daw-guide', 'De pago único');
console.log('--- open-headphones ---');
show('open-headphones', 'Los ATH-R70x');
show('open-headphones', 'los HD 560S');
console.log('--- budget-headphones ---');
show('budget-headphones', 'los más precisos de los seis');