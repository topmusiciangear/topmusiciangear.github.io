const fs = require('fs');
for (const f of ['guides/best-studio-monitors-under-150.html', 'guides/best-studio-monitors-under-150_es.html', 'guides/beginner-bass-guitars.html']) {
  const h = fs.readFileSync(f, 'utf8');
  const spans = h.match(/<span style="margin-left:auto;font-weight:700;color:#fff">(Check price|Verificar precio)<\/span>/g) || [];
  const grey = h.match(/color:#a8a8a8;font-style:italic/g) || [];
  console.log(f.split('/').pop() + ' | white check-price spans: ' + spans.length + ' | grey italic left: ' + grey.length);
}
