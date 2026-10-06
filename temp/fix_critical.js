const fs = require('fs');

const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const productMap = new Map(products.map(p => [p.id, p]));

let fixed = 0;

products.forEach(p => {
  // 1. Fix NO_THOUSANDS_SEP - add comma to prices > 999
  if (p.price && p.price > 999) {
    const priceStr = p.price.toString();
    if (!priceStr.includes(',')) {
      // This is a data issue - prices in JSON are numbers, formatting happens at render
      // But we should verify the price is reasonable
    }
  }
  
  // 2. Fix ES_TYPO in desc_es - missing accents and literal translations
  if (p.desc_es) {
    let newDesc = p.desc_es;
    const fixes = [
      // Missing accents
      [/\bvia\b/g, 'vía'],
      [/\bgrabacion\b/g, 'grabación'],
      [/\btambien\b/g, 'también'],
      [/\bconexion\b/g, 'conexión'],
      [/\bopcion\b/g, 'opción'],
      [/\binformacion\b/g, 'información'],
      [/\bsolucion\b/g, 'solución'],
      [/\bversion\b(?! ?\d)/g, 'versión'], // not version numbers
      [/\bcondicion\b/g, 'condición'],
      [/\brazon\b/g, 'razón'],
      [/\bfuncion\b/g, 'función'],
      [/\baplicacion\b/g, 'aplicación'],
      [/\bconfiguracion\b/g, 'configuración'],
      [/\bseleccion\b/g, 'selección'],
      [/\bdescripcion\b/g, 'descripción'],
      [/\bcancelacion\b/g, 'cancelación'],
      // Literal translations
      [/\ba un DAW\b/g, 'en un DAW'],
      [/\ba un Mac\b/g, 'en un Mac'],
      [/\ba un iPad\b/g, 'en un iPad'],
      [/\ba un ordenador\b/g, 'en un ordenador'],
      [/\ba un PC\b/g, 'en un PC'],
      [/\bes el mejor para\b/g, 'es ideal para'],
      [/\bes la mejor\b/g, 'es la mejor opción'],
      [/\btiene que\b/g, 'debe'],
      [/\bgratis\b/g, 'gratuito'],
      [/\bbolo\b/g, 'concierto'],
      [/\bbolos\b/g, 'conciertos'],
      [/\brig\b/g, 'sistema'],
      [/\brigs\b/g, 'sistemas'],
      [/\bworkflow\b/g, 'flujo de trabajo'],
      [/\bsetup\b/g, 'configuración'],
      [/\bgear\b/g, 'equipo'],
      [/\bplug-and-play\b/g, 'conectar y usar'],
      [/\bunder \$/gi, 'menos de $'],
      [/\bplug in\b/g, 'conectar'],
      [/\bhook up\b/g, 'conectar'],
      [/\bdeal\b/g, 'oferta'],
      [/\bgame changer\b/g, 'cambio radical'],
      [/\bstands out\b/g, 'destaca'],
      [/\bgo for\b/g, 'elige'],
      [/\bcheck out\b/g, 'revisa'],
      [/\bcome with\b/g, 'incluye'],
      [/\bmiss out\b/g, 'perderte'],
    ];
    
    fixes.forEach(([pattern, replacement]) => {
      newDesc = newDesc.replace(pattern, replacement);
    });
    
    if (newDesc !== p.desc_es) {
      p.desc_es = newDesc;
      fixed++;
    }
  }
  
  // 3. Fix title_es same issues
  if (p.title_es) {
    let newTitle = p.title_es;
    const titleFixes = [
      [/\bvia\b/g, 'vía'],
      [/\bgrabacion\b/g, 'grabación'],
      [/\btambien\b/g, 'también'],
      [/\bconexion\b/g, 'conexión'],
      [/\bopcion\b/g, 'opción'],
      [/\binformacion\b/g, 'información'],
      [/\bsolucion\b/g, 'solución'],
      [/\bversion\b(?! ?\d)/g, 'versión'],
      [/\bcondicion\b/g, 'condición'],
      [/\brazon\b/g, 'razón'],
      [/\bfuncion\b/g, 'función'],
      [/\baplicacion\b/g, 'aplicación'],
      [/\bconfiguracion\b/g, 'configuración'],
      [/\bseleccion\b/g, 'selección'],
      [/\bdescripcion\b/g, 'descripción'],
      [/\bcancelacion\b/g, 'cancelación'],
    ];
    titleFixes.forEach(([pattern, replacement]) => {
      newTitle = newTitle.replace(pattern, replacement);
    });
    if (newTitle !== p.title_es) {
      p.title_es = newTitle;
      fixed++;
    }
  }
  
  // 4. Fix suspicious store URLs - ensure they have proper patterns
  if (p.stores) {
    // Amazon: ensure ASIN format or search
    if (p.stores.amazon && !p.stores.amazon.includes('/dp/') && !p.stores.amazon.includes('/s?k=')) {
      // Could be a search URL which is fine
    }
    // zZounds: should be zzounds.com
    if (p.stores.zzounds && !p.stores.zzounds.includes('zzounds.com')) {
      console.log(`WARNING: zZounds URL for ${p.id} doesn't look right: ${p.stores.zzounds}`);
    }
    // Andertons
    if (p.stores.andertons && !p.stores.andertons.includes('andertons')) {
      console.log(`WARNING: Andertons URL for ${p.id} doesn't look right: ${p.stores.andertons}`);
    }
    // MusicStore
    if (p.stores.musicstore && !p.stores.musicstore.includes('musicstore.com')) {
      console.log(`WARNING: MusicStore URL for ${p.id} doesn't look right: ${p.stores.musicstore}`);
    }
    // Gear4Music
    if (p.stores.gear4music && !p.stores.gear4music.includes('gear4music.com')) {
      console.log(`WARNING: Gear4Music URL for ${p.id} doesn't look right: ${p.stores.gear4music}`);
    }
    // Reverb
    if (p.stores.reverb && !p.stores.reverb.includes('reverb.com')) {
      console.log(`WARNING: Reverb URL for ${p.id} doesn't look right: ${p.stores.reverb}`);
    }
  }
});

