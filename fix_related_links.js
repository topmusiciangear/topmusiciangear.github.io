const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const guide = guides.find(g => g.id === 'best-interface');

// Fix English content - replace Spanish titles with English ones and remove duplicate
const oldEn = '<p>For detailed comparisons, see <a class="guide-link-btn" href="/guides/budget-interfaces.html">Best audio interfaces under $300</a> <a class="guide-link-btn" href="/guides/scarlett-vs-ssl.html">Scarlett 2i2 vs SSL 2+: ¿mejores previos para voces en casa?</a> <a class="guide-link-btn" href="/guides/budget-interfaces.html">Best budget interfaces</a> <a class="guide-link-btn" href="/guides/scarlett-vs-volt.html">Scarlett 2i2 vs UA Volt 2 Gen 2: interfaz económica</a> <a class="guide-link-btn" href="/guides/scarlett-vs-ssl.html">Scarlett 2i2 vs SSL 2+: ¿mejores previos para voces en casa?</a></p>';
const newEn = '<p>For detailed comparisons, see <a class="guide-link-btn" href="/guides/budget-interfaces.html">Best audio interfaces under $300</a> <a class="guide-link-btn" href="/guides/scarlett-vs-ssl.html">Scarlett 2i2 vs SSL 2+: Best Preamps for Home Vocals?</a> <a class="guide-link-btn" href="/guides/budget-interfaces.html">Best budget interfaces</a> <a class="guide-link-btn" href="/guides/scarlett-vs-volt.html">Scarlett 2i2 vs UA Volt 2: Budget Interface Pick</a></p>';
if (guide.sections[0].content.includes('¿mejores previos para voces en casa?')) {
  guide.sections[0].content = guide.sections[0].content.replace(oldEn, newEn);
  console.log('Fixed English section 0 content');
} else {
  console.log('English pattern not found, trying partial replace');
  guide.sections[0].content = guide.sections[0].content.replace(/Scarlett 2i2 vs SSL 2\+: ¿mejores previos para voces en casa\?/g, 'Scarlett 2i2 vs SSL 2+: Best Preamps for Home Vocals?');
  guide.sections[0].content = guide.sections[0].content.replace(/Scarlett 2i2 vs UA Volt 2 Gen 2: interfaz económica/g, 'Scarlett 2i2 vs UA Volt 2: Budget Interface Pick');
  // Remove duplicate
  var dupPattern = / <a class="guide-link-btn" href="\/guides\/scarlett-vs-ssl.html">Scarlett 2i2 vs SSL 2\+: Best Preamps for Home Vocals\?<\/a>/g;
  var matches = guide.sections[0].content.match(dupPattern);
  if (matches && matches.length > 1) {
    // Keep only the first occurrence
    var firstIdx = guide.sections[0].content.indexOf(matches[0]);
    var secondIdx = guide.sections[0].content.indexOf(matches[0], firstIdx + 1);
    if (secondIdx >= 0) {
      guide.sections[0].content = guide.sections[0].content.substring(0, secondIdx) + guide.sections[0].content.substring(secondIdx + matches[0].length);
      console.log('Removed duplicate link');
    }
  }
  console.log('Fixed English content (partial)');
}

// Fix Spanish content - remove duplicate
const oldEs = '<p>Para comparativas detalladas, consulta nuestros <a class="guide-link-btn" href="/guides/budget-interfaces_es.html">Mejores interfaces de audio por menos de $300</a> <a class="guide-link-btn" href="/guides/scarlett-vs-ssl_es.html">Scarlett 2i2 vs SSL 2+: ¿mejores previos para voces en casa?</a> <a class="guide-link-btn" href="/guides/budget-interfaces_es.html">Mejores interfaces de audio por menos de $300</a> <a class="guide-link-btn" href="/guides/scarlett-vs-volt_es.html">Scarlett 2i2 vs UA Volt 2 Gen 2: interfaz económica</a> <a class="guide-link-btn" href="/guides/scarlett-vs-ssl_es.html">Scarlett 2i2 vs SSL 2+: ¿mejores previos para voces en casa?</a></p>';
const newEs = '<p>Para comparativas detalladas, consulta nuestros <a class="guide-link-btn" href="/guides/budget-interfaces_es.html">Mejores interfaces de audio por menos de $300</a> <a class="guide-link-btn" href="/guides/scarlett-vs-ssl_es.html">Scarlett 2i2 vs SSL 2+: ¿mejores previos para voces en casa?</a> <a class="guide-link-btn" href="/guides/budget-interfaces_es.html">Mejores interfaces de audio por menos de $300</a> <a class="guide-link-btn" href="/guides/scarlett-vs-volt_es.html">Scarlett 2i2 vs UA Volt 2 Gen 2: interfaz económica</a></p>';
if (guide.sections[0].content_es.includes(oldEs)) {
  guide.sections[0].content_es = guide.sections[0].content_es.replace(oldEs, newEs);
  console.log('Fixed Spanish section 0 content (removed duplicate)');
} else {
  console.log('Spanish pattern not found, trying partial replace');
  // Remove duplicate
  var dupPatternEs = / <a class="guide-link-btn" href="\/guides\/scarlett-vs-ssl_es.html">Scarlett 2i2 vs SSL 2\+: ¿mejores previos para voces en casa\?<\/a>/g;
  var matchesEs = guide.sections[0].content_es.match(dupPatternEs);
  if (matchesEs && matchesEs.length > 1) {
    var firstIdxEs = guide.sections[0].content_es.indexOf(matchesEs[0]);
    var secondIdxEs = guide.sections[0].content_es.indexOf(matchesEs[0], firstIdxEs + 1);
    if (secondIdxEs >= 0) {
      guide.sections[0].content_es = guide.sections[0].content_es.substring(0, secondIdxEs) + guide.sections[0].content_es.substring(secondIdxEs + matchesEs[0].length);
      console.log('Removed duplicate link in Spanish');
    }
  }
}

// Update the guide in the array
const idx = guides.findIndex(g => g.id === 'best-interface');
guides[idx] = guide;
fs.writeFileSync('data/guides.json', JSON.stringify(guides, null, 2), 'utf8');

// Verify
const updated = guides.find(g => g.id === 'best-interface');
console.log('\n=== VERIFICATION ===');
console.log('EN has Spanish title:', updated.sections[0].content.includes('¿mejores previos'));
console.log('EN has Spanish title 2:', updated.sections[0].content.includes('interfaz económica'));
console.log('EN content:', updated.sections[0].content.substring(updated.sections[0].content.indexOf('For detailed'), updated.sections[0].content.indexOf('For detailed') + 300));
console.log('---');
console.log('ES content:', updated.sections[0].content_es.substring(updated.sections[0].content_es.indexOf('Para comparativas'), updated.sections[0].content_es.indexOf('Para comparativas') + 300));