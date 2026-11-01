const fs=require('fs');
let guides=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
let guide=guides.find(g=>g.id==='budget-mics');
if(!guide.verdictProsCons) { console.log('no verdict'); process.exit(0);}
let idx=guide.verdictProsCons.findIndex(p=>p.name==='Electro-Voice ND86');
if(idx>=0){
  guide.verdictProsCons[idx]={
    name:'sE Electronics X1 S',
    name_es:'sE Electronics X1 S',
    pros:[
      'Hand-crafted 1" capsule delivers warm, detailed vocal tone',
      'Switchable -10/-20 dB pads and 80/160 Hz filters add flexibility',
      'Max SPL up to 160 dB handles loud sources without distortion',
      'Low self-noise 9 dB keeps recordings clean in quiet home rooms'
    ],
    cons:[
      'Condenser requires phantom power, not plug-and-play for live use',
      'Large-diaphragm look may feel big on a small desk',
      'Cardioid pattern picks up room reflections in untreated spaces',
      'Price sits near the top of the under $200 budget'
    ],
    pros_es:[
      'Cápsula de 1" hecha a mano entrega tono vocal cálido y detallado',
      'Pads -10/-20 dB y filtros 80/160 Hz conmutables dan flexibilidad',
      'SPL máximo 160 dB aguanta fuentes fuertes sin distorsión',
      'Ruido propio 9 dB mantiene limpias las grabaciones en habitaciones silenciosas'
    ],
    cons_es:[
      'Condensador requiere phantom power, no es plug-and-play para directo',
      'Aspecto de diafragma grande puede resultar grande en un escritorio pequeño',
      'Patrón cardioide capta reflexiones de sala en espacios sin tratar',
      'Precio se sitúa cerca del tope del presupuesto bajo $200'
    ]
  };
  console.log('replaced');
}else{
  console.log('not found');
}
fs.writeFileSync('data/guides.json', JSON.stringify(guides,null,2));
