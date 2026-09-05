const fs = require('fs');
const path = require('path');
const g = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'guides.json'), 'utf8'));

// ── PRODUCTS TO ADD TO HUBS (verified against competition) ──
const hubProducts = {
  'best-electric-guitar':       { 0: [309,310,103,312] },
  'beginner-guitar':            { 0: [309,310,103,313] },
  'beginner-bass-guitars':      { 0: [157,326,159,164] },
  'best-interface':             { 0: [15,54,18,53] },
  'portable-interfaces':        { 0: [15,54,53] },
  'streaming-interfaces':       { 0: [239,240,327] },
  'best-monitors':              { 0: [19,117,116,21] },
  'best-headphones':            { 0: [23,56,25,24] },
  'open-headphones':            { 0: [24,56] },
  'best-drum-machine':          { 0: [33,128,256] },
  'best-samplers-drum-computers': { 0: [127,256,255] },
  'best-plugins':               { 0: [62] },
  'guitar-bass-amps':           { 0: [72,75] },
  'guitar-pedals':              { 0: [] },
  'live-sound-pa':              { 0: [106] },
  'best-digital-mixers':        { 0: [145] },
  'daw-guide':                  { 0: [110,111,112,113] },
  'mics-for-creators':          { 0: [276,292,195] },
  'best-mic-for-podcasting':    { 0: [1,276,197] },
};

Object.entries(hubProducts).forEach(([id, sectionProducts]) => {
  const guide = g.find(x => x.id === id);
  if (!guide) return;
  Object.entries(sectionProducts).forEach(([idx, pids]) => {
    const section = guide.sections[parseInt(idx)];
    if (!section) return;
    if (!section.products) section.products = [];
    pids.forEach(pid => {
      if (!section.products.includes(pid)) section.products.push(pid);
    });
  });
});

