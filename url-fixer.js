const fs = require('fs');

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function generateMusikSlugs(title) {
  const base = slugify(title);
  const slugs = [base];
  const seen = new Set([base]);

  function add(s) {
    if (!seen.has(s)) { seen.add(s); slugs.push(s); }
  }

  const parts = title.split(' ');
  const last = parts[parts.length - 1];
  const secondLast = parts.length > 1 ? parts[parts.length - 2] : '';

  // Try without MkII/MkIII/G5/II/III suffix
  if (/^(mk\d+|g\d+|v\d+)$/i.test(last)) {
    add(slugify(parts.slice(0, -1).join(' ')));
  }

  // Try without roman numerals (II, III, IV, V)
  if (/^(II|III|IV|V|VI)$/i.test(last)) {
    const withoutRoman = parts.slice(0, -1).join(' ');
    add(slugify(withoutRoman));
    // Also try with "2" or "3" instead
    const numMap = { II: '2', III: '3', IV: '4', V: '5', VI: '6' };
    add(slugify(parts.slice(0, -1).join(' ') + ' ' + (numMap[last.toUpperCase()] || '')));
  }

  // Try without common suffixes
  const stripped = parts.filter(w => 
    !/bundle|edition|ultimate|collection|total|series|pro|suite|advanced/i.test(w) && w.length > 1
  );
  if (stripped.length < parts.length && stripped.length >= 2) {
    add(slugify(stripped.join(' ')));
  }

  // Try without version numbers entirely
  const noNums = parts.filter(w => 
    !/^[vm]\d+$/i.test(w) && !/^\d+(th|st|nd|rd)?$/i.test(w) && 
    !/^\d+\.\d+$/i.test(w) && !/^g\d+$/i.test(w) && 
    !/^(mk|gen|v)\d+$/i.test(w) && w.length > 1
  );
  if (noNums.length < parts.length && noNums.length >= 2) {
    add(slugify(noNums.join(' ')));
  }

  // Add number-only alternative for some products
  // e.g., "Audio-Technica ATH-M50x" -> "audio-technica-ath-m50x"
  // Also try "beyerdynamic-dt-990-pro" without ohm variant
  const m = title.match(/\d+/g);
  if (m) {
    // Try without model number (keep brand + type words)
    const withoutModel = parts.filter(w => !/\d/.test(w) && w.length > 1);
    if (withoutModel.length >= 2) {
      add(slugify(withoutModel.join(' ')));
    }
  }

  return slugs;
}