fs.writeFileSync('data/products.json', JSON.stringify(products, null, 2));
console.log(`Fixed ${fixed} product description/title fields`);

// Also fix guides.json Spanish literal translations
const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
let guideFixed = 0;

const guideFixes = [
  [/\bvia\b/g, 'vía'],
  [/\bvia USB\b/g, 'vía USB'],
  [/\bvia Bluetooth\b/g, 'vía Bluetooth'],
  [/\ba un DAW\b/g, 'en un DAW'],
  [/\ba un Mac\b/g, 'en un Mac'],
  [/\ba un iPad\b/g, 'en un iPad'],
  [/\ba un ordenador\b/g, 'en un ordenador'],
  [/\ba un PC\b/g, 'en un PC'],
  [/\bes el mejor para\b/g, 'es ideal para'],
  [/\bes la mejor\b/g, 'es la mejor opción'],
  [/\btiene que\b/g, 'debe'],
  [/\bgratis\b/g, 'gratuito'],
  [/\bbolo\b/g, 'concierto'],
  [/\bbolos\b/g, 'conciertos'],
  [/\brig\b/g, 'sistema'],
  [/\brigs\b/g, 'sistemas'],
  [/\bworkflow\b/g, 'flujo de trabajo'],
  [/\bsetup\b/g, 'configuración'],
  [/\bgear\b/g, 'equipo'],
  [/\bplug-and-play\b/g, 'conectar y usar'],
  [/\bunder \$/gi, 'menos de $'],
  [/\bplug in\b/g, 'conectar'],
  [/\bhook up\b/g, 'conectar'],
  [/\bdeal\b/g, 'oferta'],
  [/\bgame changer\b/g, 'cambio radical'],
  [/\bstands out\b/g, 'destaca'],
  [/\bgo for\b/g, 'elige'],
  [/\bcheck out\b/g, 'revisa'],
  [/\bcome with\b/g, 'incluye'],
  [/\bmiss out\b/g, 'perderte'],
];

guides.forEach(g => {
  const fields = ['intro_es', 'conclusion_es', 'verdict_es'];
  fields.forEach(f => {
    if (g[f]) {
      let text = g[f];
      guideFixes.forEach(([pattern, replacement]) => {
        text = text.replace(pattern, replacement);
      });
      if (text !== g[f]) {
        g[f] = text;
        guideFixed++;
      }
    }
  });
  
  // Sections
  (g.sections || []).forEach(s => {
    ['content_es', 'heading_es'].forEach(f => {
      if (s[f]) {
        let text = s[f];
        guideFixes.forEach(([pattern, replacement]) => {
          text = text.replace(pattern, replacement);
        });
        if (text !== s[f]) {
          s[f] = text;
          guideFixed++;
        }
      }
    });
  });
  
  // FAQ in featuredSnippet
  if (g.featuredSnippet) {
    for (let i = 1; i <= 8; i++) {
      const q = `faq_q${i}_es`;
      const a = `faq_a${i}_es`;
      if (g.featuredSnippet[q]) {
        let text = g.featuredSnippet[q];
        guideFixes.forEach(([pattern, replacement]) => {
          text = text.replace(pattern, replacement);
        });
        if (text !== g.featuredSnippet[q]) {
          g.featuredSnippet[q] = text;
          guideFixed++;
        }
      }
      if (g.featuredSnippet[a]) {
        let text = g.featuredSnippet[a];
        guideFixes.forEach(([pattern, replacement]) => {
          text = text.replace(pattern, replacement);
        });
        if (text !== g.featuredSnippet[a]) {
          g.featuredSnippet[a] = text;
          guideFixed++;
        }
      }
    }
  }
  
  // FAQ array
  if (g.faq) {
    g.faq.forEach(f => {
      if (f.q_es) {
        let text = f.q_es;
        guideFixes.forEach(([pattern, replacement]) => {
          text = text.replace(pattern, replacement);
        });
        if (text !== f.q_es) {
          f.q_es = text;
          guideFixed++;
        }
      }
      if (f.a_es) {
        let text = f.a_es;
        guideFixes.forEach(([pattern, replacement]) => {
          text = text.replace(pattern, replacement);
        });
        if (text !== f.a_es) {
          f.a_es = text;
          guideFixed++;
        }
      }
    });
  }
});

fs.writeFileSync('data/guides.json', JSON.stringify(guides, null, 2));
console.log(`Fixed ${guideFixed} guide text fields`);

console.log('\nDone!');