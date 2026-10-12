var fs = require('fs');
var f = 'build-guides.js';
var s = fs.readFileSync(f, 'utf8');
var a = "y.onload=function(){\r\n    try{var r=JSON.parse(y.responseText);if(r&&r.country)gApply(r.country);}catch(e){}\r\n    gTrace();\r\n  };\r\n  y.onerror=y.ontimeout=function(){gTrace();};\r\n  y.send();";
if (s.indexOf(a) < 0) { console.log('NOT FOUND'); process.exit(1); }
var b = "y.onload=function(){\r\n    try{var r=JSON.parse(y.responseText);if(r&&r.country){gApply(r.country);return;}}catch(e){}\r\n    gSecond();\r\n  };\r\n  y.onerror=y.ontimeout=function(){gSecond();};\r\n  y.send();\r\n  function gSecond(){\r\n    if(gres)return;\r\n    var q=new XMLHttpRequest();\r\n    q.open('GET','https://ipapi.co/json/',true);\r\n    q.timeout=4000;\r\n    q.onload=function(){\r\n      try{var r2=JSON.parse(q.responseText);if(r2&&r2.country_code){gApply(r2.country_code);return;}}catch(e){}\r\n      gTrace();\r\n    };\r\n    q.onerror=q.ontimeout=function(){gTrace();};\r\n    q.send();\r\n  }";
s = s.split(a).join(b);
fs.writeFileSync(f, s);
console.log('fallback OK');
