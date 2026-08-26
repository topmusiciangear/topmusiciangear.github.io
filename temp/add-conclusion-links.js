const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));

// Map of guide IDs that need conclusion links + what links to add
// Each entry: { id: [ { slug, textEn, textEs } ] }
const linkMap = {
  'best-electric-guitar': [
    { slug: 'beginner-guitar', textEn: 'beginner guitar guide', textEs: 'guía de guitarra para principiantes' },
    { slug: 'best-beginner-electric-guitar', textEn: 'best electric guitars for beginners', textEs: 'mejores guitarras eléctricas para principiantes' },
    { slug: 'fender-guide', textEn: 'Fender buyer\'s guide', textEs: 'guía de compras Fender' },
    { slug: 'american-pro-vs-les-paul', textEn: 'American Pro II vs Les Paul comparison', textEs: 'comparativa American Pro II vs Les Paul' },
    { slug: 'best-electric-under-500', textEn: 'best guitars under $500', textEs: 'mejores guitarras bajo $500' },
    { slug: 'player-strat-vs-pacifica', textEn: 'Player Strat vs Pacifica', textEs: 'Player Strat vs Pacifica' },
    { slug: 'best-guitar-home-office', textEn: 'guitars for small spaces', textEs: 'guitarras para espacios pequeños' },
  ],
  'beginner-guitar': [
    { slug: 'best-beginner-electric-guitar', textEn: 'best beginner electric guitars', textEs: 'mejores guitarras eléctricas para principiantes' },
    { slug: 'acoustic-guitars-guide', textEn: 'acoustic guitar guide', textEs: 'guía de guitarras acústicas' },
    { slug: 'best-electric-guitar', textEn: 'best electric guitars', textEs: 'mejores guitarras eléctricas' },
    { slug: 'player-strat-vs-pacifica', textEn: 'Player Strat vs Pacifica', textEs: 'Player Strat vs Pacifica' },
  ],
  'best-interface': [
    { slug: 'budget-interfaces', textEn: 'best interfaces under $300', textEs: 'mejores interfaces bajo $300' },
    { slug: 'portable-interfaces', textEn: 'best portable interfaces', textEs: 'mejores interfaces portátiles' },
    { slug: 'streaming-interfaces', textEn: 'best interfaces for streaming', textEs: 'mejores interfaces para streaming' },
    { slug: 'scarlett-vs-ssl', textEn: 'Scarlett vs SSL comparison', textEs: 'comparativa Scarlett vs SSL' },
    { slug: 'starter-studio', textEn: 'home studio starter kit', textEs: 'kit de inicio para estudio casero' },
  ],
  'daw-guide': [
    { slug: 'best-daw-for-beginners', textEn: 'best DAWs for beginners', textEs: 'mejores DAWs para principiantes' },
    { slug: 'ableton-vs-fl-studio', textEn: 'Ableton vs FL Studio', textEs: 'Ableton vs FL Studio' },
    { slug: 'ableton-vs-logic', textEn: 'Ableton vs Logic Pro', textEs: 'Ableton vs Logic Pro' },
    { slug: 'pro-tools-vs-cubase', textEn: 'Pro Tools vs Cubase', textEs: 'Pro Tools vs Cubase' },
  ],
  'best-digital-mixers': [
    { slug: 'best-live-sound-mixers', textEn: 'best live sound mixers', textEs: 'mejores mezcladoras para sonido en vivo' },
    { slug: 'best-compact-mixers', textEn: 'best compact mixers', textEs: 'mejores mezcladoras compactas' },
    { slug: 'xr18-vs-m32r', textEn: 'XR18 vs M32R comparison', textEs: 'comparativa XR18 vs M32R' },
    { slug: 'pro-mixers', textEn: 'professional mixer comparison', textEs: 'comparativa de mezcladoras profesionales' },
  ],
  'guitar-bass-amps': [
    { slug: 'best-practice-amps', textEn: 'best practice amps', textEs: 'mejores amplificadores de práctica' },
    { slug: 'best-bass-amps', textEn: 'best bass amps', textEs: 'mejores amplificadores de bajo' },
    { slug: 'best-electric-under-500', textEn: 'best guitars under $500', textEs: 'mejores guitarras bajo $500' },
    { slug: 'blues-junior-vs-ac30', textEn: 'Blues Junior vs AC30', textEs: 'Blues Junior vs AC30' },
    { slug: 'katana-vs-dsl', textEn: 'Katana vs DSL', textEs: 'Katana vs DSL' },
  ],
  'guitar-pedals': [
    { slug: 'best-overdrive-distortion', textEn: 'best overdrive & distortion pedals', textEs: 'mejores pedales de overdrive y distorsión' },
    { slug: 'best-reverb-delay', textEn: 'best reverb & delay pedals', textEs: 'mejores pedales de reverb y delay' },
    { slug: 'best-looper-pedals', textEn: 'best looper pedals', textEs: 'mejores pedales looper' },
    { slug: 'best-multi-effects-pedals', textEn: 'best multi-effects pedals', textEs: 'mejores pedales multi-efectos' },
    { slug: 'ts9-vs-bd2', textEn: 'TS9 vs BD-2', textEs: 'TS9 vs BD-2' },
  ],
  'best-plugins': [
    { slug: 'pro-plugins', textEn: 'pro plugins guide', textEs: 'guía de plugins profesionales' },
    { slug: 'mixing-plugins', textEn: 'best mixing plugins', textEs: 'mejores plugins de mezcla' },
    { slug: 'vocal-plugins', textEn: 'best vocal plugins', textEs: 'mejores plugins para vocales' },
    { slug: 'fabfilter-vs-ozone', textEn: 'FabFilter vs Ozone', textEs: 'FabFilter vs Ozone' },
  ],
  'best-mic-for-podcasting': [
    { slug: 'best-microphone', textEn: 'best microphones guide', textEs: 'guía de mejores micrófonos' },
    { slug: 'usb-mics', textEn: 'best USB microphones', textEs: 'mejores micrófonos USB' },
    { slug: 'mics-for-creators', textEn: 'best mics for content creators', textEs: 'mejores micrófonos para creadores de contenido' },
    { slug: 'best-interface', textEn: 'best audio interfaces', textEs: 'mejores interfaces de audio' },
  ],
  'beginner-bass-guitars': [
    { slug: 'precision-vs-jazz', textEn: 'P-Bass vs J-Bass comparison', textEs: 'comparativa P-Bass vs J-Bass' },
    { slug: 'fender-bass-guide', textEn: 'Fender bass guide', textEs: 'guía de bajos Fender' },
    { slug: 'budget-bass-like-expensive', textEn: 'budget basses that sound premium', textEs: 'bajos económicos que suenan premium' },
    { slug: 'best-electric-under-500', textEn: 'best basses under $500', textEs: 'mejores bajos bajo $500' },
  ],
  'budget-mics': [
    { slug: 'best-microphone', textEn: 'best microphones guide', textEs: 'guía de mejores micrófonos' },
    { slug: 'best-mic-for-podcasting', textEn: 'best podcast microphones', textEs: 'mejores micrófonos para podcasts' },
    { slug: 'usb-mics', textEn: 'best USB microphones', textEs: 'mejores micrófonos USB' },
    { slug: 'budget-usb-mics', textEn: 'best budget USB mics', textEs: 'mejores micrófonos USB económicos' },
  ],
  'mics-for-creators': [
    { slug: 'best-microphone', textEn: 'best microphones guide', textEs: 'guía de mejores micrófonos' },
    { slug: 'usb-mics', textEn: 'best USB microphones', textEs: 'mejores micrófonos USB' },
    { slug: 'best-mic-for-podcasting', textEn: 'best podcast microphones', textEs: 'mejores micrófonos para podcasts' },
  ],
  'live-sound-pa': [
    { slug: 'best-pa-speakers', textEn: 'best PA speakers', textEs: 'mejores bafles PA' },
    { slug: 'best-live-sound-mixers', textEn: 'best live sound mixers', textEs: 'mejores mezcladoras para sonido en vivo' },
    { slug: 'active-vs-passive-pa', textEn: 'active vs passive PA', textEs: 'PA activo vs pasivo' },
    { slug: 'best-live-subwoofers', textEn: 'best live subwoofers', textEs: 'mejores subwoofers en vivo' },
  ],
  'studio-subwoofers': [
    { slug: 'best-monitors', textEn: 'best studio monitors', textEs: 'mejores monitores de estudio' },
    { slug: 'monitor-setup', textEn: 'monitor setup guide', textEs: 'guía de setup de monitores' },
    { slug: 'budget-monitors', textEn: 'best monitors under $500', textEs: 'mejores monitores bajo $500' },
  ],
  'blx288-vs-ewd': [
    { slug: 'stage-wireless', textEn: 'best wireless mic systems', textEs: 'mejores sistemas de micrófonos inalámbricos' },
    { slug: 'stage-mics', textEn: 'best stage microphones', textEs: 'mejores micrófonos de escenario' },
    { slug: 'best-microphone', textEn: 'best studio microphones', textEs: 'mejores micrófonos de estudio' },
  ],
};

