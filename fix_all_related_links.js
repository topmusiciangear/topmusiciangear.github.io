const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));

let totalFixed = 0;

// Fix 1: best-digital-mixers - duplicate best-compact-mixers
{
  const g = guides.find(x => x.id === 'best-digital-mixers');
  if (g && g.sections[0].content) {
    const text = g.sections[0].content;
    const dupLink = ' <a class="guide-link-btn" href="/guides/best-compact-mixers.html">Best compact mixers</a>';
    const firstIdx = text.indexOf(dupLink);
    const secondIdx = text.indexOf(dupLink, firstIdx + 1);
    if (secondIdx >= 0) {
      g.sections[0].content = text.substring(0, secondIdx) + text.substring(secondIdx + dupLink.length);
      totalFixed++;
      console.log('Fixed: best-digital-mixers - removed duplicate best-compact-mixers');
    }
  }
}

// Fix 2: best-electric-guitar - duplicate best-beginner-electric-guitar and best-guitar-home-office
{
  const g = guides.find(x => x.id === 'best-electric-guitar');
  if (g) {
    // Section 0
    if (g.sections[0].content) {
      const text = g.sections[0].content;
      const dupLink = ' <a class="guide-link-btn" href="/guides/best-beginner-electric-guitar.html">Best beginner electric guitar</a>';
      const firstIdx = text.indexOf(dupLink);
      const secondIdx = text.indexOf(dupLink, firstIdx + 1);
      if (secondIdx >= 0) {
        g.sections[0].content = text.substring(0, secondIdx) + text.substring(secondIdx + dupLink.length);
        totalFixed++;
        console.log('Fixed: best-electric-guitar section 0 - removed duplicate best-beginner-electric-guitar');
      }
    }
    // Section 2
    if (g.sections[2] && g.sections[2].content) {
      const text = g.sections[2].content;
      const dupLink = ' <a class="guide-link-btn" href="/guides/best-guitar-home-office.html">Best guitar for home office</a>';
      const firstIdx = text.indexOf(dupLink);
      const secondIdx = text.indexOf(dupLink, firstIdx + 1);
      if (secondIdx >= 0) {
        g.sections[2].content = text.substring(0, secondIdx) + text.substring(secondIdx + dupLink.length);
        totalFixed++;
        console.log('Fixed: best-electric-guitar section 2 - removed duplicate best-guitar-home-office');
      }
    }
    // Spanish versions
    if (g.sections[0].content_es) {
      const text = g.sections[0].content_es;
      const dupLink = ' <a class="guide-link-btn" href="/guides/best-beginner-electric-guitar_es.html">Mejor guitarra eléctrica para principiantes</a>';
      const firstIdx = text.indexOf(dupLink);
      const secondIdx = text.indexOf(dupLink, firstIdx + 1);
      if (secondIdx >= 0) {
        g.sections[0].content_es = text.substring(0, secondIdx) + text.substring(secondIdx + dupLink.length);
        totalFixed++;
        console.log('Fixed: best-electric-guitar ES section 0 - removed duplicate');
      }
    }
    if (g.sections[2] && g.sections[2].content_es) {
      const text = g.sections[2].content_es;
      const dupLink = ' <a class="guide-link-btn" href="/guides/best-guitar-home-office_es.html">Mejor guitarra para home office</a>';
      const firstIdx = text.indexOf(dupLink);
      const secondIdx = text.indexOf(dupLink, firstIdx + 1);
      if (secondIdx >= 0) {
        g.sections[2].content_es = text.substring(0, secondIdx) + text.substring(secondIdx + dupLink.length);
        totalFixed++;
        console.log('Fixed: best-electric-guitar ES section 2 - removed duplicate');
      }
    }
  }
}

// Fix 3: daw-guide - duplicate best-daw-for-beginners (sections 0 and 1)
{
  const g = guides.find(x => x.id === 'daw-guide');
  if (g) {
    ['content', 'content_es'].forEach(field => {
      [0, 1].forEach(si => {
        if (g.sections[si] && g.sections[si][field]) {
          const text = g.sections[si][field];
          // Find the duplicate link text (could be different labels)
          const linkRegex = /<a class="guide-link-btn" href="([^"]*best-daw-for-beginners[^"]*)">([^<]+)<\/a>/g;
          const matches = [];
          let m;
          while ((m = linkRegex.exec(text)) !== null) {
            matches.push({ full: m[0], url: m[1], title: m[2], idx: m.index });
          }
          if (matches.length > 1) {
            // Remove the second occurrence
            const secondMatch = matches[1];
            g.sections[si][field] = text.substring(0, secondMatch.idx) + text.substring(secondMatch.idx + secondMatch.full.length);
            totalFixed++;
            console.log('Fixed: daw-guide ' + field + ' section ' + si + ' - removed duplicate best-daw-for-beginners');
          }
        }
      });
    });
  }
}

