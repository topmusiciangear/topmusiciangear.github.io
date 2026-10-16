// EN typo/spelling audit - simplified
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const g = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

function textosEN(o, ruta, acc) {
  acc = acc || [];
  if (Array.isArray(o)) { o.forEach((v, i) => textosEN(v, ruta + '[' + i + ']', acc)); return acc; }
  if (o && typeof o === 'object') {
    Object.entries(o).forEach(([k, v]) => {
      if (typeof v === 'string' && !/(_es|title_es|desc_es)$/.test(k)) {
        if (['title','heading','body','conclusion','faq_q','faq_a','snippet','sectionHeading','pros','cons','verdictPros','verdictCons','metaDesc','ogDesc','intro','section','sectionText'].includes(k)) {
          acc.push({ campo: (ruta ? ruta + '.' : '') + k, texto: v });
        }
      }
      else if (v && typeof v === 'object') textosEN(v, (ruta ? ruta + '.' : '') + k, acc);
    });
    return acc;
  }
  return acc;
}

// Map of misspelling -> correction
const TYPO_MAP = {
  'recieve': 'receive', 'seperate': 'separate', 'occured': 'occurred',
  'occurence': 'occurrence', 'definately': 'definitely',
  'accomodate': 'accommodate', 'acommodate': 'accommodate',
  'wierd': 'weird', 'untill': 'until', 'begining': 'beginning',
  'comittee': 'committee', 'enviroment': 'environment',
  'goverment': 'government', 'independant': 'independent',
  'occassion': 'occasion', 'publically': 'publicly',
  'recomend': 'recommend', 'refering': 'referring',
  'succesful': 'successful', 'successfull': 'successful',
  'tommorow': 'tomorrow', 'truely': 'truly',
  'wich': 'which', 'teh': 'the', 'adn': 'and', 'taht': 'that',
  'hte': 'the', 'nad': 'and', 'ot': 'to', 'si': 'is',
  'ti': 'it', 'fo': 'of', 'na': 'an', 'nwe': 'new',
  'htat': 'that', 'thn': 'than', 'thne': 'then',
  'waht': 'what', 'hwen': 'when', 'hwere': 'where',
  'hwy': 'why', 'hwich': 'which', 'hwile': 'while',
  'accesory': 'accessory', 'acheive': 'achieve',
  'agressive': 'aggressive', 'amature': 'amateur',
  'apparant': 'apparent', 'arguement': 'argument',
  'basicly': 'basically', 'beleive': 'believe', 'belive': 'believe',
  'calender': 'calendar', 'camoflage': 'camouflage', 'catagory': 'category',
  'cemetary': 'cemetery', 'changable': 'changeable',
  'collegue': 'colleague', 'comming': 'coming',
  'commited': 'committed', 'commitee': 'committee',
  'completly': 'completely', 'concious': 'conscious',
  'curiousity': 'curiosity', 'decieve': 'deceive',
  'desparate': 'desperate', 'diffrent': 'different',
  'dilemna': 'dilemma', 'dissapear': 'disappear',
  'dissapoint': 'disappoint', 'ecstacy': 'ecstasy',
  'embarass': 'embarrass', 'equiptment': 'equipment',
  'exagerate': 'exaggerate', 'excercise': 'exercise',
  'existance': 'existence', 'experiance': 'experience',
  'familar': 'familiar', 'finaly': 'finally',
  'florescent': 'fluorescent', 'freind': 'friend',
  'gaurd': 'guard', 'grammer': 'grammar',
  'gratefull': 'grateful', 'greatful': 'grateful',
  'happend': 'happened', 'harrass': 'harass',
  'immediatly': 'immediately', 'incidently': 'incidentally',
  'indispensible': 'indispensable', 'innoculate': 'inoculate',
  'inteligence': 'intelligence', 'intresting': 'interesting',
  'irresistable': 'irresistible', 'jewelery': 'jewelry',
  'kernal': 'kernel', 'liason': 'liaison', 'libary': 'library',
  'maintenence': 'maintenance', 'manuever': 'maneuver',
  'medeval': 'medieval', 'millenium': 'millennium', 'miniture': 'miniature',
  'mischievious': 'mischievous', 'mispell': 'misspell',
  'neccessary': 'necessary', 'necesary': 'necessary',
  'noticable': 'noticeable', 'ommit': 'omit',
  'oppurtunity': 'opportunity', 'optimisim': 'optimism',
  'outragous': 'outrageous', 'paralell': 'parallel',
  'pasttime': 'pastime', 'peice': 'piece', 'percieve': 'perceive',
  'perseverence': 'perseverance', 'personel': 'personnel',
  'plagerism': 'plagiarism', 'politican': 'politician',
  'Portugese': 'Portuguese', 'posession': 'possession',
  'potatos': 'potatoes', 'preceed': 'precede',
  'privelege': 'privilege', 'probly': 'probably',
  'pronounciation': 'pronunciation', 'propoganda': 'propaganda',
  'reccomend': 'recommend', 'referance': 'reference',
  'refered': 'referred', 'relevent': 'relevant',
  'religous': 'religious', 'remeber': 'remember',
  'resistence': 'resistance', 'responsable': 'responsible',
  'rythm': 'rhythm', 'shedule': 'schedule',
  'sargent': 'sergeant', 'seige': 'siege',
  'sentance': 'sentence', 'similiar': 'similar',
  'sincerly': 'sincerely', 'speach': 'speech',
  'strenght': 'strength', 'stuborn': 'stubborn',
  'substract': 'subtract', 'suficient': 'sufficient',
  'supercede': 'supersede', 'surprize': 'surprise',
  'tatoo': 'tattoo', 'tendancy': 'tendency', 'therefor': 'therefore',
  'thier': 'their', 'tommorrow': 'tomorrow', 'tounge': 'tongue',
  'unforseen': 'unforeseen', 'unfortunatly': 'unfortunately',
  'usefull': 'useful', 'vaccuum': 'vacuum',
  'vegitable': 'vegetable', 'vehical': 'vehicle',
  'villian': 'villain', 'visable': 'visible',
  'wether': 'whether', 'withing': 'within',
  'writting': 'writing', 'yeild': 'yield',
  // Audio/tech
  'impedence': 'impedance', 'microfone': 'microphone',
  'microhpone': 'microphone', 'condensor': 'condenser',
  'capsulle': 'capsule', 'diaphram': 'diaphragm',
  'connecter': 'connector', 'treshold': 'threshold',
  'thershold': 'threshold', 'frecuency': 'frequency',
  'frequence': 'frequency', 'frequancy': 'frequency',
  'oscilator': 'oscillator', 'resonater': 'resonator',
  'filtre': 'filter', 'compresser': 'compressor',
  'compresor': 'compressor', 'limmiter': 'limiter',
  'limitier': 'limiter', 'exiter': 'exciter',
  'envellope': 'envelope', 'sinthesis': 'synthesis',
  'digitial': 'digital', 'equaliser': 'equalizer',
  'jiter': 'jitter', 'latancey': 'latency',
  'convertor': 'converter', 'bypas': 'bypass',
  'cabel': 'cable', 'stuido': 'studio',
  'moniter': 'monitor', 'speeker': 'speaker',
  'speker': 'speaker', 'wooofer': 'woofer',
  'wofer': 'woofer', 'tweatter': 'tweeter',
  'subwwofer': 'subwoofer', 'interace': 'interface',
  'interfce': 'interface', 'protocoll': 'protocol',
  'middi': 'midi', 'abletion': 'ableton',
  'abeleton': 'ableton', 'focuse rite': 'Focusrite',
  'schure': 'Shure', 'neuman': 'Neumann',
  'neumenn': 'Neumann', 'lahman': 'Lahmann',
  'krog': 'Korg', 'novicaton': 'Novation',
  'apoge': 'Apogee', 'appolo': 'Apollo',
  'arow': 'Arrow', 'tuin': 'Twin',
  'vegga': 'Vega', 'erme': 'RME',
  'gibson': 'Gibson', 'gibson': 'Gibson',
};

