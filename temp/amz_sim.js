const STOP = new Set(['the','a','an','and','or','of','for','with','in','on','to','by','new','plus','pro','series','model','pack','pair','set','kit','unit','single','gen','generation','edition','version','original','genuine','brand','best','top','full','size','large','small','medium','black','white','type','style','premium','professional','studio','quality','hot','sale','deal','free','shipping','us','usa','uk','au','value','upgrade','bundle','system','monitor','speakers','speaker','color','colour','finish','includes','included','comes','warranty']);

const BRANDS = new Set(['shure','rode','sennheiser','neumann','akg','fender','squier','gibson','epiphone','taylor','martin','prs','yamaha','arturia','behringer','midas','roland','krk','telarc','hifiman','focal','quad','genelec','positive','grid','audio','technica','beyerdynamic','allen','heath','universal','ssl','solid','state','logic','ev','electro','voice','marshall','orange','boss','walrus','tascam','adam','soundcraft','presonus','avid','mackie','systems','turbosound','hollyland','dji','fifine','maono','tonor','elgato','razer','hyperx','beacn','lava','music','enya','donner','headrush','dynaudio','rcf','telefunken','logitech','blue','ik','multimedia','ix','mxl','chase','boss','carvin','vault','citronic','novation','sequential','asm','radial','rupert','neve','tech','whirlwind','lavie','yamaha','vox','bugera','zoom','nady','saramonic','jbl','ld','iq','auralex','xl','audio','auralex','daddys','dakko','boom','z','v','belt','drive','the','lab','audio','cary','mark','bass','gear','vintage','series','tone','black','series','ii','iii','iv','v','plus','mk','mkh','dm','ps','ep','sp','bl','d40','m40','m30','xlr','usb','type','interface','mixer','monitor','keyboard','piano','guitar','bass','drums','vocal','wireless','wired','digital','analog','studio','monitor','speaker','sub','preamp','pre','amp','channel','channels','mk','ii','mkii','mark','ii']);

function norm(s) {
  return (s || '').toLowerCase()
    .replace(/&amp;/g, ' and ').replace(/&[a-z0-9]+;/g, ' ')
    .replace(/ø/g, 'o').replace(/æ/g, 'ae').replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '');
}

function tokens(s) {
  return (s || '').toLowerCase()
    .replace(/&amp;/g, ' and ').replace(/&[a-z0-9]+;/g, ' ')
    .replace(/ø/g, 'o').replace(/æ/g, 'ae').replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, ' ')
    .split(' ')
    .filter(w => w.length >= 2);
}

function similarity(ours, theirs) {
  const all = tokens(ours);
  if (!all.length) return { score: 1, missing: [] };
  const model = all.filter(w => /\d/.test(w) || (w.length >= 4 && !STOP.has(w) && !BRANDS.has(w)));
  const use = model.length ? model : all.filter(w => !BRANDS.has(w));
  if (!use.length) return { score: 1, missing: [] };
  const flat = norm(theirs);
  let hit = 0;
  const missing = [];
  use.forEach(w => {
    if (flat.includes(norm(w))) hit++;
    else missing.push(w);
  });
  return { score: +(hit / use.length).toFixed(2), missing };
}

module.exports = { norm, tokens, similarity, STOP, BRANDS };
