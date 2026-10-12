var fs = require('fs');
var s = fs.readFileSync('guides/best-plugins.html', 'utf8');
var i = -1;
while ((i = s.indexOf('gStyle', i + 1)) >= 0) {
  // inside <script>?
  var openScript = s.lastIndexOf('<script', i);
  var closeScript = s.lastIndexOf('</script>', i);
  console.log('gStyle inside-script:' + (openScript > closeScript) + ' :: ' + JSON.stringify(s.slice(i - 40, i + 60)));
}
console.log('==== backslashes ====');
i = -1;
while ((i = s.indexOf("\\'", i + 1)) >= 0) {
  var os = s.lastIndexOf('<script', i);
  var cs = s.lastIndexOf('</script>', i);
  console.log('bs inside-script:' + (os > cs) + ' :: ' + JSON.stringify(s.slice(i - 60, i + 40)));
}
