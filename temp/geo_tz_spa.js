var fs = require('fs');
var f = 'temp/gen-shop-buttons.js';
var s = fs.readFileSync(f, 'utf8');
var a = "      x.onload = function() {\r\n        try {\r\n          var m = /(?:^|\\\\n)loc=(\\\\S+)/.exec(x.responseText);\r\n          if (m && m[1]) finish(m[1]);\r\n        } catch (e) {}\r\n        clearPending();\r\n      };\r\n      x.onerror = x.ontimeout = function() { clearPending(); };";
if (s.indexOf(a) < 0) { console.log('NOT FOUND'); process.exit(1); }
var b = "      x.onload = function() {\r\n        try {\r\n          var m = /(?:^|\\\\n)loc=(\\\\S+)/.exec(x.responseText);\r\n          if (m && m[1]) { finish(m[1]); return; }\r\n        } catch (e) {}\r\n        tzFallback();\r\n      };\r\n      x.onerror = x.ontimeout = function() { tzFallback(); };";
s = s.split(a).join(b);
var c = "    y.onerror = y.ontimeout = function() { trySecond(); };";
var d = c + "\r\n    function tzFallback() {\r\n      try { if (window.__tmgGeoResolved) return; } catch (e) {}\r\n      var tz='';\r\n      try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) {}\r\n      if (/^Europe\\//.test(tz)) { applyNow('musicstore'); }\r\n      try { clearPending(); } catch (e) {}\r\n    }";
if (s.indexOf(c) < 0) { console.log('C2 NOT FOUND'); process.exit(1); }
s = s.split(c).join(d);
fs.writeFileSync(f, s);
console.log('spa tz fallback OK');
