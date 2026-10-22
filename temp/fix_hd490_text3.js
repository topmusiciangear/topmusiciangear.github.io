const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const g = guides.find(x => x.id === 'hd490-pro-vs-dt990');

// Fix section 2 (translation comparison)
g.sections[2].content = g.sections[2].content.replace(
  'and at 130 ohms they reach full level from an interface, unlike the 300-ohm classics.',
  'and at 130 ohms they offer excellent performance on modern studio interfaces, achieving a more direct mix translation than the V-shaped signature of the 250-ohm DT 990 Pro.'
);
g.sections[2].content_es = g.sections[2].content_es.replace(
  'y a 130 ohmios alcanzan su nivel completo desde una interfaz, a diferencia de los clásicos de 300 ohmios.',
  'y a 130 ohmios ofrecen un rendimiento excelente en interfaces modernas de estudio, logrando una traducción de mezcla más directa que la firma en V de los DT 990 Pro de 250 ohmios.'
);

// Fix section 3 (fatigue contradiction)
g.sections[3].content = g.sections[3].content.replace(
  'The Beyerdynamic DT 990 Pro excels for tracking, editing, and long sessions where comfortable velour pads and exciting sound reduce fatigue.',
  'The Beyerdynamic DT 990 Pro excels for tracking, detailed editing, and sessions where its comfortable velour pads offset its intense response.'
);
g.sections[3].content_es = g.sections[3].content_es.replace(
  'Los Beyerdynamic DT 990 Pro sobresalen para grabación, edición y sesiones largas donde las almohadillas de velour cómodas y el sonido emocionante reducen la fatiga.',
  'Los Beyerdynamic DT 990 Pro sobresalen para grabación, edición detallada y sesiones donde sus cómodas almohadillas de velour compensan su intensa respuesta.'
);

fs.writeFileSync('data/guides.json', JSON.stringify(guides, null, 2));
console.log('done');
