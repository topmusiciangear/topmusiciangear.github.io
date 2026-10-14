const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));

let highEnd = 0;
let studioGrade = 0;

function replaceHighEnd(text) {
  if (!text) return text;
  let fixed = text;
  if (fixed.includes('high-end monitor')) {
    fixed = fixed.replace(/high-end monitor/g, 'reference monitor');
    highEnd++;
  }
  if (fixed.includes('high-end reverb')) {
    fixed = fixed.replace(/high-end reverb/g, 'flagship reverb');
    highEnd++;
  }
  if (fixed.includes('high-end standalone')) {
    fixed = fixed.replace(/high-end standalone/g, 'standalone');
    highEnd++;
  }
  if (fixed.includes('high-end 8000')) {
    fixed = fixed.replace(/high-end 8000/g, '8000');
    highEnd++;
  }
  if (fixed.includes('high-end roll-off')) {
    fixed = fixed.replace(/high-end roll-off/g, 'smooth high-frequency roll-off');
    highEnd++;
  }
  // generic "high-end" -> remove or replace with "premium"
  if (/\bhigh-end\b/.test(fixed)) {
    fixed = fixed.replace(/\bhigh-end\b/g, 'premium');
    highEnd++;
  }
  return fixed;
}

function replaceStudioGrade(text) {
  if (!text) return text;
  let fixed = text;
  if (fixed.includes('studio-grade condenser')) {
    fixed = fixed.replace(/studio-grade condenser/g, 'studio-quality condenser');
    studioGrade++;
  }
  if (fixed.includes('studio-grade XLR')) {
    fixed = fixed.replace(/studio-grade XLR/g, 'balanced XLR');
    studioGrade++;
  }
  if (fixed.includes('studio-grade stereo')) {
    fixed = fixed.replace(/studio-grade stereo/g, 'stereo');
    studioGrade++;
  }
  if (fixed.includes('studio-grade control')) {
    fixed = fixed.replace(/studio-grade control/g, 'detailed control');
    studioGrade++;
  }
  if (fixed.includes('studio-grade mixing')) {
    fixed = fixed.replace(/studio-grade mixing/g, 'professional mixing');
    studioGrade++;
  }
  if (fixed.includes('studio-grade output')) {
    fixed = fixed.replace(/studio-grade output/g, 'professional output');
    studioGrade++;
  }
  if (fixed.includes('studio-grade reliability')) {
    fixed = fixed.replace(/studio-grade reliability/g, 'professional reliability');
    studioGrade++;
  }
  // generic "studio-grade" -> "studio-quality"
  if (/\bstudio-grade\b/.test(fixed)) {
    fixed = fixed.replace(/\bstudio-grade\b/g, 'studio-quality');
    studioGrade++;
  }
  return fixed;
}

guides.forEach(g => {
  (g.sections || []).forEach(s => {
    if (s.content) s.content = replaceStudioGrade(replaceHighEnd(s.content));
  });
  if (g.intro) g.intro = replaceStudioGrade(replaceHighEnd(g.intro));
  if (g.verdict) g.verdict = replaceStudioGrade(replaceHighEnd(g.verdict));
  if (g.conclusion) g.conclusion = replaceStudioGrade(replaceHighEnd(g.conclusion));

  (g.verdictProsCons || []).forEach(v => {
    v.pros = v.pros.map(t => replaceStudioGrade(replaceHighEnd(t)));
    v.cons = v.cons.map(t => replaceStudioGrade(replaceHighEnd(t)));
  });
});

fs.writeFileSync(BASE + 'data/guides.json', JSON.stringify(guides, null, 2));
console.log('high-end reemplazados:', highEnd);
console.log('studio-grade reemplazados:', studioGrade);