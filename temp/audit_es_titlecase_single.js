// temp/audit_es_titlecase_single.js — detecta palabras comunes ES capitalizadas en medio de oración (no al inicio)
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

const COMUNES_ES = new Set([
  'de','del','la','el','los','las','un','una','unos','unas','y','o','para','en','con','por','sin','sobre','entre','como','más','menos','tras','según','durante','hacia','hasta','desde','ante','bajo','cabe','contra','excepto','incluso','mediante','salvo','versus','vs','e','ni','que','quien','cuyo','cuya','cuyos','cuyas','donde','cuando','cuán','cuál','cuáles','qué','cómo','dónde','cuándo','si','sí','no','ya','se','cada','todo','todos','toda','todas','otro','otros','otra','otras','antes','después','ahora','solo','sólo','también','dentro','fuera','cual','cualquiera','cualesquiera','nadie','alguien','algo','nada','poco','pocos','pocas','mucho','mucha','muchos','muchas','demasiado','demasiada','demasiados','demasiadas','bastante','bastantes','cualquier','cualquiera','cualesquiera','cada','este','esta','estos','estas','ese','esa','esos','esas','aquel','aquella','aquellos','aquellas','mío','mía','míos','mías','tuyo','tuya','tuyos','tuyas','suyo','suya','suyos','suyas','nuestro','nuestra','nuestros','nuestras','vuestro','vuestra','vuestros','vuestras','bien','mal','así','aún','aun','ése','ésa','éste','ésta','aquél','aquella','aquellos','aquellas','este','esta','estos','estas','ese','esa','esos','esas','más','menos','muy','bastante','demasiado','poco','un','una','unos','unas','algo','alguien','nadie','nada','siempre','nunca','casi','solo','sólo','también','tampoco','ya','todavía','aún','entonces','luego','antes','después','mientras','cuando','cuándo','donde','dónde','como','cómo','por qué','porque','porqué','aunque','pero','si','sí','no','ni','o','u','y','e',
  'élite','elección','equilibrada','tradicional','cúspide','ingeniería','moderna','presentación','serie','guitarra','acústica','profesional','música','electrónica','directo','estudio','sesión','sesiones','fingerstyle','dedos','dedos','dedo','cuerdas','cuerda','doble','dobles','voz','tono','sonido','son','audio','mezcla','mezclas','mezclar','grabación','grabaciones','grabar','escenario','escenarios','directo','directos','actuación','actuaciones','bolo','bolos','concierto','conciertos','festival','festivales','gira','giras','tourarea','productor','productores','producción','producciones','ingeniero','ingenieros','ingeniería','técnico','técnicos','músico','músicos','banda','bandas','cantante','cantantes','instrumento','instrumentos','guitarra','guitarras','bajo','bajos','batería','baterías','baterista','bateristas','teclado','teclados','pianista','pianistas','violín','violines','violonchelo','violonchelos','saxofón','saxofones','trompeta','trompetas','trombón','trombones','clarinete','clarinetes','flauta','flautas','armónica','armónicas','armoníaca','ukulele','ukuleles','banjo','banjos','mandolina','mandolinas','arpa','arpas','órgano','órganos','acordeón','acordeones','armonio','armonios','sintetizador','sintetizadores','sintetizador','sintetizadores','caja','cajas','ritmo','ritmos','groove','grooves','beat','beats','sample','samples','sampler','samplers','loop','loops','patrón','patrones','secuenciador','secuenciadores','pista','pistas','track','tracks','canal','canales','entrada','entradas','salida','salidas','mezcla','mezclas','master','mastering','masterizaciones','preamplificador','preamplificadores','previo','previos','compresor','compresores','limitador','limitadores','puerta','puertas','ecualizador','ecualizadores','eq','filtro','filtros','reverberación','reverb','reverbs','delay','delays','eco','ecos','corus','chorus','flanger','flangers','faser','phaser','phasers','tremolo','tremolos','vibrato','vibratos','distorsión','distorsiones','overdrive','overdrives','saturación','saturaciones','fuzz','fuzzes','octaver','octavers','afinador','afinadores','tuner','tuners','pedal','pedales','pedalera','pedaleras','efecto','efectos','procesador','procesadores','rack','racks','pedalboard','pedalboards','batería','baterías','bombo','bombos','caja','cajas','redoblante','redoblantes','timbal','timbales','tom','toms','floor tom','floor toms','tom-tom','tom-toms','charles','hihat','hi-hat','hi hats','platillo','platillos','ride','rides','crash','crashes','splash','splashes','china','chinas','espátula','espátulas','escoba','escobas','cepillo','cepiillos','malleta','malletas','baqueta','baquetas','palillo','palillos','cuerda','cuerdas','pastilla','pastillas','micrófono','micrófonos','mic','mics','capsula','capsulas','diafragma','diafragmas','grande','pequeña','pequeño','mediano','mediana','condensador','condensadores','dinámico','dinámicos','dinamica','cinta','cintas','ribbon','ribbons','estático','estáticos','electret','electrets','usb','xlr','jack','6.35','1/4','3.5','1/8','rca','phono','speakon','trs','ts','trrs','trrs','adaptador','adaptadores','cable','cables','conector','conectores','enchufe','enchufes','interruptor','interruptores','botón','botones','perilla','perillas','knob','knobs','fader','faders','deslizador','deslizadores','pantalla','pantallas','display','displays','led','leds','lcd','oled','botón','botones','interruptor','interruptores','switch','switches','pulsador','pulsadores','tecla','teclas','teclado','teclados','piano','pianos','sintetizador','sintetizadores','controlador','controladores','controladora','controladoras','midi','midi','usb','usb','lightning','thunderbolt','firewire','firewire 400','firewire 800','pc','mac','windows','macos','linux','ios','android','ipad','iphone','macbook','imac','mac mini','mac studio','mac pro','windows','pc','ordenador','ordenadores','portátil','portátiles','sobremesa','torre','torres','monitor','monitores','pantalla','pantallas','auricular','auriculares','casco','cascos','headphone','headphones','in-ear','in-ears','iem','iems','diadema','diademas','circumaural','supraaural','intraural','cerrado','abiertos','semiabierto','semiabiertos','driver','drivers','controlador','controladores','diafragma','diafragmas','impedancia','impedancias','ohm','ohms','sensibilidad','sensibilidads','db','db spl','spl','watts','w','rwms','rms','pico','picos','respuesta','respuesta','frecuencia','frecuencias','hz','khz','mhz','hercios','kilohertz','megahertz','voltaje','voltajes','v','volt','voltios','amperio','amperios','amps','ma','miliamperio','miliamperios','watts','w','kilowatt','kw','hora','horas','wh','kwh','batería','baterías','pila','pilas','recargable','recargables','usb-c','usb-a','usb-b','micro usb','mini usb','lightning','thunderbolt','displayport','hdmi','dvi','vga','sd','sdxc','sdhc','microsd','cf','cfexpress','xqd','ssd','hdd','hdds','ssds','nvme','sata','sas','scsi','ide','raid','nas','san','lan','wan','wifi','wi-fi','bluetooth','nfc','rfid','gps','glonass','galileo','beidou','qzss','lora','lorawan','zigbee','z-wave','thread','matter','homekit','alexa','google assistant','siri','cortana','bixby','voice','voz','asistente','asistentes','inteligencia artificial','ia','ai','ml','machine learning','deep learning','red neuronal','redes neuronales','cnn','rnn','lstm','gru','transformer','transformers','bert','gpt','gpt-3','gpt-4','llm','llms','prompt','prompts','ingeniería de prompts','prompt engineering','token','tokens','modelo','modelos','entrenamiento','entrenamientos','datasets','dataset','datos','data','big data','analítica','analitica','analisis','análisis','metrica','métrica','metricas','métricas','kpi','kpis','roi','retorno','conversion','conversión','embudo','embudos','lead','leads','cliente','clientes','usuario','usuarios','usuario','usuarios','cuenta','cuentas','sesión','sesiones','cookie','cookies','rastreo','tracking','pixel','pixels','etiqueta','etiquetas','tag','tags','analitica web','web analytics','seo','sem','ppc','cpc','cpm','ctr','cpa','cac','ltv','churn','retention','retención','engagement','compromiso','impresion','impresión','impresiones','click','clic','clics','cliqueo','cliqueos','visita','visitas','visitante','visitantes','rebote','rebotes','tasa de rebote','duración','duraciones','tiempo','tiempos','página','páginas','pagina','paginas','página de inicio','inicio','inicios','final','finales','comienzo','comienzos','principio','principios','fin','fins','final','finales','ultimo','último','últimos','primera','primeras','primero','primeros','segundo','segundos','segunda','segundas','tercer','tercera','terceros','terceras','cuarto','cuarta','cuartos','cuartas','quinto','quinta','quintos','quintas','sexto','sexta','sextos','sextas','séptimo','séptima','séptimos','séptimas','octavo','octava','octavos','octavas','noveno','novena','novenos','novenas','décimo','décima','décimos','décimas','vigésimo','vigésima','vigésimos','vigésimas','trigésimo','trigésima','trigésimos','trigésimas','cuadragésimo','cuadragésima','cuadragésimos','cuadragésimas','quincuagésimo','quincuagésima','quincuagésimos','quincuagésimas','sexagésimo','sexagésima','sexagésimos','sexagésimas','septuagésimo','septuagésima','septuagésimos','septuagésimas','octogésimo','octogésima','octogésimos','octogésimas','nonagésimo','nonagésima','nonagésimos','nonagésimas','centésimo','centésima','centésimos','centésimas','millonésimo','millonésima','millonésimos','millonésimas','mil','millones','billón','billones','trillón','trillones','cuatrillón','cuatrillones','quintillón','quintillones','sextillón','sextillones','septillón','septillones','octillón','octillones','nonillón','nonillones','decillón','decillones','uno','una','unos','unas','dos','tres','cuatro','cinco','seis','siete','ocho','nueve','diez','once','doce','trece','catorce','quince','dieciséis','diecisiete','dieciocho','diecinueve','veinte','veintiuno','veintidós','veintitrés','veinticuatro','veinticinco','veintiséis','veintisiete','veintiocho','veintinueve','treinta','cuarenta','cincuenta','sesenta','setenta','ochenta','noventa','cien','ciento','doscientos','doscientas','trescientos','trescientas','cuatrocientos','cuatrocientas','quinientos','quinientas','seiscientos','seiscientas','setecientos','setecientas','ochocientos','ochocientas','novecientos','novecientas','mil','un millón','un millon','dos millones','dos millones','tres millones','tres millones','cuatro millones','cuatro millones','cinco millones','cinco millones','seis millones','seis millones','siete millones','siete millones','ocho millones','ocho millones','nueve millones','nueve millones','diez millones','diez millones','cien millones','cien millones','mil millones','mil millones','un billón','un billon','dos billones','dos billones','tres billones','tres billones','cuatro billones','cuatro billones','cinco billones','cinco billones','seis billones','seis billones','siete billones','siete billones','ocho billones','ocho billones','nueve billones','nueve billones','diez billones','diez billones','cien billones','cien billones','mil billones','mil billones','un trillón','un trillon','dos trillones','dos trillones','tres trillones','tres trillones','cuatro trillones','cuatro trillones','cinco trillones','cinco trillones','seis trillones','seis trillones','siete trillones','siete trillones','ocho trillones','ocho trillones','nueve trillones','nueve trillones','diez trillones','diez trillones','cien trillones','cien trillones','mil trillones','mil trillones'
]);

