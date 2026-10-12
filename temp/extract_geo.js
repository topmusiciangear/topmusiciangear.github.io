var fs = require('fs');
var s = fs.readFileSync('guides/best-plugins_es.html', 'utf8');
var anchor = s.indexOf('function tmgIsEsDoc');
var start = s.lastIndexOf('<script', anchor);
var end = s.indexOf('</script>', anchor);
var js = s.slice(start, end);
// strip the <script...> tag itself for node --check
js = js.replace(/^<script[^>]*>/, '');
fs.writeFileSync('temp/inline_geo.js', js);
console.log('extracted ' + js.length + ' chars, starts: ' + JSON.stringify(js.slice(0, 60)));
