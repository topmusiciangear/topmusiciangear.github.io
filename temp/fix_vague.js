const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));

let replacements = 0;

function replaceVague(text) {
  if (!text) return text;
  let fixed = text;

  // "pristine AD/DA conversion" -> "low-distortion AD/DA conversion"
  if (fixed.includes('pristine AD/DA')) {
    fixed = fixed.replace(/pristine AD\/DA/g, 'low-distortion AD/DA');
    replacements++;
  }

  // "pristine detail" -> "detailed transient response"
  if (fixed.includes('pristine detail')) {
    fixed = fixed.replace(/pristine detail/g, 'detailed transient response');
    replacements++;
  }

  // "pristine dynamics" -> "preserved dynamic range"
  if (fixed.includes('pristine dynamics')) {
    fixed = fixed.replace(/pristine dynamics/g, 'preserved dynamic range');
    replacements++;
  }

  // "pristine studio vocals" -> "low-noise studio vocals"
  if (fixed.includes('pristine studio vocals')) {
    fixed = fixed.replace(/pristine studio vocals/g, 'low-noise studio vocals');
    replacements++;
  }

  // "pristine" standalone -> "clean"
  if (/\bpristine\b/.test(fixed)) {
    fixed = fixed.replace(/\bpristine\b/g, 'clean');
    replacements++;
  }

  // "crystal clear" -> "extended high-frequency clarity"
  if (fixed.includes('crystal-clear')) {
    fixed = fixed.replace(/crystal-clear/g, 'extended high-frequency clarity');
    replacements++;
  }
  if (fixed.includes('crystal clear')) {
    fixed = fixed.replace(/crystal clear/g, 'extended high-frequency clarity');
    replacements++;
  }

  return fixed;
}

guides.forEach(g => {
  (g.sections || []).forEach(s => {
    if (s.content) s.content = replaceVague(s.content);
  });
  if (g.intro) g.intro = replaceVague(g.intro);
  if (g.verdict) g.verdict = replaceVague(g.verdict);
  if (g.conclusion) g.conclusion = replaceVague(g.conclusion);

  (g.verdictProsCons || []).forEach(v => {
    v.pros = v.pros.map(replaceVague);
    v.cons = v.cons.map(replaceVague);
  });
});

fs.writeFileSync(BASE + 'data/guides.json', JSON.stringify(guides, null, 2));
console.log('Reemplazos aplicados:', replacements);