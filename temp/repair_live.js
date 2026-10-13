var fs=require('fs');
var BASE='C:/Users/Daniel/projects/topmusiciangear/';
var d=JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));
var g=d.find(function(x){return x.id==='best-live-sound-mixers';});

// 1. fix Tascam section products
g.sections[0].products=[332];

// 2. re-insert chooser section at front
g.sections.unshift({
  heading:'How to Choose the Best Live Sound Mixer?',
  heading_es:'¿Cómo elegir el mejor mezclador de sonido en vivo?',
  content:'<strong>The right mixer depends on the size of your gigs and your need for digital flexibility.</strong> The Yamaha MG16XU is the dependable analog option for bands that need real channel counts. The Behringer X32 Compact is the world\'s most popular digital mixer with 17 motorized faders. The Allen & Heath SQ-5 offers premium build quality and pristine preamps for professional sound reinforcement. Small acoustic sets go Bose T8S ToneMatch, corporate speech goes Yamaha DM3S at 96 kHz, and self-mixed bands go Soundcraft Ui24R rack.',
  content_es:'<strong>El mezclador adecuado depende del tamaño de tus conciertos.</strong> El Yamaha MG16XU es la opción analógica fiable para bandas que necesitan canales de verdad. El Behringer X32 Compact es el digital más popular. El Allen & Heath SQ-5 ofrece calidad premium. Los sets acústicos pequeños van con el Bose T8S ToneMatch, la voz corporativa con el Yamaha DM3S a 96 kHz, y las bandas autogestionadas con el Soundcraft Ui24R en rack.',
  products:[149,332,138,139,145,147,335,658,411,410]
});

// 3. title suffix (EN exact + ES natural)
g.title='Best Live Sound Mixers for Bands & Events (Pros, Cons & Buying Guide 2026)';
g.title_es='Mejores mezcladores de sonido en vivo para bandas y eventos (pros, contras y guía de compra 2026)';

fs.writeFileSync(BASE+'data/guides.json',JSON.stringify(d,null,2));
console.log('repaired: sections='+g.sections.length+' title='+g.title);
