const fs = require('fs');
const path = require('path');

const guidesPath = path.join(__dirname, 'data', 'guides.json');
const guides = JSON.parse(fs.readFileSync(guidesPath, 'utf8'));

// ============================================
// 1. PRODUCTS TO MOVE (from hubs to specialized guides)
// ============================================
const productMoves = [
  // Guitars from best-electric-guitar → best-electric-guitars-2026
  { from: 'best-electric-guitar', to: 'best-electric-guitars-2026', products: [317, 318, 319, 320] },
  // Bass from beginner-bass-guitars → best-electric-under-500
  { from: 'beginner-bass-guitars', to: 'best-electric-under-500', products: [326] },
  // Streaming interfaces → stream-controllers
  { from: 'streaming-interfaces', to: 'stream-controllers', products: [239, 240, 327] },
  // UA Volt 276 → best-interface
  { from: 'streaming-interfaces', to: 'best-interface', products: [263] },
  // Rode Procaster → budget-mics (broadcast dynamic mic, $229)
  { from: 'best-mic-for-podcasting', to: 'budget-mics', products: [329] },
];

// Apply product moves
productMoves.forEach(move => {
  const fromGuide = guides.find(g => g.id === move.from);
  const toGuide = guides.find(g => g.id === move.to);
  if (!fromGuide || !toGuide) {
    console.log(`SKIP: ${move.from} → ${move.to} (guide not found)`);
    return;
  }

  // Add products to destination guide sections
  if (toGuide.sections && toGuide.sections.length > 0) {
    // Add to last section (or first if no sections)
    const lastSection = toGuide.sections[toGuide.sections.length - 1];
    if (!lastSection.products) lastSection.products = [];
    move.products.forEach(pid => {
      if (!lastSection.products.includes(pid)) {
        lastSection.products.push(pid);
      }
    });
  }

  // Add to destination featuredProducts
  if (!toGuide.featuredProducts) toGuide.featuredProducts = [];
  move.products.forEach(pid => {
    if (!toGuide.featuredProducts.includes(pid)) {
      toGuide.featuredProducts.push(pid);
    }
  });

  console.log(`MOVED: ${move.from} → ${move.to}: [${move.products}]`);
});

// ============================================
// 2. HUB GUIDES - Remove all products
// ============================================
const hubIds = [
  'best-electric-guitar', 'beginner-guitar', 'beginner-bass-guitars',
  'best-interface', 'portable-interfaces', 'streaming-interfaces',
  'best-monitors', 'best-headphones', 'open-headphones',
  'best-drum-machine', 'best-samplers-drum-computers',
  'best-plugins', 'guitar-bass-amps', 'guitar-pedals',
  'live-sound-pa', 'best-digital-mixers', 'daw-guide',
  'mics-for-creators', 'best-mic-for-podcasting'
];

hubIds.forEach(id => {
  const guide = guides.find(g => g.id === id);
  if (!guide) return;

  // Remove products from all sections
  if (guide.sections) {
    guide.sections.forEach(s => { s.products = []; });
  }

  // Remove featuredProducts
  guide.featuredProducts = [];

  console.log(`CLEANED: ${id} - products removed`);
});

// ============================================
// 3. HUB TITLES - Update to broad hub-style titles
// ============================================
const titleUpdates = {
  'best-electric-guitar': { en: 'Best Electric Guitar: Complete Guide for Every Player (2026)', es: 'Mejor Guitarra Eléctrica: Guía Completa para Cada Jugador (2026)' },
  'beginner-guitar': { en: 'Best Beginner Guitars: Complete Guide to Start Playing (2026)', es: 'Mejores Guitarras para Principiantes: Guía Completa para Empezar a Tocar (2026)' },
  'beginner-bass-guitars': { en: 'Best Beginner Bass Guitars: Complete Guide to Start Playing (2026)', es: 'Mejores Bajos para Principiantes: Guía Completa para Empezar a Tocar (2026)' },
  'best-interface': { en: 'Best Audio Interface: Complete Guide for Home Recording (2026)', es: 'Mejor Interfaz de Audio: Guía Completa para Grabación Casera (2026)' },
  'portable-interfaces': { en: 'Best Portable Audio Interfaces: Complete Guide (2026)', es: 'Mejores Interfaces de Audio Portátiles: Guía Completa (2026)' },
  'streaming-interfaces': { en: 'Best Streaming & Podcast Interfaces: Complete Guide (2026)', es: 'Mejores Interfaces para Streaming y Podcast: Guía Completa (2026)' },
  'best-monitors': { en: 'Best Studio Monitors: Complete Guide for Every Room (2026)', es: 'Mejores Monitores de Estudio: Guía Completa para Cada Sala (2026)' },
  'best-headphones': { en: 'Best Studio Headphones: Complete Guide (2026)', es: 'Mejores Auriculares de Estudio: Guía Completa (2026)' },
  'open-headphones': { en: 'Best Open-Back Headphones: Complete Guide (2026)', es: 'Mejores Auriculares Abiertos: Guía Completa (2026)' },
  'best-drum-machine': { en: 'Best Drum Machines & Grooveboxes: Complete Guide (2026)', es: 'Mejores Cajas de Ritmos y Grooveboxes: Guía Completa (2026)' },
  'best-samplers-drum-computers': { en: 'Best Samplers & Beat Making: Complete Guide (2026)', es: 'Mejores Samplers y Creación de Beats: Guía Completa (2026)' },
  'best-plugins': { en: 'Best Mixing Plugins: Complete Guide (2026)', es: 'Mejores Plugins de Mezcla: Guía Completa (2026)' },
  'guitar-bass-amps': { en: 'Best Guitar & Bass Amplifiers: Complete Guide (2026)', es: 'Mejores Amplificadores de Guitarra y Bajo: Guía Completa (2026)' },
  'guitar-pedals': { en: 'Best Guitar Effects Pedals: Complete Guide (2026)', es: 'Mejores Pedales de Efectos para Guitarra: Guía Completa (2026)' },
  'live-sound-pa': { en: 'Best PA Systems for Live Sound: Complete Guide (2026)', es: 'Mejores Sistemas PA para Sonido en Vivo: Guía Completa (2026)' },
  'best-digital-mixers': { en: 'Best Digital Mixers: Complete Guide (2026)', es: 'Mejores Mezcladores Digitales: Guía Completa (2026)' },
  'daw-guide': { en: 'Best DAW Software: Complete Guide (2026)', es: 'Mejor Software DAW: Guía Completa (2026)' },
  'mics-for-creators': { en: 'Best Microphones for Content Creators: Complete Guide (2026)', es: 'Mejores Micrófonos para Creadores de Contenido: Guía Completa (2026)' },
  'best-mic-for-podcasting': { en: 'Best Podcast Microphones: Complete Guide (2026)', es: 'Mejores Micrófonos para Podcast: Guía Completa (2026)' },
};

Object.entries(titleUpdates).forEach(([id, titles]) => {
  const guide = guides.find(g => g.id === id);
  if (!guide) return;
  guide.title = titles.en;
  guide.title_es = titles.es;
  console.log(`RENAMED: ${id} → ${titles.en}`);
});

// Save
fs.writeFileSync(guidesPath, JSON.stringify(guides, null, 2), 'utf8');
console.log('\nDONE: guides.json updated');
