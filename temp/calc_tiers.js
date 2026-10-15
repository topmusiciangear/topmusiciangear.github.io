// Calcular los 3 tiers con precios canonicos del catalogo (verificados)
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const arr = JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));
const list = Array.isArray(arr)?arr:arr.products;
const P = id => { const p = list.find(x=>x.id===id); return p ? p.price : null; };
const N = id => { const p = list.find(x=>x.id===id); return p ? p.title : '??'; };

const TIERS = {
  'Budget Essentials': [
    { id: 15, rol: 'Interfaz de audio' },
    { id: 5,  rol: 'Microfono dinamico' },
    { id: 58, rol: 'Soporte de micro' },
    { id: 170, rol: 'Tratamiento acustico' }
  ],
  'Pro Producer': [
    { id: 18, rol: 'Interfaz de audio' },
    { id: 3,  rol: 'Microfono de condensador' },
    { id: 25, rol: 'Auriculares de mezcla' },
    { id: 170, rol: 'Tratamiento acustico' }
  ],
  'Ultimate Powerhouse': [
    { id: 18, rol: 'Interfaz de audio' },
    { id: 297, rol: 'Microfono de condensador' },
    { id: 26, rol: 'Auriculares deReference' },
    { id: 20, rol: 'Monitores de estudio' },
    { id: 170, rol: 'Tratamiento acustico' }
  ]
};

Object.keys(TIERS).forEach(t=>{
  let sum = 0;
  console.log('\n=== ' + t + ' ===');
  TIERS[t].forEach(x=>{
    const pr = P(x.id);
    sum += pr;
    console.log('  id ' + String(x.id).padEnd(4) + pr.toString().padStart(4) + '  ' + N(x.id).slice(0,52).padEnd(54) + ' (' + x.rol + ')');
  });
  console.log('  ' + '-'.repeat(80));
  console.log('  TOTAL: $' + sum + '   (presupuesto $1,000, ' + (1000-sum) + ' de margen)');
});

// verificar que todos los productos existen y estan en 5 tiendas
console.log('\n\n=== COBERTURA DE TIENDAS ===');
const TODOS = [...new Set(Object.values(TIERS).flat().map(x=>x.id))];
TODOS.forEach(id=>{
  const p = list.find(x=>x.id===id);
  const s = Object.keys(p.stores||{});
  console.log('  id ' + String(id).padEnd(4) + (p.title||'').slice(0,46).padEnd(48) + s.length + ' tiendas: ' + s.join(', '));
});