function stripHtml(txt) { return String(txt || '').replace(/<[^>]+>/g, ' '); }
function cleanWord(w) { return w.replace(/^[¿¡"'«*\[\]{}]+/,'').replace(/[.,;:!?]+$/,''); }

function findSingles(txt) {
  const plano = stripHtml(txt).replace(/\s+/g, ' ').trim();
  if (!plano) return [];
  const segmentos = plano.split(/(?<=[:?!;])\s+|\.\s+/);
  const singles = [];
  segmentos.forEach(seg => {
    const palabras = seg.split(/\s+/).filter(Boolean);
    for (let i = 1; i < palabras.length; i++) {
      const c = cleanWord(palabras[i]);
      if (!c) continue;
      if (COMUNES_ES.has(c.toLowerCase()) && /^[A-ZÁÉÍÓÚÑ]/.test(c)) {
        singles.push(c);
      }
    }
  });
  return singles;
}

const problemas = [];
const push = (guia, campo, txt) => {
  const m = findSingles(txt);
  if (m.length >= 1) problemas.push({ guia, campo, txt: String(txt), palabras: m });
};

guides.forEach(g => {
  push(g.id, 'title_es', g.title_es);
  push(g.id, 'metaDesc_es', g.metaDesc_es);
  push(g.id, 'intro_es', g.intro_es);
  push(g.id, 'conclusion_es', g.conclusion_es);
  push(g.id, 'verdict_es', g.verdict_es);
  (g.sections || []).forEach((s, i) => {
    push(g.id, `sections[${i}].heading_es`, s.heading_es);
    push(g.id, `sections[${i}].content_es`, s.content_es);
  });
  (g.verdictProsCons || []).forEach((v, i) => {
    (v.pros_es || []).forEach((p, j) => push(g.id, `verdictProsCons[${i}].pros_es[${j}]`, p));
    (v.cons_es || []).forEach((c, j) => push(g.id, `verdictProsCons[${i}].cons_es[${j}]`, c));
  });
  (g.faq || []).forEach((f, i) => {
    push(g.id, `faq[${i}].q_es`, f.q_es);
    push(g.id, `faq[${i}].a_es`, f.a_es);
  });
  if (g.productTable) {
    push(g.id, 'productTable.title_es', g.productTable.title_es);
    (g.productTable.rows || []).forEach((r, i) => {
      (r.values || []).forEach((val, k) => {
        if (val.value_es) push(g.id, `productTable.rows[${i}].values[${k}].value_es`, val.value_es);
      });
    });
  }
});

console.log('TOTAL CAMPOS ES CON PALABRAS COMUNES CAPITALIZADAS EN MEDIO DE ORACIÓN: ' + problemas.length);
problemas.forEach(p => {
  console.log('\n--- ' + p.guia + ' :: ' + p.campo);
  console.log('   PALABRAS: ' + p.palabras.join(', '));
  console.log('   TEXTO: ' + p.txt.slice(0, 160).replace(/\s+/g, ' '));
});
fs.writeFileSync(B + 'temp/es_titlecase_single.json', JSON.stringify(problemas, null, 2), 'utf8');
console.log('\nGuardado en temp/es_titlecase_single.json');
