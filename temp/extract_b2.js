const G = require('../data/guides.json');
const P = require('../data/products.json');
const g = (id) => G.find(x => x.id === id);
const J = (v) => JSON.stringify(v);
const L = (id, f) => console.log(id + '|' + f + ':', J(g(id)[f]));
// catalog prices
[117, 20].forEach(id => { const p = P.find(x => x.id === id); console.log('prod' + id, p.title, p.price); });
// me90 MX5 occurrences
const me = g('me90-vs-mx5');
let s = JSON.stringify(me);
console.log('MX5 count:', (s.match(/MX5/g) || []).length);
me.sections.forEach((x, i) => { ['content', 'content_es'].forEach(f => { if ((x[f] || '').includes('MX5')) console.log('me90 sec' + i + '.' + f + ':', J(x[f])); }); });
// jbl exact
console.log('jbl verdict_es:', J(g('jbl-vs-kali').verdict_es));
// best-interface labels
const bi = g('best-interface');
console.log('bi table labels:', J(bi.productTable.rows.map(r => [r.label, r.label_es])));
console.log('bi stick:', J((bi.intro_es.match(/.{0,60}stick.{0,60}/) || ['?'])[0]));
// budget-mics
console.log('bmics intro_es head:', J(g('budget-mics').intro_es.slice(0, 400)));
// scarlett-vs-motu 4
const sm = g('scarlett-vs-motu');
console.log('sm s2h_es:', J(sm.sections[2].heading_es));
console.log('sm s4h_es:', J(sm.sections[4].heading_es));
console.log('sm s0es:', J((sm.sections[0].content_es.match(/.{0,50}USB-C.{0,80}/) || ['?'])[0]));
console.log('sm s1es:', J((sm.sections[1].content_es.match(/.{0,50}sentarse.{0,50}/) || ['?'])[0]));
// budget-monitors ES conclusion has no placeholder - confirm IN-8 line
console.log('bmon es83:', J((g('budget-monitors').conclusion_es.match(/Kali IN-8.{0,80}/) || ['?'])[0]));
// kh7050 ES
const kh = g('kh750-vs-7050c');
const v = kh.verdictProsCons.find(x => /7050/.test(x.name));
console.log('7050 pros_es:', J(v.pros_es), 'cons_es:', J(v.cons_es));
// apollo verdict
console.log('apollo verdict_es:', J(g('apollo-vs-babyface').verdict_es));
// hs8 costear
console.log('hs8 verdict_es:', J((g('hs8-vs-rokit-7').verdict_es.match(/.{0,40}costear.{0,60}/) || ['?'])[0]));
// hd490 exact entry
const hd = g('hd490-pro-vs-dt990');
hd.verdictProsCons.forEach(x => console.log('hd', J(x.name), J(x.cons_es)));
// wi exacts already have; fenderbass exact phrase
console.log('fb phrase:', J('líneas palm-muted'));
// m50x exact
const m50 = g('m50x-vs-mdr7506');
(m50.verdictProsCons || []).forEach(x => console.log('m50', J(x.name), J(x.cons_es)));
// player strat
const ps = g('player-strat-vs-pacifica');
(ps.verdictProsCons || []).forEach(x => console.log('ps', J(x.name), J(x.pros_es)));
// volt heading
console.log('volt s1h_es:', J(g('scarlett-vs-volt').sections[1].heading_es));
// ssl EN already have
// monitors revelan/masegura
const bm = g('best-monitors');
console.log('bm revelan:', J((bm.intro_es.match(/.{0,40}revelan.{0,10}/) || ['?'])[0]));
(bm.verdictProsCons || []).forEach(x => (x.pros_es || []).forEach(t => { if (/segura/.test(t)) console.log('bm pros_es:', J(t)); }));
// k371
console.log('k371 intro:', J(g('k371-vs-mdr7506').intro));
// blx288
const bl = g('blx288-vs-ewd');
console.log('bl v:', J((bl.verdictProsCons || []).map(x => [x.name, x.pros_es, x.cons_es])));
// stage-wireless
const sw = g('stage-wireless');
console.log('sw s2h_es:', J(sw.sections[2].heading_es), '| concl_es tail:', J((sw.conclusion_es || '').slice(-200)));
// fabfilter
console.log('fab s1h_es:', J(g('fabfilter-vs-ozone').sections[1].heading_es));
// daw beginners
const db = g('best-daw-for-beginners');
console.log('db s2:', J((db.sections[2].content || '').slice(0, 200)), '| concl:', J(db.conclusion));
// grooveboxes
const gr = g('best-grooveboxes');
console.log('gr s1h_es:', J(gr.sections[1].heading_es));
(gr.verdictProsCons || []).forEach(x => (x.pros_es || []).forEach(t => { if (/Elektron/.test(t)) console.log('gr pros_es:', J(t)); }));
// reverb-delay
const rd = g('best-reverb-delay');
console.log('rd s0:', J((rd.sections[0].content || '').match(/.{0,60}consider ambiance.{0,40}/)));
console.log('rd s1h_es:', J(rd.sections[1].heading_es));
// precision
const pj = g('precision-vs-jazz');
console.log('pj duff:', J((pj.sections[1].content.match(/.{0,30}McKagall.{0,30}/) || ['?'])[0]));
console.log('pj why:', J((pj.sections[1].content.match(/.{0,40}This why.{0,40}/) || ['?'])[0]));
// budget-basslike
const bb = g('budget-bass-like-expensive');
console.log('bb intro:', J(bb.intro), '| intro_es:', J(bb.intro_es));
// pro-monitors S-ART
const pm = g('pro-monitors');
console.log('pm intro:', J((pm.intro.match(/.{0,30}ART.{0,40}/) || ['?'])[0]), '| concl:', J((pm.conclusion.match(/.{0,30}ART.{0,40}/) || ['?'])[0]));
// beat-making
console.log('bmk:', J((g('beat-making').sections[0].content_es.match(/.{0,40}ordenador.{0,40}/) || ['?'])[0]));
// stage-wedges
console.log('swd s2h_es:', J(g('stage-wedges').sections[2].heading_es));
// stream-deck
console.log('sd:', J((g('stream-deck-plus-xl-vs-razer').sections[0].content_es.match(/.{0,50}convierten.{0,50}/) || ['?'])[0]));
// electric-guitars-2026
console.log('eg26 title_es:', J(g('best-electric-guitars-2026').title_es));
// shotgun
console.log('sg:', J((g('best-shotgun-mics').sections[0].content_es.match(/.{0,50}húmedas.{0,30}/) || ['?'])[0]));
// 5-string medium
console.log('b5:', J((g('best-5-string-basses').sections[1].content_es.match(/.{0,40}medium.{0,30}/) || ['?'])[0]));
// ts9 full intro + looper full intro
console.log('ts9 intro_es:', J(g('ts9-vs-bd2').intro_es));
console.log('looper intro_es:', J(g('best-looper-pedals').intro_es));
// digital-mixers exacts
const dm = g('best-digital-mixers');
console.log('dm intro_es head:', J(dm.intro_es.slice(0, 300)));
console.log('dm concl_es tail:', J((dm.conclusion_es || '').slice(-300)));
// nord exacts
const nd = g('nord-stage-4-vs-montage-m8x');
console.log('nd intro:', J((nd.intro.match(/.{0,40}organd.{0,40}/) || ['?'])[0]), '| verdict_es tail:', J((nd.verdict_es || '').slice(-60)), '| title_es:', J(nd.title_es));
// beginner-bass exact
console.log('bbass intro:', J((g('beginner-bass-guitars').intro.match(/.{0,40}instrument.{0,20}/) || ['?'])[0]));
// pro-interfaces exacts
const pi = g('pro-interfaces');
console.log('pi intro_es:', J((pi.intro_es.match(/.{0,50}proceso.{0,40}/) || ['?'])[0]), '| s1h_es:', J(pi.sections[1].heading_es));
// pro-plugins
console.log('pp intro_es tail:', J((g('pro-plugins').intro_es || '').slice(-120)));
// nx912 exacts
const nx = g('nx912-vs-pxm12mp');
console.log('nx verdict:', J((nx.verdict.match(/.{0,30}912-SMA.{0,20}/) || ['?'])[0]), '| verdict_es cuna:', J((nx.verdict_es.match(/.{0,50}como caja.{0,30}/) || ['?'])[0]));
// mics creators exacts
const mc = g('mics-for-creators');
console.log('mc intro_es:', J((mc.intro_es.match(/.{0,40}voiceovers.{0,40}/) || ['?'])[0]));
// wireless rig exacts
const wr = g('best-wireless-iems');
console.log('wr intro_es:', J((wr.intro_es.match(/.{0,40}rig.{0,40}/) || ['?'])[0]), '| concl_es:', J((wr.conclusion_es.match(/.{0,40}rigs.{0,40}/) || ['?'])[0]));
// beatmaker exacts
const bmk = g('beatmaker-plugins');
console.log('bmk intro_es:', J((bmk.intro_es.match(/.{0,50}[Cc]ortes.{0,60}/) || ['?'])[0]), '| verdict_es:', J((bmk.verdict_es.match(/.{0,40}vibra.{0,30}/) || ['?'])[0]));
// bh done; budget-headphones done above
// micro vsM58
const mi = g('best-microphone');
console.log('mi concl:', J((mi.conclusion.match(/.{0,20}vsM58.{0,20}/) || ['?'])[0]), '| concl_es:', J((mi.conclusion_es.match(/.{0,20}vs M58.{0,20}/) || ['?'])[0]));
// stage-mics tha
const smi = g('stage-mics');
console.log('smi s8:', J(((smi.sections[8].content || '').match(/.{0,40}tha cardioid.{0,20}/) || ['?'])[0]));
// guitar-bass-amps
console.log('gba intro:', J((g('guitar-bass-amps').intro.match(/.{0,30}amp you choose.{0,30}/) || ['?'])[0]));
// daw-guide
const dw = g('daw-guide');
console.log('dw pros_es:', J(((dw.verdictProsCons[0].pros_es || []).find(t => /pago/.test(t)) || '?')));
// electric-guitar euro
const eg = g('best-electric-guitar');
eg.verdictProsCons.forEach(x => (x.pros_es || []).forEach(t => { if (/por euro/.test(t)) console.log('eg pros_es:', J(t)); }));
// re20
console.log('re20:', J(((g('re20-vs-sm7b').sections[1].content || '').match(/.{0,30}This why.{0,40}/) || ['?'])[0]));
// american-pro
console.log('ap:', J(((g('american-pro-vs-les-paul').sections[1].content_es || '').match(/.{0,60}atornillados.{0,60}/) || ['?'])[0]));
// katana
console.log('ka:', J(((g('katana-vs-dsl').sections[2].content_es || '').match(/.{0,30}neros.{0,30}/) || ['?'])[0]));
// samplers
const sa = g('best-samplers-drum-computers');
(sa.verdictProsCons || []).forEach(x => (x.cons_es || []).forEach(t => { if (/bateria/.test(t)) console.log('sa cons_es:', J(t)); }));
// overdrive
console.log('od:', J(((g('best-overdrive-distortion').sections[1].content || '').match(/Every guitarist needs one of these.{0,30}/) || ['?'])[0]));
// digital-pianos
const dp = g('best-digital-pianos');
dp.verdictProsCons.forEach(x => (x.pros_es || []).forEach(t => { if (/seamless/.test(t)) console.log('dp pros_es:', J(t)); }));
// xr18
const xr = g('xr18-vs-m32r');
(xr.verdictProsCons || []).forEach(x => (x.pros || []).forEach(t => { if (/M32R's/.test(t)) console.log('xr pros:', J(t)); }));
// active
console.log('ac:', J(((g('active-vs-passive-pa').sections[0].content || '').match(/.{0,40}amplifier built.{0,20}/) || ['?'])[0]));
// pro-microphones
console.log('pmic:', J(((g('pro-microphones').sections[2].content || '').match(/.{0,30}innovative dual.{0,30}/) || ['?'])[0]));
// pro-synths
const psyn = g('pro-synths');
(psyn.verdictProsCons || []).forEach(x => (x.pros || []).forEach(t => { if (/than the this/.test(t)) console.log('psyn pros:', J(t)); }));
// pro-daw
const pd = g('pro-daw');
console.log('pd concl_es:', J((pd.conclusion_es.match(/.{0,30}referencia.{0,20}/) || ['?'])[0]), '| sec0:', J(((pd.sections[0].content_es || '').match(/.{0,30}referencia.{0,20}/) || ['?'])[0]));
// instrument
console.log('ins:', J(((g('best-instrument-mics').sections[6].content || '').match(/.{0,30}ngand.{0,30}/) || ['?'])[0] || ((g('best-instrument-mics').sections[6].content || '').match(/.{0,30}ong.{0,30}/) || ['?'])[0]));
// streaming
console.log('st:', J(((g('streaming-interfaces').intro || '').match(/.{0,40}tha good mic.{0,20}/) || ['?'])[0]));
// rodecaster
const rc = g('rodecaster-pro2-vs-dlz-creator');
console.log('rc h0:', J(rc.sections[0].heading_es), '| h2:', J(rc.sections[2].heading_es));
// ai-tools
console.log('ai:', J(((g('ai-tools-plugins').sections[2].content || '').match(/.{0,40}remain control.{0,20}/) || ['?'])[0]));
// di-box
console.log('di:', J(((g('di-box').sections[1].content_es || '').match(/.{0,40}fusión.{0,30}/) || ['?'])[0]));
// usb-mics
const um = g('usb-mics');
(um.verdictProsCons || []).forEach(x => (x.cons_es || []).forEach(t => { if (/float/.test(t)) console.log('um cons_es:', J(t)); }));
// tracking
console.log('tr:', J(((g('tracking-headphones').sections[0].content_es || '').match(/.{0,40}Ya grabes.{0,40}/) || ['?'])[0]));
// amp-modelers
const am = g('best-amp-modelers');
console.log('am h1:', J(am.sections[1].heading_es), '| h2:', J(am.sections[2].heading_es));
// ie900
const ie = g('ie900-vs-se846');
(ie.verdictProsCons || []).forEach(x => (x.pros_es || []).forEach(t => { if (/supera en precio/.test(t)) console.log('ie pros_es:', J(t)); }));
// ribbon
const rb = g('best-ribbon-mics');
console.log('rb title_es:', J(rb.title_es), '| intro_es head:', J((rb.intro_es || '').slice(0, 150)));
// in-ear
const iear = g('best-in-ear-monitors');
(iear.verdictProsCons || []).forEach(x => { (x.pros_es || []).forEach(t => { if (/orejas pequeñas/.test(t)) console.log('iear pros_es:', J(t)); }); (x.cons_es || []).forEach(t => { if (/clip camisa/.test(t)) console.log('iear cons_es:', J(t)); }); });
// fender-guide
console.log('fg:', J(((g('fender-guide').sections[1].content_es || '').match(/.{0,30}corta través.{0,30}/) || ['?'])[0]));
// live-sound-pa
const ls = g('live-sound-pa');
console.log('ls s0:', J(((ls.sections[0].content_es || '').match(/.{0,40}mezcladoras.{0,40}/) || ['?'])[0]), '| s2h:', J(ls.sections[2].heading_es));
// beginner-electric
console.log('be:', J(((g('best-beginner-electric-guitar').sections[1].content_es || '').match(/.{0,40}Menos de unos.{0,40}/) || ['?'])[0]));
// bass-practice
console.log('bp:', J(((g('best-bass-practice-amps').sections[1].content_es || '').match(/.{0,40}con tono con.{0,40}/) || ['?'])[0]));
// compact-mixers
const cm = g('best-compact-mixers');
console.log('cm verdict_es:', J((cm.verdict_es.match(/.{0,40}mixer.{0,40}/) || ['?'])[0]));
// ableton-logic
console.log('al:', J(((g('ableton-vs-logic').sections[0].content_es || '').match(/.{0,50}por tu dinero.{0,20}/) || ['?'])[0]));
// pro-headphones
console.log('ph:', J((g('pro-headphones').verdict_es.match(/.{0,50}futuro audiófilo.{0,20}/) || ['?'])[0]));
// pro-basses
const pb = g('pro-basses');
(pb.verdictProsCons || []).forEach(x => (x.cons_es || []).forEach(t => { if (/morir/.test(t)) console.log('pb cons_es:', J(t)); }));
// pro-mixers
const pmx = g('pro-mixers');
(pmx.verdictProsCons || []).forEach(x => (x.cons_es || []).forEach(t => { if (/Pesado/.test(t)) console.log('pmx cons_es:', J(t)); }));
// guitar-pedals
console.log('gp:', J(((g('guitar-pedals').intro_es || '').match(/.{0,50}bloques.{0,50}/) || ['?'])[0]));
// budget-interfaces piloto
console.log('bif:', J((g('budget-interfaces').verdict_es.match(/.{0,50}piloto automático.{0,30}/) || ['?'])[0]));
// dt770 jugada
const dt = g('dt770-vs-dt990');
console.log('dt verdict_es tail:', J((dt.verdict_es || '').slice(-150)));
// drum-machine beat
const dru = g('best-drum-machine');
console.log('dru intro:', J((dru.intro.match(/.{0,40}beat making.{0,30}/) || ['?'])[0]), '| intro_es:', J((dru.intro_es.match(/.{0,40}beat making.{0,30}/) || ['?'])[0]));
// adam period
console.log('ad intro_es tail:', J((g('adam-vs-genelec').intro_es || '').slice(-80)));
// zlx period
console.log('zlx intro_es tail:', J((g('zlx-vs-k12').intro_es || '').slice(-80)));
// ableton-fl vista
console.log('afl:', J(((g('ableton-vs-fl-studio').sections[0].content_es || '').match(/.{0,40}Vista Session.{0,40}/) || ['?'])[0]));
// guitar-home-office exacts
const gho = g('best-guitar-home-office');
console.log('gho intro:', J((gho.intro.match(/.{0,40}Enyand.{0,40}/) || ['?'])[0]), '| title_es:', J(gho.title_es), '| intro_es:', J((gho.intro_es.match(/.{0,60}headless.{0,40}/) || ['?'])[0]));
// practice-amps presets
const pa = g('best-practice-amps');
console.log('pa verdict_es:', J((pa.verdict_es.match(/.{0,40}presets.{0,30}/) || ['?'])[0]));
// pro-interfaces proceso
console.log('pif:', J(((g('pro-interfaces').intro_es.match(/.{0,50}proceso UAD.{0,30}/) || ['?'])[0])));
// pro-plugins period
console.log('pp tail:', J((g('pro-plugins').intro_es || '').slice(-100)));
// looper full (already have)
// mixing exacts
const mx2 = g('mixing-plugins');
console.log('mx intro_es:', J((mx2.intro_es.match(/.{0,50}recall.{0,30}/) || ['?'])[0]), '| verdict_es:', J((mx2.verdict_es.match(/.{0,40}pumping.{0,30}/) || ['?'])[0]));
// studio-subwoofers
console.log('ss intro:', J(((g('studio-subwoofers').intro || '').match(/Finding accurate studio subwoofer.{0,20}/) || ['?'])[0]));
// trailing titles
['studio-subwoofers', 'best-plugins', 'adam-vs-genelec', 'best-headphones-for-mixing'].forEach(id => { const x = g(id); console.log(id, 'T:', J(x.title), '| Tes:', J(x.title_es)); });
// open-headphones verdict
console.log('oh verdict_es:', J(g('open-headphones').verdict_es));
// daw-beginners exacts
console.log('db done above');
// beginner-guitar action exact phrases (already have snippets; use regex replace in fix)
// fenderbass done; sm7b done; sc done; bg done