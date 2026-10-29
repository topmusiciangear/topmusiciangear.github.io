const fs=require('fs');
const data=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
const g=data.find(x=>x.id==='best-monitors');
if(g && g.verdictProsCons){
  const entry={
    name:'Focal Twin6 ST6',
    name_es:'Focal Twin6 ST6',
    pros:[
      'Beryllium tweeter reveals micro-transients without harshness',
      'Focus Mode emulates consumer devices for instant translation checks',
      'Dual W-cone woofers deliver tight, extended low end for large rooms',
      'High SPL and low distortion maintain clarity at mastering levels'
    ],
    cons:[
      'Premium price aimed at professional facilities',
      'Large cabinet requires dedicated room and placement',
      'Benefits from acoustic treatment to reach full potential',
      'Focus Mode needs optional footswitch'
    ],
    pros_es:[
      'Tweeter de berilio revela microtransitorios sin aspereza',
      'Modo Focus emula dispositivos de consumo para revisiones de traducción inmediatas',
      'Woofers W-cone ofrecen graves extendidos y controlados en salas grandes',
      'Alto SPL y baja distorsión mantienen claridad en niveles de masterización'
    ],
    cons_es:[
      'Precio premium orientado a instalaciones profesionales',
      'Cabina grande que requiere sala dedicada y colocación cuidadosa',
      'Se beneficia de tratamiento acústico para su máximo potencial',
      'La función Focus necesita el pedal opcional'
    ]
  };
  // avoid duplicates
  if(!g.verdictProsCons.find(p=>p.name==='Focal Twin6 ST6')){
    g.verdictProsCons.push(entry);
  }
  fs.writeFileSync('data/guides.json',JSON.stringify(data,null,2));
  console.log('added');
}
