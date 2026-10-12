var fs = require('fs');
var f = 'temp/gen-shop-buttons.js';
var s = fs.readFileSync(f, 'utf8');
var a = "    y.onload = function() {\r\n      try {\r\n        var r = JSON.parse(y.responseText);\r\n        if (r && r.country) finish(r.country);\r\n      } catch (e) {}\r\n      tryTrace();\r\n    };\r\n    y.onerror = y.ontimeout = function() { tryTrace(); };";
if (s.indexOf(a) < 0) { console.log('NOT FOUND'); process.exit(1); }
var b = "    y.onload = function() {\r\n      try {\r\n        var r = JSON.parse(y.responseText);\r\n        if (r && r.country) { finish(r.country); return; }\r\n      } catch (e) {}\r\n      trySecond();\r\n    };\r\n    y.onerror = y.ontimeout = function() { trySecond(); };\r\n    function trySecond() {\r\n      var q = new XMLHttpRequest();\r\n      q.open('GET', 'https://ipapi.co/json/', true);\r\n      q.timeout = 4000;\r\n      q.onload = function() {\r\n        try {\r\n          var r2 = JSON.parse(q.responseText);\r\n          if (r2 && r2.country_code) { finish(r2.country_code); return; }\r\n        } catch (e) {}\r\n        tryTrace();\r\n      };\r\n      q.onerror = q.ontimeout = function() { tryTrace(); };\r\n      q.send();\r\n    }";
s = s.split(a).join(b);
fs.writeFileSync(f, s);
console.log('spa fallback OK');