// ── BUTTON LINKS FOR EACH HUB ──
const hubButtons = {
  'best-electric-guitar': {
    0: [{href:'/guides/best-beginner-electric-guitar.html',text:'best beginner electric guitars'},{href:'/guides/best-bass-under-700.html',text:'best basses under $700'}],
    1: [{href:'/guides/best-bass-under-700.html',text:'best basses under $700'},{href:'/guides/player-strat-vs-pacifica.html',text:'Player Strat vs Pacifica'}],
    2: [{href:'/guides/pro-guitars.html',text:'professional guitar guide'},{href:'/guides/american-pro-vs-les-paul.html',text:'American Pro II vs Les Paul'}],
    3: [{href:'/guides/best-guitar-home-office.html',text:'best guitars for home recording'}]
  },
  'beginner-guitar': {
    0: [{href:'/guides/best-beginner-electric-guitar.html',text:'best beginner electric guitars'},{href:'/guides/best-acoustic-guitars-for-beginners.html',text:'best beginner acoustic guitars'}],
    1: [{href:'/guides/player-strat-vs-pacifica.html',text:'Player Strat vs Pacifica'}],
    2: [{href:'/guides/acoustic-guitars-guide.html',text:'acoustic guitar guide'}]
  },
  'beginner-bass-guitars': {
    0: [{href:'/guides/best-bass-under-700.html',text:'best basses under $700'},{href:'/guides/precision-vs-jazz.html',text:'Precision vs Jazz bass'},{href:'/guides/fender-bass-guide.html',text:'Fender bass guide'}]
  },
  'best-interface': {
    0: [{href:'/guides/budget-interfaces.html',text:'best budget interfaces'},{href:'/guides/scarlett-vs-volt.html',text:'Scarlett vs Volt'},{href:'/guides/scarlett-vs-ssl.html',text:'Scarlett vs SSL'}],
    1: [{href:'/guides/portable-interfaces.html',text:'best portable interfaces'}],
    2: [{href:'/guides/streaming-interfaces.html',text:'best streaming interfaces'},{href:'/guides/rodecaster-pro2-vs-dlz-creator.html',text:'Rodecaster Pro II vs DLZ Creator'}]
  },
  'portable-interfaces': {
    0: [{href:'/guides/best-interface.html',text:'best audio interfaces'},{href:'/guides/budget-interfaces.html',text:'best budget interfaces'}]
  },
  'streaming-interfaces': {
    0: [{href:'/guides/best-interface.html',text:'best audio interfaces'},{href:'/guides/stream-controllers.html',text:'best stream controllers'}]
  },
  'best-monitors': {
    0: [{href:'/guides/budget-monitors.html',text:'best monitors under $500'},{href:'/guides/best-monitors-for-small-rooms.html',text:'best monitors for small rooms'},{href:'/guides/monitor-setup.html',text:'monitor setup guide'}],
    1: [{href:'/guides/hs8-vs-rokit-7.html',text:'HS8 vs Rokit 7 G5'},{href:'/guides/jbl-vs-kali.html',text:'JBL vs Kali'}],
    2: [{href:'/guides/jbl-vs-kali.html',text:'JBL vs Kali'}],
    4: [{href:'/guides/hs8-vs-rokit-7.html',text:'HS8 vs Rokit 7 G5'}],
    5: [{href:'/guides/adam-vs-genelec.html',text:'Adam A7V vs Genelec 8040B'}],
    7: [{href:'/guides/adam-vs-genelec.html',text:'Adam vs Genelec comparison'},{href:'/guides/atc-vs-genelec.html',text:'ATC vs Genelec'}],
    8: [{href:'/guides/kh750-vs-7050c.html',text:'Neumann KH 750 vs Genelec 7050C subwoofer'}]
  },
  'best-headphones': {
    0: [{href:'/guides/budget-headphones.html',text:'best headphones under $150'},{href:'/guides/best-headphones-for-mixing.html',text:'best headphones for mixing'}],
    1: [{href:'/guides/dt770-vs-dt990.html',text:'DT 770 vs DT 990'},{href:'/guides/m50x-vs-dt770.html',text:'ATH-M50x vs DT 770'}]
  },
  'open-headphones': {
    0: [{href:'/guides/best-headphones-for-mixing.html',text:'best headphones for mixing'},{href:'/guides/hd490-pro-vs-dt990.html',text:'HD 490 Pro vs DT 990'}]
  },
  'best-drum-machine': {
    0: [{href:'/guides/best-grooveboxes.html',text:'best grooveboxes'},{href:'/guides/digitakt-ii-vs-tr8s.html',text:'Digitakt II vs TR-8S'}]
  },
  'best-samplers-drum-computers': {
    0: [{href:'/guides/best-drum-machine.html',text:'best drum machines'},{href:'/guides/best-hardware-samplers.html',text:'best hardware samplers'},{href:'/guides/digitakt-ii-vs-tr8s.html',text:'Digitakt II vs TR-8S'}]
  },
  'best-plugins': {
    0: [{href:'/guides/best-free-plugins.html',text:'best free plugins'},{href:'/guides/soundtoys-vs-khorns.html',text:'Soundtoys vs Khs'},{href:'/guides/valhalla-vs-plates.html',text:'Valhalla vs FabFilter Pro-R'}]
  },
  'guitar-bass-amps': {
    0: [{href:'/guides/best-practice-amps.html',text:'best practice amps'},{href:'/guides/best-bass-amps.html',text:'best bass amps'},{href:'/guides/boss-katana-vs-positive-grid-spark.html',text:'Boss Katana vs Positive Grid Spark'}]
  },
  'guitar-pedals': {
    0: [{href:'/guides/best-overdrive-distortion.html',text:'best overdrive pedals'},{href:'/guides/best-reverb-delay.html',text:'best reverb and delay pedals'},{href:'/guides/best-looper-pedals.html',text:'best looper pedals'}]
  },
  'live-sound-pa': {
    0: [{href:'/guides/best-pa-speakers.html',text:'best PA speakers'},{href:'/guides/best-live-sound-mixers.html',text:'best live sound mixers'},{href:'/guides/active-vs-passive-pa.html',text:'active vs passive PA speakers'}]
  },
  'best-digital-mixers': {
    0: [{href:'/guides/best-live-sound-mixers.html',text:'best live sound mixers'},{href:'/guides/best-compact-mixers.html',text:'best compact mixers'},{href:'/guides/xr18-vs-m32r.html',text:'XR18 vs M32R'}]
  },
  'daw-guide': {
    0: [{href:'/guides/best-daw-for-beginners.html',text:'best DAW for beginners'},{href:'/guides/ableton-vs-logic.html',text:'Ableton vs Logic Pro'}],
    1: [{href:'/guides/ableton-vs-fl-studio.html',text:'Ableton vs FL Studio'},{href:'/guides/pro-tools-vs-cubase.html',text:'Pro Tools vs Cubase'}]
  },
  'mics-for-creators': {
    0: [{href:'/guides/usb-mics.html',text:'best USB microphones'},{href:'/guides/budget-usb-mics.html',text:'best budget USB microphones'}],
    1: [{href:'/guides/best-mic-stands.html',text:'best microphone stands'}]
  },
  'best-mic-for-podcasting': {
    0: [{href:'/guides/best-microphone.html',text:'best microphones guide'},{href:'/guides/usb-mics.html',text:'best USB microphones'},{href:'/guides/best-mic-for-streaming.html',text:'best mic for streaming'}],
    1: [{href:'/guides/multi-host-podcast-setup.html',text:'multi-host podcast setup'},{href:'/guides/best-interface.html',text:'best audio interfaces'}]
  }
};

// Apply buttons to section content
Object.entries(hubButtons).forEach(([id, sectionButtons]) => {
  const guide = g.find(x => x.id === id);
  if (!guide) return;
  Object.entries(sectionButtons).forEach(([idx, links]) => {
    const section = guide.sections[parseInt(idx)];
    if (!section || !section.content) return;
    // Build button HTML
    const btnHtml = links.map(l => `<a class="guide-link-btn" href="${l.href}">${l.text}</a>`).join(' ');
    // Append buttons at end of content, before closing </div> or </p>
    section.content = section.content.replace(/(<\/p>\s*)$/, `${btnHtml}$1`);
    // Also do ES
    if (section.content_es) {
      const btnHtmlEs = links.map(l => `<a class="guide-link-btn" href="${l.href}">${l.text}</a>`).join(' ');
      section.content_es = section.content_es.replace(/(<\/p>\s*)$/, `${btnHtmlEs}$1`);
    }
    console.log('BUTTONS:', id, 'section', idx);
  });
});

fs.writeFileSync(path.join(__dirname, 'data', 'guides.json'), JSON.stringify(g, null, 2), 'utf8');
console.log('\nDONE: Products + Buttons applied');
