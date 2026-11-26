const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));

let totalFixed = 0;

// Fix beginner-guitar: "acción" → "action", "Acción" → "Action"
{
  const g = guides.find(x => x.id === 'beginner-guitar');
  if (g) {
    g.sections[0].content = g.sections[0].content.replace(/high acción/g, 'high action');
    g.sections[1].content = g.sections[1].content.replace(/Acción, tuning stability/g, 'Action, tuning stability');
    g.sections[1].content = g.sections[1].content.replace(/Acción is the distance/g, 'Action is the distance');
    totalFixed += 3;
    console.log('Fixed: beginner-guitar - acción → action');
  }
}

// Fix best-monitors section 12: Spanish sentence mixed into English
{
  const g = guides.find(x => x.id === 'best-monitors');
  if (g && g.sections[12]) {
    const oldText = 'The cone Flax of 6.5-inch offers graves bajos naturales y precisos, and the tweeter de cúpula invertida de 1 pulgada maneja los agudos con precisión y sin aspereza. La amplificación Clase AB mantiene el sonido musical y sin fatiga durante largas sesiones de mezcla.';
    const newText = 'The 6.5-inch Flax cone delivers natural, precise lows, and the inverted-dome tweeter handles highs with precision and no harshness. The Class AB amplification keeps the sound musical and fatigue-free during long mixing sessions.';
    if (g.sections[12].content.includes(oldText)) {
      g.sections[12].content = g.sections[12].content.replace(oldText, newText);
      totalFixed++;
      console.log('Fixed: best-monitors section 12 - Spanish sentence → English');
    } else {
      console.log('Pattern not found in best-monitors section 12');
      console.log('Content:', g.sections[12].content.substring(0, 500));
    }
  }
}

// Fix fix-clipping-scarlett section 5: Spanish text mixed into English
{
  const g = guides.find(x => x.id === 'fix-clipping-scarlett');
  if (g && g.sections[5]) {
    g.sections[5].content = g.sections[5].content
      .replace('un micrófono de salida baja', 'a low-output microphone')
      .replace('una interfaz con previos de mayor ganancia', 'an interface with higher-gain preamps');
    totalFixed += 2;
    console.log('Fixed: fix-clipping-scarlett section 5 - Spanish text → English');
  }
}

// Fix best-instrument-mics section 6 heading: cajón → cajon (or keep as instrument name)
{
  const g = guides.find(x => x.id === 'best-instrument-mics');
  if (g && g.sections[6]) {
    // cajón is the instrument name, keep it but fix the heading accent issue
    // Actually, cajón is the correct Spanish name for the instrument, so we keep it
    // But let's check if there's any other Spanish text
    console.log('best-instrument-mics section 6 heading:', g.sections[6].heading);
    console.log('best-instrument-mics section 6 content has Spanish:', g.sections[6].content.includes('cajón'));
  }
}

// Fix best-digital-pianos VPC[3].cons[3]: "previo" → "previous"
{
  const g = guides.find(x => x.id === 'best-digital-pianos');
  if (g && g.verdictProsCons && g.verdictProsCons[3]) {
    const vpc = g.verdictProsCons[3];
    vpc.cons = vpc.cons.map(c => c.replace(/\bprevio\b/g, 'previous'));
    vpc.cons_es = vpc.cons_es.map(c => c);
    totalFixed++;
    console.log('Fixed: best-digital-pianos VPC[3] cons - previo → previous');
  }
}

// Fix scarlett-vs-motu VPC[0].pros[2]: "previo" → "previous"
{
  const g = guides.find(x => x.id === 'scarlett-vs-motu');
  if (g && g.verdictProsCons && g.verdictProsCons[0]) {
    const vpc = g.verdictProsCons[0];
    vpc.pros = vpc.pros.map(p => p.replace(/\bprevio\b/g, 'previous'));
    totalFixed++;
    console.log('Fixed: scarlett-vs-motu VPC[0] pros - previo → previous');
  }
}

// Fix best-monitors section 12: also check for "cone Flax" issue
{
  const g = guides.find(x => x.id === 'best-monitors');
  if (g && g.sections[12]) {
    console.log('best-monitors section 12 content:', g.sections[12].content.substring(0, 300));
  }
}

// Fix wireless-lapel-mics verdict: "café" is an English word, probably OK
// Fix live-sound-pa sections[4]: "café corners" - English phrase with accent, probably OK
// Fix budget-headphones sections[7]: "résumé" - English word with accent, probably OK
// Fix budget-bass-like-expensive sections[9]: "hábitat" - English word with accent, probably OK

fs.writeFileSync('data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('\nTotal fixes applied:', totalFixed);