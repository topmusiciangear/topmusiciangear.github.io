const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

// Map guide IDs to their current titles for anchor text
const guideTitles = {};
guides.forEach(g => { guideTitles[g.id] = g.title; });

// Related links for each new guide
const relatedLinks = {
  'best-synth-vsts': [
    { id: 'best-synthesizers', text: 'Best hardware synthesizers for music production' },
    { id: 'pro-synths', text: 'Moog Muse vs Prophet-10 synth duel' },
    { id: 'fabfilter-vs-ozone', text: 'FabFilter vs Ozone: which mixing and mastering suite?' },
    { id: 'mixing-plugins', text: 'Best mixing and mastering plugins' },
  ],
  'best-midi-theory-plugins': [
    { id: 'midi-controllers', text: 'Best DAW control surfaces and MIDI controllers' },
    { id: 'best-synth-vsts', text: 'Best synth VSTs for modern producers' },
    { id: 'beatmaker-plugins', text: 'Best plugins for beatmakers' },
  ],
  'best-piano-keyboard-vsts': [
    { id: 'best-digital-pianos', text: 'Best digital pianos for home and studio' },
    { id: 'best-keyboard', text: 'Best keyboards and MIDI controllers' },
    { id: 'midi-controllers', text: 'Best DAW control surfaces and fader banks' },
  ],
  'best-guitar-plugins': [
    { id: 'best-amp-modelers', text: 'Best amp modelers for guitar' },
    { id: 'guitar-pedals', text: 'Best guitar effects pedals' },
    { id: 'best-multi-effects-pedals', text: 'Best multi-effects pedals for guitar' },
    { id: 'best-overdrive-distortion', text: 'Best overdrive and distortion pedals' },
  ],
  'best-audio-repair-plugins': [
    { id: 'mixing-plugins', text: 'Best mixing and mastering plugins' },
    { id: 'vocal-plugins', text: 'Best vocal plugins: full processing chain' },
    { id: 'ozone-vs-fabfilter', text: 'Ozone vs FabFilter for mastering' },
  ],
  'autotune-vs-melodyne': [
    { id: 'vocal-plugins', text: 'Best vocal plugins: full processing chain' },
    { id: 'best-audio-repair-plugins', text: 'Best audio repair and noise restoration plugins' },
    { id: 'vocalign-vs-revoice-pro', text: 'VocAlign vs Revoice Pro for vocal alignment' },
  ],
  'ozone-vs-fabfilter': [
    { id: 'mixing-plugins', text: 'Best mixing and mastering plugins' },
    { id: 'fabfilter-vs-ozone', text: 'FabFilter vs Ozone: detailed suite comparison' },
    { id: 'best-audio-repair-plugins', text: 'Best audio repair plugins for studios' },
    { id: 'sidechain-modulation-plugins', text: 'Best sidechain and rhythmic modulation plugins' },
  ],
  'vocalign-vs-revoice-pro': [
    { id: 'autotune-vs-melodyne', text: 'Auto-Tune vs Melodyne for pitch correction' },
    { id: 'vocal-plugins', text: 'Best vocal plugins: full processing chain' },
    { id: 'best-audio-repair-plugins', text: 'Best audio repair and restoration plugins' },
  ],
};

// Verify all link targets exist
let errors = 0;
Object.entries(relatedLinks).forEach(([sourceId, links]) => {
  if (!guideTitles[sourceId]) {
    console.log('ERROR: source guide not found: ' + sourceId);
    errors++;
  }
  links.forEach(link => {
    if (!guideTitles[link.id]) {
      console.log('ERROR: target guide not found: ' + link.id + ' (from ' + sourceId + ')');
      errors++;
    }
  });
});

if (errors > 0) {
  console.log('Fix errors before proceeding');
  process.exit(1);
}

// Add related links section to each guide
let updated = 0;
guides.forEach(guide => {
  const links = relatedLinks[guide.id];
  if (!links) return;

  // Build HTML for related links
  const linksHtml = links.map(l =>
    '<a class="guide-related-link" href="/guides/' + l.id + '.html">' + l.text + '</a>'
  ).join('');

  // Insert before the conclusion
  const relatedSection = '<div class="guide-related-links"><h3>' +
    (guide.id.endsWith('_es') ? 'Guías relacionadas' : 'Related Guides') +
    '</h3><div class="guide-related-links-list">' + linksHtml + '</div></div>';

  // For EN guides, insert before conclusion; for ES guides, before conclusion_es
  if (guide.conclusion_es && guide.conclusion) {
    guide.conclusion = relatedSection + guide.conclusion;
    guide.conclusion_es = relatedSection.replace(/Related Guides/, 'Guías relacionadas') + guide.conclusion_es;
  } else if (guide.conclusion) {
    guide.conclusion = relatedSection + guide.conclusion;
  }

  updated++;
  console.log('Added ' + links.length + ' related links to: ' + guide.id);
});

// Sort and write
guides.sort((a, b) => a.id.localeCompare(b.id));
fs.writeFileSync(B + 'data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('\nUpdated ' + updated + ' guides with related links');
