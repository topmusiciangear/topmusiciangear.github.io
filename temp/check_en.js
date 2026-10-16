const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));

// Check EN text for issues
const ids = ['starter-studio', 'zlx-vs-k12', 'apollo-vs-babyface', 'best-mic-for-podcasting', 'pro-headphones', 'best-headphones', 'budget-headphones', 'best-mic-for-guitar-amps', 'open-headphones', 'best-interface', 'studio-furniture', 'budget-monitors', 'best-monitors', 'best-microphone', 'best-condenser-mics', 'best-live-subwoofers', 'budget-mics', 'best-in-ear-monitors', 'best-digital-mixers', 'best-live-sound-mixers'];
ids.forEach(id => {
  const s = g.find(x => x.id === id);
  if (s) {
    // Check conclusion EN for first-person
    const conc = s.conclusion || '';
    const issues = [];
    if (/\bI\b/.test(conc)) issues.push('1st person in conclusion EN');
    if (/\bmy\b/.test(conc)) issues.push('my in conclusion EN');
    if (/\bwe\b/.test(conc)) issues.push('we in conclusion EN');
    if (/\bour\b/.test(conc)) issues.push('our in conclusion EN');
    // Check intro EN
    const intro = s.intro || '';
    if (/\bI\b/.test(intro)) issues.push('1st person in intro EN');
    if (/\bmy\b/.test(intro)) issues.push('my in intro EN');
    if (/\bwe\b/.test(intro)) issues.push('we in intro EN');
    if (/\bour\b/.test(intro)) issues.push('our in intro EN');
    if (issues.length) console.log(id + ': ' + issues.join(', '));
  }
});