let changes = 0;

Object.keys(linkMap).forEach(guideId => {
  const guide = guides.find(g => g.id === guideId);
  if (!guide) { console.log(guideId + ': NOT FOUND'); return; }

  const links = linkMap[guideId];

  // Build link HTML snippets
  const linkHtmlEn = links.map(l =>
    `<a href="/guides/${l.slug}.html" class="guide-link-btn">${l.textEn}</a>`
  ).join(', ');

  const linkHtmlEs = links.map(l =>
    `<a href="/guides/${l.slug}_es.html" class="guide-link-btn">${l.textEs}</a>`
  ).join(', ');

  // Add to EN conclusion
  if (guide.conclusion && !guide.conclusion.includes('guide-link-btn')) {
    // Find a natural insertion point - look for the last sentence or paragraph
    // Append links at the end of conclusion
    guide.conclusion = guide.conclusion.trimEnd() + '\n\n' + linkHtmlEn;
    changes++;
    console.log(guideId + ': EN conclusion links added (' + links.length + ' links)');
  }

  // Add to ES conclusion
  if (guide.conclusion_es && !guide.conclusion_es.includes('guide-link-btn')) {
    guide.conclusion_es = guide.conclusion_es.trimEnd() + '\n\n' + linkHtmlEs;
    changes++;
    console.log(guideId + ': ES conclusion links added (' + links.length + ' links)');
  }
});

console.log('\nTotal changes: ' + changes);
fs.writeFileSync('data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
