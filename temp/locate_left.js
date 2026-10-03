const G = require('../data/guides.json');
const w = G.find(x => x.id === 'wireless-intercom-systems');
const rep = (obj, path) => {
  Object.keys(obj).forEach(k => {
    const v = obj[k];
    if (typeof v === 'string' && v.indexOf('inalámbrico real') > -1 && !/_es$/.test(k)) console.log('ENFIELD', path + '.' + k);
    if (Array.isArray(v)) v.forEach((x, i) => { if (typeof x === 'string' && x.indexOf('inalámbrico real') > -1) console.log('ENARR', path + '.' + k + '[' + i + ']'); else if (x && typeof x === 'object') rep(x, path + '.' + k + '[' + i + ']'); });
  });
};
rep(w, 'wireless');
const dm = G.find(x => x.id === 'best-drum-machine');
const rep2 = (obj, path) => {
  Object.keys(obj).forEach(k => {
    const v = obj[k];
    if (typeof v === 'string' && v.indexOf('beatmaking') > -1) console.log('drum', path + '.' + k + ' isES=' + /_es$/.test(k));
  });
};
rep2(dm, 'drum');