var fs = require('fs');
var P = 'C:/Users/Daniel/projects/topmusiciangear/';
var guides = JSON.parse(fs.readFileSync(P + 'data/guides.json', 'utf8'));
function bySlug(s) { return guides.filter(function (x) { return (x.slug || x.id) === s; })[0]; }
function rep(gname, path, a, b, expect) {
  var g = bySlug(gname);
  var parts = path.replace(/\[(\d+)\]/g, '.$1').split('.');
  var o = g;
  for (var i = 0; i < parts.length - 1; i++) o = o[parts[i]];
  var k = parts[parts.length - 1];
  var c = o[k].split(a).length - 1;
  if (c !== expect) { console.log('COUNT ' + c + '!=' + expect + ': ' + gname + ' ' + path + ' :: ' + a.slice(0, 60)); process.exit(1); }
  o[k] = o[k].split(a).join(b);
}
var S = 'best-hardware-samplers';
// ---- 75,000 fabrications -> honest scale ----
rep(S, 'sections[1].content', 'users rate it 4.8/5 across over 75,000 reviews \u2014 more proof', 'users rate it 4.8/5 across thousands of reviews \u2014 more proof', 1);
rep(S, 'sections[1].content_es', 'lo valoran con 4.8/5 en m\u00e1s de 75,000 rese\u00f1as \u2014 m\u00e1s pruebas', 'lo valoran con 4.8/5 en miles de rese\u00f1as \u2014 m\u00e1s pruebas', 1);
rep(S, 'conclusion', 'at 4.8/5 across 75,000+ reviews', 'at 4.8/5 across thousands of reviews', 1);
rep(S, 'conclusion_es', 'con 4.8/5 en m\u00e1s de 75,000 rese\u00f1as', 'con 4.8/5 en miles de rese\u00f1as', 1);
rep(S, 'featuredSnippet.text_en', '4.8/5 rating across 75,000+ reviews', '4.8/5 rating across thousands of reviews', 1);
rep(S, 'featuredSnippet.text_es', 'valoraci\u00f3n 4.8/5 en m\u00e1s de 75,000 rese\u00f1as', 'valoraci\u00f3n 4.8/5 en miles de rese\u00f1as', 1);
rep(S, 'featuredSnippet.faq_a1_en', 'a 4.8/5 rating across 75,000+ reviews', 'a 4.8/5 rating across thousands of reviews', 1);
rep(S, 'featuredSnippet.faq_a1_es', 'una valoraci\u00f3n 4.8/5 en m\u00e1s de 75,000 rese\u00f1as', 'una valoraci\u00f3n 4.8/5 en miles de rese\u00f1as', 1);
// ---- drum One G2: twice -> four times ----
rep('best-drum-machine', 'sections[4].content', 'now with twice the processing power', 'now with four times the processing power', 1);
rep('best-drum-machine', 'sections[4].content_es', 'ahora optimizada con el doble de potencia de procesamiento', 'ahora optimizada con cuatro veces m\u00e1s potencia de procesamiento', 1);
rep('best-drum-machine', 'verdictProsCons[4].pros_es[0]', 'doble de potencia de procesamiento', 'cuatro veces m\u00e1s potencia de procesamiento', 1);
rep('best-drum-machine', 'verdictProsCons[4].pros[0]', 'twice the processing power', 'four times the processing power', 1);
// drum V4 4th con: black-design (false, G2 is blue) -> Pro Pack cost (verified)
rep('best-drum-machine', 'verdictProsCons[4].cons[3]', 'Drops its classic red paint for a sober black design', 'Pro Stems separation and Super Warp cost extra via the Pro Pack', 1);
rep('best-drum-machine', 'verdictProsCons[4].cons_es[3]', 'Se despide de su cl\u00e1sica pintura roja para adoptar un dise\u00f1o sobrio en color negro', 'La separaci\u00f3n Stems Pro y el Super Warp cuestan aparte con el Pro Pack', 1);
// ---- best-samplers SEC3 EN: weight + outputs ----
rep('best-samplers-drum-computers', 'sections[3].content', 'a lithium battery and a speaker built into the box', 'a lithium battery and speakers built into the box', 1);
rep('best-samplers-drum-computers', 'sections[3].content', 'At 2.2 kg it is no pocket toy, there is still a single stereo out,', 'At 3.9 kg it is no pocket toy, but you still get six independent physical outputs,', 1);
fs.writeFileSync(P + 'data/guides.json', JSON.stringify(guides, null, 2));
console.log('spec fixes done');
