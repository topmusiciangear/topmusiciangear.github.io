var today = '2026-10-11';
function merge(prev, deals) {
  var prevByKey = new Map(prev.map(function (p) { return [p.title + '||' + p.store, p]; }));
  var out = deals.map(function (d) {
    var old = prevByKey.get(d.title + '||' + d.store);
    if (old) { d.date_added = old.date_added || d.date_added; }
    return d;
  });
  var cutoff = new Date(Date.parse(today + 'T00:00:00Z') - 2 * 86400000).toISOString().slice(0, 10);
  prev.forEach(function (p) {
    if (p.source !== 'telegram') return;
    var key = p.title + '||' + p.store;
    if (out.some(function (d) { return (d.title + '||' + d.store) === key; })) return;
    if ((p.last_seen || p.date_added || today) >= cutoff) out.push(p);
    else console.log('  expired, dropped: ' + p.title);
  });
  return out;
}
var prev = [
  { title: 'A', store: 'andertons', source: 'telegram', date_added: '2026-10-08', last_seen: '2026-10-08' }, // 3 days unseen -> drop
  { title: 'B', store: 'zzounds', source: 'telegram', date_added: '2026-10-10' }, // no last_seen, 1 day -> keep
  { title: 'C', store: 'andertons', source: 'telegram', date_added: '2026-10-05', last_seen: '2026-10-10' }, // re-posted below too
  { title: 'D', store: 'gear4music', source: 'gear4music', date_added: '2026-09-01' } // other source -> keep
];
var fresh = [
  { title: 'C', store: 'andertons', source: 'telegram', date_added: today, last_seen: today },
  { title: 'E', store: 'amazon', source: 'telegram', date_added: today, last_seen: today }
];
var out = merge(prev, fresh);
console.log('kept: ' + out.map(function (d) { return d.title; }).join(','));
console.log('C date_added kept: ' + out.filter(function (d) { return d.title === 'C'; })[0].date_added);
