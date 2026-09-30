const fs = require('fs');

// ---------- products.json: id 464 (imagen) ----------
{
  const f = 'data/products.json';
  const raw = fs.readFileSync(f, 'utf8');
  const data = JSON.parse(raw);
  const p = data.find(x => x.id === 464);
  if (!p) throw new Error('id 464 no encontrado');
  // la query de Google Analytics (_gl=...) es cache-busting: fuera, solo la imagen
  p.img = 'https://r2.gear4music.com/media/81/813079/1200/preview.jpg';
  const nl = /\n$/.test(raw);
  fs.writeFileSync(f, JSON.stringify(data, null, 2) + (nl ? '\n' : ''), 'utf8');
  console.log('products.json 464 img ->', p.img);
}

// ---------- guides.json: tabla columna 8 con specs oficiales ----------
{
  const f = 'data/guides.json';
  const raw = fs.readFileSync(f, 'utf8');
  const data = JSON.parse(raw);
  const g = data.find(x => x.id === 'best-beginner-electric-guitar');
  if (!g) throw new Error('guia no encontrada');

  // Solo specs confirmadas en yamaha.com / Guitar World; las no confirmadas no se inventan.
  const rows = {
    0: ['$539', '$539'],                                                    // precio canonico
    2: ['Chambered mahogany', 'Caoba ahuecada'],                            // confirmado
    3: ['3-piece mahogany, set-in', '3 piezas de caoba, set-in'],           // perfil C no confirmado por Yamaha
    4: ['22 jumbo, rosewood, 12" radius', '22 jumbo, palo rosa, radio 12"'], // 22 jumbo + radio 12" confirmados
    5: ['2 Alnico V humbuckers (VH3n/VH3b)', '2 humbuckers Alnico V (VH3n/VH3b)'],
    6: ['24.75 in (628 mm)', '24,75" (628 mm)'],                            // 628,6 mm
    7: ['Tune-o-matic + stopbar', 'Tune-o-matic + tope'],                    // confirmado
    8: ['Die-cast', 'Die-cast'],                                            // Yamaha: die-cast, marca no declarada
    9: ['~7.7 lb (3.5 kg)', '~3,5 kg']                                      // medido (Guitar World); Yamaha no publica peso
  };
  g.productTable.rows.forEach((r, i) => {
    const cell = (r.values || [])[8];
    if (!cell) throw new Error('fila ' + i + ' sin columna 8');
    if (rows[i]) { cell.value = rows[i][0]; cell.value_es = rows[i][1]; }
  });
  const nl = /\n$/.test(raw);
  fs.writeFileSync(f, JSON.stringify(data, null, 2) + (nl ? '\n' : ''), 'utf8');
  console.log('guides.json tabla col.8 actualizada (precio + 7 specs verificadas)');
}