(async () => {
  const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

  // MusikProduktiv
  console.log('=== Trying MusikProduktiv candidate URLs ===');
  const musikProducts = products.filter(p =>
    p.stores.musikproduktiv === 'https://www.musik-produktiv.de/search'
  );
  console.log(`Products to check: ${musikProducts.length}`);

  let found = 0;
  let notFound = 0;
  const results = [];

  for (let i = 0; i < musikProducts.length; i++) {
    const p = musikProducts[i];
    const slugs = generateMusikSlugs(p.title);
    let urlFound = false;
    
    for (const slug of slugs) {
      const url = `https://www.musik-produktiv.de/${slug}.html`;
      try {
        const res = await fetch(url, {
          headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
        });
        if (res.status === 200) {
          const html = await res.text();
          const title = html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1] || '';
          if (!title.includes('404') && !title.includes('Not Found') && html.includes('product')) {
            console.log(`✅ [${p.id}] ${p.title.substring(0, 40).padEnd(40)} ${url}`);
            console.log(`   Page: ${title.substring(0, 60)}`);
            p.stores.musikproduktiv = url;
            found++;
            urlFound = true;
            results.push({ id: p.id, title: p.title, url, status: 'found' });
            break;
          }
        }
      } catch(e) {
        // continue
      }
      await new Promise(r => setTimeout(r, 100));
    }
    
    if (!urlFound) {
      console.log(`❌ [${p.id}] ${p.title.substring(0, 50)}`);
      results.push({ id: p.id, title: p.title, url: null, status: 'not_found' });
      notFound++;
    }
    
    if ((i + 1) % 20 === 0) {
      console.log(`--- Progress: ${i + 1}/${musikProducts.length} (found ${found}) ---`);
    }
    await new Promise(r => setTimeout(r, 200));
  }
  
  console.log(`\n✅ MusikProduktiv Found: ${found}/${musikProducts.length}`);
  console.log(`❌ Not found: ${notFound}`);

  // Bax Music
  console.log('\n=== Trying Bax Music candidate URLs ===');
  
  // First, get existing patterns to build category mappings
  const existingBax = products.filter(p => p.stores.baxmusic && !p.stores.baxmusic.includes('keyword'));
  console.log(`Existing Bax URLs: ${existingBax.length}`);

  // Build category->slug mapping from existing URLs  
  const baxCategoryMap = {};
  existingBax.forEach(p => {
    const url = p.stores.baxmusic;
    const m = url.match(/bax-shop\.co\.uk\/([^/]+)\/([^/]+)/);
    if (m) {
      const category = m[1];
      const productSlug = m[2];
      baxCategoryMap[p.title.toLowerCase()] = { category, slug: productSlug };
    }
  });

  function generateBaxCategory(title, brand, category) {
    // Map product categories to Bax Music URL categories
    const catMap = {
      'microphones': { condensor: 'large-diaphragm-condenser-microphones', dynamic: 'dynamic-microphones', vocal: 'dynamic-vocal-microphones', instrument: 'dynamic-instrument-microphones', wireless: 'wireless-microphone-systems' },
      'interfaces': 'external-audio-interfaces',
      'monitors': 'studio-monitor',
      'headphones': 'studio-headphones',
      'guitars': { electric: 'electric-guitars', acoustic: 'acoustic-guitars', bass: 'electric-bass-guitars' },
      'amps': { guitar: 'guitar-amp', bass: 'bass-amp' },
      'synths': 'synthesizer',
      'midi': 'midi-studio-controllers',
      'plugins': 'instrument-plugins',
      'pedals': 'guitar-effect-pedals',
      'stands': 'mic-stand',
      'accessories': 'studio-accessories',
    };
    return catMap[category] || brand?.toLowerCase() || 'complete-assortment';
  }

  function generateBaxSlug(title) {
    return title
      .toLowerCase()
      .replace(/['']/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/[''']/g, '')
      .replace(/[\s-]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  const baxProducts = products.filter(p =>
    !p.stores.baxmusic || p.stores.baxmusic === ''
  );
  console.log(`Products missing Bax URLs: ${baxProducts.length}`);

  let baxFound = 0;
  let baxNotFound = 0;

  for (let i = 0; i < baxProducts.length; i++) {
    const p = baxProducts[i];
    const slug = generateBaxSlug(p.title);
    const brand = p.brand?.toLowerCase() || '';
    const cat = p.category || '';
    
    // Try multiple category guesses
    let categories = [];
    
    // Determine likely category on Bax
    if (cat === 'microphones' || p.title.toLowerCase().includes('microphone') || p.title.toLowerCase().includes('mic')) {
      if (p.title.toLowerCase().includes('wireless') || p.title.toLowerCase().includes('blx') || p.title.toLowerCase().includes('ew ') || p.title.toLowerCase().includes('ulxd') || p.title.toLowerCase().includes('xsw') || p.title.toLowerCase().includes('wms')) {
        categories = ['wireless-microphone-systems'];
      } else if (p.title.toLowerCase().includes('sm7') || p.title.toLowerCase().includes('re20') || p.title.toLowerCase().includes('sm58')) {
        categories = ['dynamic-vocal-microphones', 'dynamic-microphones'];
      } else if (p.title.toLowerCase().includes('sm57')) {
        categories = ['dynamic-instrument-microphones', 'dynamic-microphones'];
      } else {
        categories = ['large-diaphragm-condenser-microphones', 'condenser-microphones', 'studio-microphones'];
      }
    } else if (cat === 'interfaces' || p.title.toLowerCase().includes('interface')) {
      categories = ['external-audio-interfaces', 'audio-interfaces', 'usb-audio-interfaces'];
    } else if (cat === 'monitors' || (p.title.toLowerCase().includes('monitor') && !p.title.toLowerCase().includes('headphone') && !p.title.toLowerCase().includes('in-ear'))) {
      categories = ['studio-monitor', 'active-monitor', 'nearfield-monitor'];
    } else if (cat === 'headphones' || p.title.toLowerCase().includes('headphone') || p.title.toLowerCase().includes('hd 600') || p.title.toLowerCase().includes('dt 770') || p.title.toLowerCase().includes('mdr-') || p.title.toLowerCase().includes('ath-m') || p.title.toLowerCase().includes('k371')) {
      categories = ['studio-headphones', 'headphone', 'hifi-headphones'];
    } else if (cat === 'guitars' || p.title.toLowerCase().includes('guitar') || p.title.toLowerCase().includes('stratocaster') || p.title.toLowerCase().includes('telecaster') || p.title.toLowerCase().includes('les paul') || p.title.toLowerCase().includes('dreadnought')) {
      if (p.title.toLowerCase().includes('bass') || p.title.toLowerCase().includes('precision') || p.title.toLowerCase().includes('jazz bass') || p.title.toLowerCase().includes('rumble')) {
        categories = ['electric-bass-guitars', 'bass-guitars'];
      } else if (p.title.toLowerCase().includes('acoustic') || p.title.toLowerCase().includes('fg800') || p.title.toLowerCase().includes('d-28') || p.title.toLowerCase().includes('314ce')) {
        categories = ['acoustic-guitars', 'acoustic-electric-guitars'];
      } else {
        categories = ['electric-guitars', 'solid-body-electric-guitars'];
      }
    } else if (cat === 'amps' || p.title.toLowerCase().includes('amp') || p.title.toLowerCase().includes('amplifier') || p.title.toLowerCase().includes('katana') || p.title.toLowerCase().includes('blues jr') || p.title.toLowerCase().includes('dsl') || p.title.toLowerCase().includes('ac30')) {
      if (p.title.toLowerCase().includes('bass') || p.title.toLowerCase().includes('portaflex') || p.title.toLowerCase().includes('rumble')) {
        categories = ['bass-amp', 'bass-guitar-amp'];
      } else {
        categories = ['guitar-amp', 'combo-amp', 'guitar-combo-amp'];
      }
    } else if (cat === 'synths' || p.title.toLowerCase().includes('synth') || p.title.toLowerCase().includes('nord stage') || p.title.toLowerCase().includes('montage') || p.title.toLowerCase().includes('tr-8') || p.title.toLowerCase().includes('mpc')) {
      categories = ['synthesizer', 'workstation-keyboard', 'drum-machine'];
    } else if (cat === 'midi' || p.title.toLowerCase().includes('keylab') || p.title.toLowerCase().includes('komplete kontrol') || p.title.toLowerCase().includes('uf8') || p.title.toLowerCase().includes('controller')) {
      categories = ['midi-studio-controllers', 'midi-keyboard', 'midi-controller'];
    } else if (cat === 'plugins' || cat === 'software' || p.title.toLowerCase().includes('kontakt') || p.title.toLowerCase().includes('ableton') || p.title.toLowerCase().includes('fl studio') || p.title.toLowerCase().includes('pro tools') || p.title.toLowerCase().includes('cubase') || p.title.toLowerCase().includes('studio one') || p.title.toLowerCase().includes('waves') || p.title.toLowerCase().includes('ozone') || p.title.toLowerCase().includes('rx ') || p.title.toLowerCase().includes('melodyne') || p.title.toLowerCase().includes('soundtoys') || p.title.toLowerCase().includes('fabfilter') || p.title.toLowerCase().includes('uad ultimate') || p.title.toLowerCase().includes('komplete')) {
      categories = ['instrument-plugins', 'software', 'music-production-software', 'daw'];
    } else if (cat === 'pedals' || p.title.toLowerCase().includes('pedal') || p.title.toLowerCase().includes('wah') || p.title.toLowerCase().includes('overdrive') || p.title.toLowerCase().includes('delay') || p.title.toLowerCase().includes('tuner') || p.title.toLowerCase().includes('reverb') || p.title.toLowerCase().includes('hall of fame') || p.title.toLowerCase().includes('small stone') || p.title.toLowerCase().includes('cry baby') || p.title.toLowerCase().includes('tube screamer')) {
      categories = ['guitar-effect-pedals', 'effect-pedals', 'stompbox'];
    } else if (cat === 'stands' || p.title.toLowerCase().includes('stand') || p.title.toLowerCase().includes('k&m') || p.title.toLowerCase().includes('mic stand')) {
      categories = ['mic-stand', 'speaker-stand', 'keyboard-stand', 'studio-stands'];
    } else if (cat === 'accessories' || p.title.toLowerCase().includes('case') || p.title.toLowerCase().includes('bag') || p.title.toLowerCase().includes('pop filter') || p.title.toLowerCase().includes('gator') || p.title.toLowerCase().includes('stedman')) {
      categories = ['studio-accessories', 'cases-and-bags', 'keyboard-case'];
    } else {
      categories = ['complete-assortment'];
    }

    let urlFound = false;
    for (const category of categories) {
      if (urlFound) break;
      const url = `https://www.bax-shop.co.uk/${category}/${slug}`;
      try {
        const res = await fetch(url, {
          headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
        });
        if (res.status === 200) {
          const html = await res.text();
          const title = html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1] || '';
          if (!title.includes('404') && html.includes('product') && !html.includes('Sorry, no results')) {
            console.log(`✅ [${p.id}] ${p.title.substring(0, 40).padEnd(40)} ${url}`);
            console.log(`   Page: ${title.substring(0, 60)}`);
            p.stores.baxmusic = url;
            baxFound++;
            urlFound = true;
            results.push({ id: p.id, title: p.title, url, status: 'bax_found' });
          }
        }
      } catch(e) {
        // continue
      }
      await new Promise(r => setTimeout(r, 100));
    }
    
    if (!urlFound) {
      console.log(`❌ [${p.id}] ${p.title.substring(0, 50)}`);
      results.push({ id: p.id, title: p.title, url: null, status: 'bax_not_found' });
      baxNotFound++;
    }
    
    if ((i + 1) % 15 === 0) {
      console.log(`--- Bax Progress: ${i + 1}/${baxProducts.length} (found ${baxFound}) ---`);
    }
    await new Promise(r => setTimeout(r, 200));
  }

  console.log(`\n✅ Bax Music Found: ${baxFound}/${baxProducts.length}`);
  console.log(`❌ Bax Not found: ${baxNotFound}`);

  fs.writeFileSync('data/products.json', JSON.stringify(products, null, 2));
  console.log('\nSaved products.json');
  fs.writeFileSync('url-fix-results.json', JSON.stringify(results, null, 2));
})();
