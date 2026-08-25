const g = require('./data/guides.json');
const hubIds = ['best-electric-guitar','beginner-guitar','beginner-bass-guitars','best-interface','portable-interfaces','streaming-interfaces','best-monitors','best-headphones','open-headphones','best-drum-machine','best-samplers-drum-computers','best-plugins','guitar-bass-amps','guitar-pedals','live-sound-pa','best-digital-mixers','daw-guide','mics-for-creators','best-mic-for-podcasting','best-keyboard'];

hubIds.forEach(id => {
  const hub = g.find(x => x.id === id);
  const issues = [];
  
  // Check intro
  if (hub.intro && hub.intro_es) {
    if (hub.intro === hub.intro_es) issues.push('intro: SAME as EN');
  } else if (hub.intro && !hub.intro_es) {
    issues.push('intro: NO ES translation');
  }
  
  // Check conclusion
  if (hub.conclusion && hub.conclusion_es) {
    if (hub.conclusion === hub.conclusion_es) issues.push('conclusion: SAME as EN');
  } else if (hub.conclusion && !hub.conclusion_es) {
    issues.push('conclusion: NO ES translation');
  }
  
  // Check sections
  hub.sections.forEach((s, i) => {
    if (s.heading && s.heading_es) {
      if (s.heading === s.heading_es) issues.push('section ' + i + ' heading: SAME as EN');
    } else if (s.heading && !s.heading_es) {
      issues.push('section ' + i + ' heading: NO ES');
    }
    
    if (s.content && s.content_es) {
      if (s.content === s.content_es) issues.push('section ' + i + ' content: SAME as EN');
    } else if (s.content && !s.content_es) {
      issues.push('section ' + i + ' content: NO ES');
    }
  });
  
  // Check productTable
  if (hub.productTable) {
    if (hub.productTable.title && hub.productTable.title_es) {
      if (hub.productTable.title === hub.productTable.title_es) issues.push('productTable title: SAME as EN');
    }
    if (hub.productTable.columns) {
      hub.productTable.columns.forEach((col, ci) => {
        if (col.title && col.title_es && col.title === col.title_es) {
          issues.push('productTable col ' + ci + ': SAME as EN');
        }
      });
    }
    if (hub.productTable.rows) {
      hub.productTable.rows.forEach((row, ri) => {
        if (row.label && row.label_es && row.label === row.label_es) {
          issues.push('productTable row ' + ri + ': SAME as EN');
        }
      });
    }
  }
  
  if (issues.length > 0) {
    console.log('=== ' + id + ' ===');
    issues.forEach(i => console.log('  ' + i));
  }
});
