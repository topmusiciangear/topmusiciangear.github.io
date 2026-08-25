const g = require('./data/guides.json');
const check = ['open-headphones','best-plugins','guitar-bass-amps','live-sound-pa','best-digital-mixers','best-keyboard'];
check.forEach(id => {
  const hub = g.find(x => x.id === id);
  hub.sections.forEach((s,i) => {
    if (!s.content) return;
    const links = s.content.match(/<a href/g);
    const btns = s.content.match(/guide-link-btn/g);
    if (links && !btns) {
      console.log(id, 'section', i, ':', links.length, 'links WITHOUT button class');
    } else if (!links) {
      console.log(id, 'section', i, ': no links at all');
    }
  });
});
