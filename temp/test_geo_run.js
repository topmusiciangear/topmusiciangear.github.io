// harness: RO user, all XHR fail -> expect musicstore primary via TZ fallback
var XHRS = [];
global.XMLHttpRequest = function () {
  this.timeout = 0;
  this.open = function () {};
  this.send = function () { XHRS.push(this); };
  this.failAll = function () {};
};
global.Intl = { DateTimeFormat: function () { return { resolvedOptions: function () { return { timeZone: 'Europe/Bucharest' }; } }; } };
var captured = null;
function fakeRow(store, href) {
  return {
    getAttribute: function (k) { return k === 'href' ? href : null; },
    setAttribute: function () {},
    style: {},
    querySelector: function () { return null; }
  };
}
var pb = {
  getAttribute: function (k) {
    if (k === 'data-store') return 'amazon';
    if (k === 'href') return 'https://amazon.com/dp/X';
    return null;
  },
  setAttribute: function () {},
  insertAdjacentHTML: function (pos, html) { captured = html; },
  remove: function () {},
  querySelector: function () { return null; }
};
var card = {
  querySelector: function (sel) {
    if (sel === '.shop-btn-primary') return pb;
    if (sel === '.shop-more-list') return null;
    var m = sel.match(/\[data-store="([^"]+)"\]/);
    if (m) return m[1] === 'musicstore' ? fakeRow(m[1], 'https://musicstore.com/p') : null;
    return null;
  }
};
global.document = {
  documentElement: { lang: 'es' },
  querySelectorAll: function () { return [card]; }
};
global.window = global;
require('./inline_geo_run.js');
setTimeout(function () {
  for (var k = 0; k < 6; k++) { XHRS.forEach(function (x) { if (!x._f) { x._f = 1; if (x.onerror) x.onerror(); } }); }
  setTimeout(function () {
    if (!captured) { console.log('FAIL: no swap happened'); process.exit(1); }
    console.log('swapped primary contains Music Store: ' + (captured.indexOf('Music Store') >= 0));
    console.log('amber: ' + (captured.indexOf('color:#FFC107') >= 0));
    console.log('Comprar en: ' + (captured.indexOf('Comprar en') >= 0));
  }, 50);
}, 50);
