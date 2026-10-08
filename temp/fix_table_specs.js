const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const G = JSON.parse(fs.readFileSync(DIR + 'data/guides.json', 'utf8'));
function cell(g, label, i, enFrom, enTo, esFrom, esTo) {
  const r = g.productTable.rows.find(x => x.label === label);
  if (!r) throw new Error('no row ' + label);
  if (r.values[i].value !== enFrom) throw new Error(label + '[' + i + '] EN: ' + r.values[i].value);
  if (r.values[i].value_es !== esFrom) throw new Error(label + '[' + i + '] ES: ' + r.values[i].value_es);
  r.values[i].value = enTo; r.values[i].value_es = esTo;
}
// ---------- best-reverb-delay ----------
{
  const g = G.find(v => v.id === 'best-reverb-delay');
  // TimeLine: 3 footswitches, no knob count claim; SHARC DSP (zzounds verified)
  cell(g, 'Controls', 3, '12 knobs + 2 footswitches + display', 'Knobs + 3 footswitches + display', '12 perillas + 2 footswitches + display', 'Mandos + 3 footswitches + display');
  cell(g, 'DSP / Processing', 3, '—', 'SHARC DSP', '—', 'SHARC DSP');
  // LVX: 3 footswitches
  cell(g, 'Controls', 4, '8 knobs + 3 footswitches + display', 'Knobs + 3 footswitches + display', '8 perillas + 3 footswitches + display', 'Mandos + 3 footswitches + display');
  // Habit: 2 footswitches, no display
  cell(g, 'Controls', 5, '6 knobs + 3 footswitches + display', '6 knobs + 2 footswitches', '6 perillas + 3 footswitches + display', '6 mandos + 2 footswitches');
  // Nemesis: 2 footswitches, no display; real dims 4.5x4.5x2in
  cell(g, 'Controls', 7, '4 knobs + 3 footswitches + display', '4 knobs + 2 footswitches', '4 perillas + 3 footswitches + display', '4 mandos + 2 footswitches');
  cell(g, 'Size', 7, '117 x 112 x 56 mm', '114 x 114 x 51 mm', '117 x 112 x 56 mm', '114 x 114 x 51 mm');
  console.log('reverb table fixed');
}
// ---------- best-looper-pedals ----------
{
  const g = G.find(v => v.id === 'best-looper-pedals');
  // RC-500: 3 footswitches; TWO tracks (Boss specs verified)
  cell(g, 'Controls', 2, '2 footswitches + 3 knobs + display', '3 footswitches + knobs + display', '2 footswitches + 3 perillas + display', '3 footswitches + mandos + display');
  cell(g, 'Standout Feature', 2, '5 tracks, 13 hrs, MIDI, FX', '2 tracks, 13 hrs, MIDI, FX', '5 pistas, 13 hrs, MIDI, FX', '2 pistas, 13 hrs, MIDI, FX');
  // X4: 4 footswitches; TWO tracks, 5 mins (SW/GC/manual verified); real dims 235x145x57 (G4M verified)
  cell(g, 'Controls', 3, '2 footswitches + 3 knobs', '4 footswitches + knobs', '2 footswitches + 3 perillas', '4 footswitches + mandos');
  cell(g, 'Standout Feature', 3, '4 tracks, 7 hrs, MIDI, stereo', '2 tracks, 5 mins, MIDI, stereo', '4 pistas, 7 hrs, MIDI, estéreo', '2 pistas, 5 min, MIDI, estéreo');
  cell(g, 'Size', 3, '138 x 97 x 50 mm', '235 x 145 x 57 mm', '138 x 97 x 50 mm', '235 x 145 x 57 mm');
  // 720: 2 footswitches + knobs + display (EHX manual verified); dims 102x121x57 (zzounds verified); 75mA max (manual verified)
  cell(g, 'Controls', 4, '1 footswitch + 2 knobs', '2 footswitches + knobs + display', '1 footswitch + 2 perillas', '2 footswitches + mandos + display');
  cell(g, 'Size', 4, '121 x 92 x 51 mm', '102 x 121 x 57 mm', '121 x 92 x 51 mm', '102 x 121 x 57 mm');
  cell(g, 'Current Draw', 4, '86 mA', '75 mA', '86 mA', '75 mA');
  cell(g, 'Power', 4, '9V DC', '9V DC (adapter included)', '9V DC', '9V DC (adaptador incluido)');
  console.log('looper table fixed');
}
fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(G, null, 2) + '\n');
console.log('guides.json written');
