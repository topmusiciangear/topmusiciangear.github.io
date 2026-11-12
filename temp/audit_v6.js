// AUDITORÍA v6 - Productos sin reseña + precios inconsistentes
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';

const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const prodById = {};
products.forEach(p => prodById[p.id] = p);

function stripHtml(text) {
  return text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

console.log('╔═══════════════════════════════════════════════════════════════╗');
console.log('║  AUDITORÍA v6 - Productos sin reseña + precios               ║');
console.log('║  ' + guides.length + ' guías                                                  ║');
console.log('╚═══════════════════════════════════════════════════════════════╝\n');

// 1. Productos mencionados en content_es pero no en tabla/featured
console.log('════════════════════════════════════════════════════════════════');
console.log('PRODUCTOS MENCIONADOS PERO SIN RESEÑA EN LA GUÍA:');
console.log('════════════════════════════════════════════════════════════════\n');

let totalSinResena = 0;
guides.forEach(g => {
  const mentioned = [];
  const text = stripHtml(JSON.stringify(g.sections || []));
  const textLow = text.toLowerCase();
  
  products.forEach(p => {
    const name = (p.title || '').toLowerCase();
    const nameEs = (p.title_es || '').toLowerCase();
    if (name.length > 5 && (textLow.includes(name) || textLow.includes(nameEs))) {
      const inTable = g.productTable && g.productTable.rows.some(r => 
        r.values.some(v => v.productId == p.id || v.value === p.title || v.value_es === p.title_es)
      );
      const inFeatured = (g.featuredProducts || []).includes(p.id) || (g.featuredProducts_es || []).includes(p.id);
      if (!inTable && !inFeatured) {
        mentioned.push(p.id + ' (' + p.title + ')');
      }
    }
  });
  
  if (mentioned.length > 0) {
    totalSinResena += mentioned.length;
    console.log('GUIA: ' + g.id + ' — ' + g.title);
    mentioned.forEach(m => console.log('   ⚠ ' + m));
    console.log('');
  }
});
console.log('Total productos sin reseña: ' + totalSinResena + '\n');

// 2. Precios inconsistentes en TEST_SHOP_BTN de build-guides.js
console.log('════════════════════════════════════════════════════════════════');
console.log('VERIFICACIÓN DE PRECIOS EN TEST_SHOP_BTN:');
console.log('════════════════════════════════════════════════════════════════\n');

const bg = fs.readFileSync(B + 'build-guides.js', 'utf8');
const mapStart = bg.indexOf('TEST_SHOP_BTN');
if (mapStart >= 0) {
  // Buscar el objeto TEST_SHOP_BTN y extraer IDs con precios
  const shopBtnSection = bg.slice(mapStart);
  const idMatches = shopBtnSection.match(/^(\d+): \{/gm);
  if (idMatches) {
    console.log('Entradas en TEST_SHOP_BTN: ' + idMatches.length);
  }
  
  // Verificar que no haya precios sin coma de miles (>999)
  const priceMatches = bg.match(/\$[\d,]+(?:\.\d+)?|£[\d,]+(?:\.\d+)?|€[\d,]+(?:\.\d+)?/g);
  if (priceMatches) {
    const badPrices = priceMatches.filter(p => {
      const num = p.replace(/[^\d.]/g, '');
      return parseFloat(num) > 999 && !p.includes(',');
    });
    if (badPrices.length > 0) {
      console.log('⚠ Precios >999 sin coma de miles: ' + badPrices.length);
      badPrices.forEach(p => console.log('   ' + p));
    } else {
      console.log('✓ Todos los precios >999 llevan coma de miles');
    }
  }
}

// 3. Productos duplicados en products.json
console.log('\n════════════════════════════════════════════════════════════════');
console.log('PRODUCTOS DUPLICADOS (mismo title):');
console.log('════════════════════════════════════════════════════════════════\n');

const titleCounts = {};
products.forEach(p => {
  const t = p.title;
  titleCounts[t] = (titleCounts[t] || 0) + 1;
});
const dups = Object.entries(titleCounts).filter(([t, c]) => c > 1);
if (dups.length > 0) {
  console.log('⚠ ' + dups.length + ' títulos duplicados:');
  dups.forEach(([t, c]) => console.log('   ' + c + 'x: ' + t));
} else {
  console.log('✓ No hay títulos duplicados');
}

console.log('\n✓ Auditoría v6 completada');