// Fix 4: live-sound-pa - duplicate best-pa-speakers
{
  const g = guides.find(x => x.id === 'live-sound-pa');
  if (g && g.sections[0].content) {
    const text = g.sections[0].content;
    const dupLink = ' <a class="guide-link-btn" href="/guides/best-pa-speakers.html">Best PA speakers</a>';
    const firstIdx = text.indexOf(dupLink);
    const secondIdx = text.indexOf(dupLink, firstIdx + 1);
    if (secondIdx >= 0) {
      g.sections[0].content = text.substring(0, secondIdx) + text.substring(secondIdx + dupLink.length);
      totalFixed++;
      console.log('Fixed: live-sound-pa - removed duplicate best-pa-speakers');
    }
  }
  if (g && g.sections[0].content_es) {
    const text = g.sections[0].content_es;
    // Find duplicate
    const linkRegex = /<a class="guide-link-btn" href="([^"]*best-pa-speakers[^"]*)">([^<]+)<\/a>/g;
    const matches = [];
    let m;
    while ((m = linkRegex.exec(text)) !== null) {
      matches.push({ full: m[0], url: m[1], title: m[2], idx: m.index });
    }
    if (matches.length > 1) {
      const secondMatch = matches[1];
      g.sections[0].content_es = text.substring(0, secondMatch.idx) + text.substring(secondMatch.idx + secondMatch.full.length);
      totalFixed++;
      console.log('Fixed: live-sound-pa ES - removed duplicate best-pa-speakers');
    }
  }
}

// Fix 5: portable-interfaces - duplicate best-interface
{
  const g = guides.find(x => x.id === 'portable-interfaces');
  if (g) {
    ['content', 'content_es'].forEach(field => {
      if (g.sections[0] && g.sections[0][field]) {
        const text = g.sections[0][field];
        const linkRegex = /<a class="guide-link-btn" href="([^"]*best-interface[^"]*)">([^<]+)<\/a>/g;
        const matches = [];
        let m;
        while ((m = linkRegex.exec(text)) !== null) {
          matches.push({ full: m[0], url: m[1], title: m[2], idx: m.index });
        }
        if (matches.length > 1) {
          const secondMatch = matches[1];
          g.sections[0][field] = text.substring(0, secondMatch.idx) + text.substring(secondMatch.idx + secondMatch.full.length);
          totalFixed++;
          console.log('Fixed: portable-interfaces ' + field + ' - removed duplicate best-interface');
        }
      }
    });
  }
}

// Fix 6: best-interface - duplicate budget-interfaces (already partially fixed, check if still there)
{
  const g = guides.find(x => x.id === 'best-interface');
  if (g && g.sections[0].content) {
    const text = g.sections[0].content;
    const linkRegex = /<a class="guide-link-btn" href="([^"]*budget-interfaces[^"]*)">([^<]+)<\/a>/g;
    const matches = [];
    let m;
    while ((m = linkRegex.exec(text)) !== null) {
      matches.push({ full: m[0], url: m[1], title: m[2], idx: m.index });
    }
    if (matches.length > 1) {
      const secondMatch = matches[1];
      g.sections[0].content = text.substring(0, secondMatch.idx) + text.substring(secondMatch.idx + secondMatch.full.length);
      totalFixed++;
      console.log('Fixed: best-interface - removed duplicate budget-interfaces');
    }
  }
  if (g && g.sections[0].content_es) {
    const text = g.sections[0].content_es;
    const linkRegex = /<a class="guide-link-btn" href="([^"]*budget-interfaces[^"]*)">([^<]+)<\/a>/g;
    const matches = [];
    let m;
    while ((m = linkRegex.exec(text)) !== null) {
      matches.push({ full: m[0], url: m[1], title: m[2], idx: m.index });
    }
    if (matches.length > 1) {
      const secondMatch = matches[1];
      g.sections[0].content_es = text.substring(0, secondMatch.idx) + text.substring(secondMatch.idx + secondMatch.full.length);
      totalFixed++;
      console.log('Fixed: best-interface ES - removed duplicate budget-interfaces');
    }
  }
}

// Fix Spanish-in-English issues
// daw-guide section 1: Spanish titles in English content
{
  const g = guides.find(x => x.id === 'daw-guide');
  if (g && g.sections[1].content) {
    g.sections[1].content = g.sections[1].content
      .replace('Ableton Live vs FL Studio: ¿cuál es mejor para ti?', 'Ableton Live vs FL Studio: Which Is Better for You?')
      .replace('Pro Tools vs Cubase Pro: grabación y mezcla', 'Pro Tools vs Cubase Pro: Recording and Mixing');
    totalFixed++;
    console.log('Fixed: daw-guide - replaced Spanish titles with English');
  }
}

// open-headphones section 0: Spanish title in English content
{
  const g = guides.find(x => x.id === 'open-headphones');
  if (g && g.sections[0].content) {
    g.sections[0].content = g.sections[0].content.replace(
      'HD 490 Pro vs DT 990 Pro: ¿abiertos para mezclar?',
      'HD 490 Pro vs DT 990 Pro: Open for Mixing?'
    );
    totalFixed++;
    console.log('Fixed: open-headphones - replaced Spanish title with English');
  }
}

// portable-interfaces section 1: Spanish title in English content
{
  const g = guides.find(x => x.id === 'portable-interfaces');
  if (g && g.sections[1].content) {
    g.sections[1].content = g.sections[1].content.replace(
      'Scarlett 2i2 vs UA Volt 2: interfaz económica',
      'Scarlett 2i2 vs UA Volt 2: Budget Interface Pick'
    );
    totalFixed++;
    console.log('Fixed: portable-interfaces - replaced Spanish title with English');
  }
}

fs.writeFileSync('data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('\nTotal fixes applied:', totalFixed);