let total = 0;
const porGuia = {};

g.forEach(guide => {
  const textos = textosEN(guide, guide.id);
  const issues = [];
  
  textos.forEach(t => {
    Object.entries(TYPO_MAP).forEach(([wrong, right]) => {
      const re = new RegExp('\\b' + wrong + '\\b', 'gi');
      const match = t.texto.match(re);
      if (match) {
        match.forEach(m => {
          issues.push({
            campo: t.campo,
            label: '"' + m + '" → "' + right + '"',
            context: t.texto.substring(Math.max(0, t.texto.indexOf(m) - 40), t.texto.indexOf(m) + m.length + 40)
          });
        });
      }
    });
  });
  
  if (issues.length > 0) {
    porGuia[guide.id] = issues;
    total += issues.length;
  }
});

console.log('=== EN TYPO AUDIT ===');
console.log('Total potential typos: ' + total);
console.log('Guides with potential typos: ' + Object.keys(porGuia).length);
console.log('');

Object.entries(porGuia).slice(0, 40).forEach(([id, issues]) => {
  console.log('--- ' + id + ' (' + issues.length + ') ---');
  issues.slice(0, 5).forEach(i => {
    console.log('  ' + i.label);
    console.log('    -> "' + i.context.replace(/\n/g, ' ') + '"');
  });
  if (issues.length > 5) console.log('  ... +' + (issues.length - 5) + ' more');
  console.log('');
});
