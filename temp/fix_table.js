const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const q = g.find(x => x.id === 'beginner-bass-guitars');

q.productTable = {
  columns: [
    { title: 'Ibanez GSR200 GIO', title_es: 'Ibanez GSR200 GIO' },
    { title: 'Squier Affinity Series Precision Bass PJ', title_es: 'Squier Affinity Series Precision Bass PJ' },
    { title: 'Yamaha TRBX304', title_es: 'Yamaha TRBX304' },
    { title: 'Ibanez SR300E', title_es: 'Ibanez SR300E' },
    { title: 'Sterling by Music Man StingRay Ray4', title_es: 'Sterling by Music Man StingRay Ray4' },
    { title: "Squier Classic Vibe '60s Jazz Bass", title_es: "Squier Classic Vibe '60s Jazz Bass" },
    { title: 'Sire Marcus Miller V5R', title_es: 'Sire Marcus Miller V5R' },
    { title: 'Squier Sonic Bronco Bass', title_es: 'Squier Sonic Bronco Bass' },
    { title: 'Yamaha BB234', title_es: 'Yamaha BB234' },
    { title: 'Ibanez TMB30 Talman', title_es: 'Ibanez TMB30 Talman' }
  ],
  rows: [
    {
      label: 'Ideal para',
      label_es: 'Ideal para',
      values: [
        { val: 'First P/J grooves', val_es: 'Primeros grooves P/J' },
        { val: 'Classic Precision/Jazz tones', val_es: 'Tonos clásicos Precision/Jazz' },
        { val: 'Versatile active bass', val_es: 'Bajo activo versátil' },
        { val: 'Lightweight speed grooves', val_es: 'Groove ligero' },
        { val: 'Funk with punch', val_es: 'Funk con pegada' },
        { val: 'Vintage Jazz vibe', val_es: 'Vibe Jazz vintage' },
        { val: 'Roasted neck premium feel', val_es: 'Mástil tostado sensación premium' },
        { val: 'Short-scale starter', val_es: 'Escala corta para empezar' },
        { val: 'All-round PJ workhorse', val_es: 'PJ todoterreno' },
        { val: 'Compact short-scale PJ', val_es: 'PJ escala corta compacto' }
      ]
    },
    {
      label: 'Body Wood',
      label_es: 'Madera del cuerpo',
      values: [
        { val: 'Poplar / Okoume', val_es: 'Álamo / Okume' },
        { val: 'Poplar', val_es: 'Álamo' },
        { val: 'Alder', val_es: 'Aliso' },
        { val: 'Nyatoh', val_es: 'Nyatoh' },
        { val: 'Basswood (Tilo)', val_es: 'Tilo (Basswood)' },
        { val: 'Poplar', val_es: 'Álamo (Poplar)' },
        { val: 'Mahogany', val_es: 'Caoba' },
        { val: 'Poplar', val_es: 'Álamo' },
        { val: 'Alder', val_es: 'Aliso' },
        { val: 'Poplar', val_es: 'Álamo' }
      ]
    },
    {
      label: 'Neck',
      label_es: 'Mástil',
      values: [
        { val: 'Maple, GSR4 profile', val_es: 'Arce, perfil GSR4' },
        { val: 'Maple, C shape', val_es: 'Arce, forma C' },
        { val: 'Maple, 5-piece', val_es: 'Arce, 5 piezas' },
        { val: 'Maple/Walnut, SR4 5-piece', val_es: 'Arce/Nogal, SR4 5 piezas' },
        { val: 'Maple, C shape', val_es: 'Arce, forma C' },
        { val: 'Maple, C shape', val_es: 'Arce, forma C' },
        { val: 'Maple, C shape, roasted', val_es: 'Arce, forma C, tostado' },
        { val: 'Maple, C shape', val_es: 'Arce, forma C' },
        { val: 'Maple, C shape', val_es: 'Arce, forma C' },
        { val: 'Maple, C shape', val_es: 'Arce, forma C' }
      ]
    },
    {
      label: 'Frets & Fretboard',
      label_es: 'Trastes y diapasón',
      values: [
        { val: '22 frets, Jatoba', val_es: '22 trastes, Jatoba' },
        { val: '20 frets, Indian Laurel', val_es: '20 trastes, Laurel indio' },
        { val: '24 frets, Rosewood', val_es: '24 trastes, Palo rosa' },
        { val: '24 frets, Jatoba', val_es: '24 trastes, Jatoba' },
        { val: '22 frets, Jatoba', val_es: '22 trastes, Jatoba' },
        { val: '20 frets, Indian Laurel', val_es: '20 trastes, Laurel indio' },
        { val: '22 frets, Rosewood', val_es: '22 trastes, Palo rosa' },
        { val: '19 frets, Maple', val_es: '19 trastes, Arce' },
        { val: '22 frets, Rosewood', val_es: '22 trastes, Palo rosa' },
        { val: '20 frets, Jatoba', val_es: '20 trastes, Jatoba' }
      ]
    },
    {
      label: 'Pickups',
      label_es: 'Pastillas',
      values: [
        { val: 'Split P + J bridge (Dynamix)', val_es: 'Split P + J puente (Dynamix)' },
        { val: 'Split P + J bridge', val_es: 'Split P + J puente' },
        { val: '2x YGD Humbuckers', val_es: '2x Humbuckers YGD' },
        { val: '2x PowerSpan Humbuckers', val_es: '2x Humbuckers PowerSpan' },
        { val: '1x Ceramic Humbucker', val_es: '1x Humbucker cerámico' },
        { val: '2x Single-Coil Jazz', val_es: '2x Single-Coil Jazz' },
        { val: '2x Marcus Revolution Single-Coil', val_es: '2x Single-Coil Marcus Revolution' },
        { val: '1x Short-scale Ceramic Single-Coil', val_es: '1x Single-Coil cerámica escala corta' },
        { val: 'Split P + J bridge', val_es: 'Split P + J puente' },
        { val: 'Split P + J bridge (Dynamix)', val_es: 'Split P + J puente (Dynamix)' }
      ]
    },
    {
      label: 'Active/Passive',
      label_es: 'Activo/Pasivo',
      values: [
        { val: 'Active (Phat II EQ)', val_es: 'Activo (Phat II EQ)' },
        { val: 'Passive', val_es: 'Pasivo' },
        { val: 'Active (2-band EQ + Performance EQ)', val_es: 'Activo (EQ 2 bandas + Performance EQ)' },
        { val: 'Active (3-band EQ)', val_es: 'Activo (EQ 3 bandas)' },
        { val: 'Active (2-band preamp)', val_es: 'Activo (preamp 2 bandas)' },
        { val: 'Passive', val_es: 'Pasivo' },
        { val: 'Passive', val_es: 'Pasivo' },
        { val: 'Passive', val_es: 'Pasivo' },
        { val: 'Passive', val_es: 'Pasivo' },
        { val: 'Passive', val_es: 'Pasivo' }
      ]
    },
    {
      label: 'Scale Length',
      label_es: 'Longitud de escala',
      values: [
        { val: '34" (864 mm)', val_es: '34" (864 mm)' },
        { val: '34" (864 mm)', val_es: '34" (864 mm)' },
        { val: '34" (864 mm)', val_es: '34" (864 mm)' },
        { val: '34" (864 mm)', val_es: '34" (864 mm)' },
        { val: '34" (864 mm)', val_es: '34" (864 mm)' },
        { val: '34" (864 mm)', val_es: '34" (864 mm)' },
        { val: '34" (864 mm)', val_es: '34" (864 mm)' },
        { val: '30" (762 mm)', val_es: '30" (762 mm)' },
        { val: '34" (864 mm)', val_es: '34" (864 mm)' },
        { val: '30" (762 mm)', val_es: '30" (762 mm)' }
      ]
    },
    {
      label: 'Electronics',
      label_es: 'Electrónica',
      values: [
        { val: 'Phat II EQ (bass boost), master volume, balance, tone', val_es: 'Phat II EQ (boost graves), vol. maestro, balance, tono' },
        { val: 'Master volume, master tone', val_es: 'Vol. maestro, tono maestro' },
        { val: '2-band EQ (bass/treble) + 5-way Performance EQ switch', val_es: 'EQ 2 bandas (graves/agudos) + switch Performance EQ 5 pos.' },
        { val: '3-band EQ (bass/mid/treble), volume, balance', val_es: 'EQ 3 bandas (graves/medios/agudos), volumen, balance' },
        { val: '2-band preamp (bass/treble), volume', val_es: 'Preamp 2 bandas (graves/agudos), volumen' },
        { val: 'Master volume x2, master tone', val_es: 'Vol. maestro x2, tono maestro' },
        { val: 'Master volume, blend, tone', val_es: 'Vol. maestro, blend, tono' },
        { val: 'Master volume, tone', val_es: 'Vol. maestro, tono' },
        { val: 'Master volume, master tone', val_es: 'Vol. maestro, tono maestro' },
        { val: 'Master volume, tone, Phat II EQ (bass boost)', val_es: 'Vol. maestro, tono, Phat II EQ (boost graves)' }
      ]
    },
    {
      label: 'Tuners',
      label_es: 'Clavijas',
      values: [
        { val: 'Die-cast', val_es: 'Fundición a presión' },
        { val: 'Die-cast', val_es: 'Fundición a presión' },
        { val: 'Die-cast', val_es: 'Fundición a presión' },
        { val: 'Die-cast', val_es: 'Fundición a presión' },
        { val: 'Die-cast', val_es: 'Fundición a presión' },
        { val: 'Vintage-style open gear', val_es: 'Estilo vintage abiertas' },
        { val: 'Die-cast', val_es: 'Fundición a presión' },
        { val: 'Die-cast', val_es: 'Fundición a presión' },
        { val: 'Die-cast', val_es: 'Fundición a presión' },
        { val: 'Die-cast', val_es: 'Fundición a presión' }
      ]
    },
    {
      label: 'Weight',
      label_es: 'Peso',
      values: [
        { val: '~3.6 kg (7.9 lbs)', val_es: '~3.6 kg (7.9 lbs)' },
        { val: '~3.8 kg (8.4 lbs)', val_es: '~3.8 kg (8.4 lbs)' },
        { val: '~4.1 kg (9.0 lbs)', val_es: '~4.1 kg (9.0 lbs)' },
        { val: '~3.7 kg (8.2 lbs)', val_es: '~3.7 kg (8.2 lbs)' },
        { val: '~3.9 kg (8.6 lbs)', val_es: '~3.9 kg (8.6 lbs)' },
        { val: '~3.9 kg (8.6 lbs)', val_es: '~3.9 kg (8.6 lbs)' },
        { val: '~4.0 kg (8.8 lbs)', val_es: '~4.0 kg (8.8 lbs)' },
        { val: '~2.9 kg (6.4 lbs)', val_es: '~2.9 kg (6.4 lbs)' },
        { val: '~4.2 kg (9.3 lbs)', val_es: '~4.2 kg (9.3 lbs)' },
        { val: '~3.2 kg (7.1 lbs)', val_es: '~3.2 kg (7.1 lbs)' }
      ]
    }
  ]
};

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2), 'utf8');
console.log('productTable fully rebuilt with correct data');