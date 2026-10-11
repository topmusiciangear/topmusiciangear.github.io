function parseDeal(text) {
  var wasM = text.match(/Was:\s*(GBP|EUR|\$|£|€)?\s*(\d+(?:\.\d+)?)/);
  var nowM = text.match(/Now:\s*(GBP|EUR|\$|£|€)?\s*(\d+(?:\.\d+)?)/);
  var was = wasM && wasM[2];
  var now = nowM && nowM[2];
  var curTok = (nowM && nowM[1]) || (wasM && wasM[1]) || '';
  var store =
    /Plugin Boutique/i.test(text) ? 'pluginboutique' :
    /Andertons/i.test(text) ? 'andertons' :
    /zZounds/i.test(text) ? 'zzounds' :
    /Music ?Store/i.test(text) ? 'musicstore' :
    /Gear4Music/i.test(text) ? 'gear4music' :
    /Amazon/i.test(text) ? 'amazon' :
    /Reverb/i.test(text) ? 'reverb' : null;
  if (!was || !now || !store) return null;
  var title = text.split('Was:')[0].replace(/\s+/, ' ').trim();
  title = title.replace(/Andertons\s*$/i, '').replace(/Plugin Boutique\s*$/i, '').replace(/zZounds\s*$/i, '').replace(/Music ?Store\s*$/i, '').replace(/Gear4Music\s*$/i, '').replace(/Amazon\s*$/i, '').replace(/Reverb\s*$/i, '').trim();
  if (!title) return null;
  return { title: title, was: Number(was), now: Number(now), store: store, curTok: curTok };
}
[
  'KRK Rokit 5 G5 zZounds Was: $199 -> Now: $149 (-25%) Buy here',
  'Yamaha HS5 Music Store Was: EUR 165 -> Now: EUR 139 Buy here',
  'Shure SM7B Gear4Music Was: GBP 381 -> Now: GBP 349 Buy here',
  'DT 770 Pro Amazon Was: $199 -> Now: $159 Buy here',
  'SSL 2+ Reverb Was: $299 -> Now: $249 Buy here',
  'JBL 305P MkII Andertons Was: GBP 129 -> Now: GBP 112 (-13%) Buy here',
  'Eventide Blackhole Plugin Boutique Was: $99 -> Now: $49 (-51%) Buy here'
].forEach(function (c) { console.log(JSON.stringify(parseDeal(c))); });
