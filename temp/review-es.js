const guides = require('../data/guides.json');
const guide = guides.find((g) => g.id === 'studio-subwoofers-setup');
// Print ES sections 3,4,5 (Focal, 7370A, Barefoot) + EN for comparison
guide.sections.slice(3, 6).forEach((s) => {
  console.log('===== ' + s.heading + ' =====');
  console.log('EN:', s.content);
  console.log('\nES:', s.content_es);
  console.log('\n');
});
