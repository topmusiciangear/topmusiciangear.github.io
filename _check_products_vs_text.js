const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const p = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

const pname = id => { const x = p.find(y => y.id === id); return x ? x.title : '?'; };

// Extract model numbers and short names that are likely mentioned in text
const getModelPatterns = title => {
  const patterns = [];
  // Get model numbers like "2i2", "SM57", "TR-8S", "MD 421", etc.
  const modelMatch = title.match(/\b([A-Z]{1,4}[\s-]?\d{1,5}[A-Za-z]?)\b/g);
  if (modelMatch) patterns.push(...modelMatch.map(m => m.toLowerCase()));
  
  // Get capitalized words that are likely model names (2+ chars, not common words)
  const common = new Set(['the','and','or','for','with','by','in','on','of','at','to','a','an','is','are','was','were','be','been','being','have','has','had','do','does','did','will','would','could','should','may','might','can','shall','this','that','these','those','it','its','their','they','them','we','our','you','your','my','his','her','us','what','which','who','how','when','where','why','all','each','every','both','few','more','most','other','some','such','no','not','only','own','same','so','than','too','very','just','because','as','until','while','about','between','through','during','before','after','above','below','from','up','down','out','off','over','under','again','further','then','once','here','there','also','any','if','nor','but']);
  
  title.split(/\s+/).forEach(w => {
    if (w.length >= 3 && !common.has(w.toLowerCase()) && /[A-Z]/.test(w[0])) {
      patterns.push(w.toLowerCase());
    }
  });
  
  // Get brand + model combinations
  const brandModel = title.match(/\b(Shure|Rode|Sennheiser|AKG|Audio-Technica|Beyerdynamic|Neumann|Yamaha|Roland|Korg|Boss|Ibanez|Fender|Gibson|PRS|Epiphone|Martin|Taylor|Gretsch|Mackie|QSC|JBL|EV|RCF|Allen|Heath|Midas|Behringer|Focusrite|Universal|MOTU|SSL|Arturia|Akai|Elektron|Moog|Sequential|Line|HeadRush|IK|TC|Electro-Voice|DPA|Coles|Royer|Audix|Austrian|Squier|Sterling|Music|Man|Lewitt|Aston|Elgato|Sire|Hollyland|DJI|FIFINE|Maono|Samson|TONOR|HyperX|Razer|Deity)\s+([A-Z0-9][\w\s-]{1,20})\b/gi);
  if (brandModel) {
    brandModel.forEach(bm => {
      const short = bm.replace(/^(\w+)\s+/, '').trim();
      if (short.length >= 2) patterns.push(short.toLowerCase());
    });
  }
  
  return [...new Set(patterns)];
};

let realIssues = [];

g.forEach(hub => {
  hub.sections.forEach((sec, si) => {
    if (!sec.products || sec.products.length === 0) return;
    const textEN = (sec.textEN || '').toLowerCase();
    const textES = (sec.textES || '').toLowerCase();
    const text = textEN + ' ' + textES;
    
    sec.products.forEach(pid => {
      const name = pname(pid);
      if (name === '?') { realIssues.push(`${hub.id} sec${si}: product ${pid} NOT FOUND in catalog`); return; }
      
      const patterns = getModelPatterns(name);
      const mentioned = patterns.some(p => text.includes(p));
      if (!mentioned) {
        realIssues.push(`${hub.id} sec${si}: "${name}" (${pid}) — NOT mentioned (patterns: ${patterns.slice(0,5).join(', ')})`);
      }
    });
  });
});

console.log('=== REAL ISSUES (products NOT mentioned in text) ===');
realIssues.forEach(i => console.log(i));
console.log(`\nTotal real issues: ${realIssues.length}`);
