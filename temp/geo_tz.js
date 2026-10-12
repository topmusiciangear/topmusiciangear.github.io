var fs = require('fs');
var f = 'build-guides.js';
var s = fs.readFileSync(f, 'utf8');
var a = "t.onload=function(){\r\n      try{var m=/(?:^|\\\\n)loc=(\\\\S+)/.exec(t.responseText);if(m&&m[1])gApply(m[1]);}catch(e){}\r\n    };\r\n    t.send();";
if (s.indexOf(a) < 0) { console.log('NOT FOUND'); process.exit(1); }
var b = "t.onload=function(){\r\n      try{var m=/(?:^|\\\\n)loc=(\\\\S+)/.exec(t.responseText);if(m&&m[1]){gApply(m[1]);return;}}catch(e){}\r\n      gTz();\r\n    };\r\n    t.onerror=t.ontimeout=function(){gTz();};\r\n    t.send();";
s = s.split(a).join(b);
var c = "  y.onerror=y.ontimeout=function(){gSecond();};";
var d = c + "\r\n  function gTz(){\r\n    if(typeof gres!=='undefined'&&gres)return;\r\n    var tz='';try{tz=Intl.DateTimeFormat().resolvedOptions().timeZone||'';}catch(e){}\r\n    if(/^Europe\\//.test(tz)){try{gres=true;}catch(e){}applyNow('musicstore');}\r\n  }";
if (s.indexOf(c) < 0) { console.log('C2 NOT FOUND'); process.exit(1); }
s = s.split(c).join(d);
fs.writeFileSync(f, s);
console.log('guides tz fallback OK');
