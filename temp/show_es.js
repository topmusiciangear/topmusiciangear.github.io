const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
const SEC = { 'best-reverb-delay': 0, 'budget-monitors': 4, 'best-condenser-mics': 2, 'usb-mics': 3, 'best-microphone': 0, 'm50x-vs-mdr7506': 1, 'best-amp-modelers': 1 };
for (const [gid, i] of Object.entries(SEC)) {
  const g = guides.find(x => x.id === gid);
  const s = g.sections[i];
  const es = s.content_es || s.content_es_ || '';
  console.log('\n############ ' + gid + '  seccion ' + i);
  console.log('EN> ' + (s.content || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').slice(-420));
  console.log('\nES> ' + es.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').slice(-420));
}
// otros 3 defectos
console.log('\n\n=============== OTROS DEFECTOS EN LAS MISMAS CADENAS ===============');
const bus = guides.find(x => x.id === 'best-microphone');
const b1 = (bus.sections[0].content || '').match(/<p>[^<]*Jump to[\s\S]{0,160}/);
console.log('\nbest-microphone > ' + (b1 ? b1[0].replace(/\s+/g,' ') : 'no'));
const bm = guides.find(x => x.id === 'budget-monitors');
console.log('\nbudget-monitors > ' + (bm.sections[4].content || '').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').slice(0, 260));
const am = guides.find(x => x.id === 'best-amp-modelers');
const vs = (am.sections[1].content || '').match(/[^.]*vía[^.]*\./);
console.log('\nbest-amp-modelers > ' + (vs ? vs[0].trim() : 'no'));
console.log('   ES equivalente > ' + ((am.sections[1].content_es || '').match(/[^.]*MIDI[^.]*TRS[^.]*\./) || ['no'])[0]);