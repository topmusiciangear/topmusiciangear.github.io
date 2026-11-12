// temp/audit_es_titlecase_headings.js — detecta Title Case en headings/títulos ES (palabras comunes capitalizadas)
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

const COMUNES_ES = new Set([
  'de','del','la','el','los','las','un','una','unos','unas','y','o','para','en','con','por','sin','sobre','entre','como','más','menos','tras','según','durante','hacia','hasta','desde','ante','bajo','cabe','contra','excepto','incluso','mediante','salvo','versus','vs','e','ni','que','quien','cuyo','cuya','cuyos','cuyas','donde','cuando','cuán','cuál','cuáles','qué','cómo','dónde','cuándo','si','sí','no','ya','se','cada','todo','todos','toda','todas','otro','otros','otra','otras','antes','después','ahora','solo','sólo','también','dentro','fuera','cual','cualquiera','cualesquiera','nadie','alguien','algo','nada','poco','pocos','pocas','mucho','mucha','muchos','muchas','demasiado','demasiada','demasiados','demasiadas','bastante','bastantes','cualquier','cualquiera','cualesquiera','este','esta','estos','estas','ese','esa','esos','esas','aquel','aquella','aquellos','aquellas','mío','mía','míos','mías','tuyo','tuya','tuyos','tuyas','suyo','suya','suyos','suyas','nuestro','nuestra','nuestros','nuestras','vuestro','vuestra','vuestros','vuestras','bien','mal','así','aún','aun','éste','ésta','aquél','aquella','muy','bastante','demasiado','poco','algo','alguien','nadie','nada','siempre','nunca','casi','solo','sólo','también','tampoco','ya','todavía','aún','entonces','luego','antes','después','mientras','porque','aunque','pero','si','no','ni','o','u','y','e'
]);

const SIGLAS = new Set(['hz','khz','mhz','db','db spl','spl','w','w rms','rms','w rms','w rms','w rms','w rms','kw','v','volt','voltios','amps','ma','ohm','ohms','spl','spl max','spl pico','spl máx','spl máximo','spl máximo','spl máximo','spl máximo','spl máximo','spl máximo','spl máximo','spl máximo','spl máximo','spl máximo','spl máximo','spl máximo','spl máximo','spl máximo','usb','usb-c','usb-a','xlr','trs','ts','rca','phono','speakon','midi','din','lan','wan','wifi','wi-fi','bluetooth','nfc','rfid','gps','sd','sdxc','sdhc','microsd','cf','cfexpress','xqd','ssd','hdd','nvme','sata','sas','scsi','ide','raid','nas','san','dsp','eq','fx','vst','au','aax','midi','daw','cpu','gpu','ram','hdmi','dvi','vga','displayport','thunderbolt','lightning','firewire','ethernet','wifi','lan','wan','nat','dhcp','dns','ip','tcp','udp','http','https','ftp','sftp','ssh','telnet','smtp','pop3','imap','ssl','tls','ssh','vpn','lan','wan','isp','dsl','cable','fibra','ftth','fttb','fttc','fttn','ftta','ftth','gpon','epon','xgs-pon','xg-pon','ng-pon2','pon','gp-on','epon','xg-pon','ngpon2','gfast','vdsl','adsl','adsl2+','adsl2','sdsl','shdsl','vdl','vdsl2','g.fast','doca','docsis','eurodocsis','docsis 3.0','docsis 3.1','docsis 4.0','moca','homeplug','powerline','plc','plc','plc','plc','plc','plc','plc','plc','plc','plc']);

function stripHtml(txt) { return String(txt || '').replace(/<[^>]+>/g, ' '); }
function cleanWord(w) { return w.replace(/^[¿¡"'«*\[\]{}]+/,'').replace(/[.,;:!?]+$/,''); }

function findTitleCase(txt) {
  const plano = stripHtml(txt).replace(/\s+/g, ' ').trim();
  if (!plano) return [];
  const segmentos = plano.split(/(?<=[:?!;])\s+|\.\s+/);
  const malas = [];
  segmentos.forEach(seg => {
    const palabras = seg.split(/\s+/).filter(Boolean);
    for (let i = 1; i < palabras.length; i++) {
      const c = cleanWord(palabras[i]);
      if (!c) continue;
      const cl = c.toLowerCase();
      if (COMUNES_ES.has(cl) && !SIGLAS.has(cl) && /^[A-ZÁÉÍÓÚÑ]/.test(c)) {
        malas.push(c);
      }
    }
  });
  return malas;
}

const problemas = [];
const push = (guia, campo, txt) => {
  const m = findTitleCase(txt);
  if (m.length >= 1) problemas.push({ guia, campo, txt: String(txt), palabras: m });
};

guides.forEach(g => {
  push(g.id, 'title_es', g.title_es);
  push(g.id, 'metaDesc_es', g.metaDesc_es);
  (g.sections || []).forEach((s, i) => {
    push(g.id, `sections[${i}].heading_es`, s.heading_es);
  });
});

console.log('TOTAL CAMPOS ES CON PALABRAS COMUNES CAPITALIZADAS (Title Case): ' + problemas.length);
problemas.forEach(p => {
  console.log('\n--- ' + p.guia + ' :: ' + p.campo);
  console.log('   PALABRAS: ' + p.palabras.join(', '));
  console.log('   TEXTO: ' + p.txt.slice(0, 160).replace(/\s+/g, ' '));
});
fs.writeFileSync(B + 'temp/es_titlecase_headings.json', JSON.stringify(problemas, null, 2), 'utf8');
console.log('\nGuardado en temp/es_titlecase_headings.json');
