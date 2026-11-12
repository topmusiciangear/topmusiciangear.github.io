var fs = require('fs');

// Fix main HTML
var g = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/best-beginner-electric-guitar.html', 'utf8');
var ts = g.indexOf('<tbody>');
var te = g.indexOf('</tbody>', ts);
var t = g.slice(ts, te + 8);

// Row 6 (Scale Length) - add missing 10th value '25.5 in (648 mm)'
// Current: ...24.75 in (628 mm)</td></tr>
// Need to add the 10th value before </tr>
t = t.replace(
  '<td>Scale Length</td><td>25.5 in (648 mm)</td><td>25.5 in (648 mm)</td><td>25.5 in (648 mm)</td><td>24.75 in (628 mm)</td><td>25.5 in (648 mm)</td><td>25.5 in (648 mm)</td><td>24 in (610 mm)</td><td>24.75 in (629 mm)</td><td>24.75 in (628 mm)</td></tr>',
  '<td>Scale Length</td><td>25.5 in (648 mm)</td><td>25.5 in (648 mm)</td><td>25.5 in (648 mm)</td><td>24.75 in (628 mm)</td><td>25.5 in (648 mm)</td><td>25.5 in (648 mm)</td><td>24 in (610 mm)</td><td>24.75 in (629 mm)</td><td>24.75 in (628 mm)</td><td>25.5 in (648 mm)</td></tr>'
);

// Row 9 (Weight) - add missing 10th value '~6.8 lb (3.1 kg)'
t = t.replace(
  '<td>Weight</td><td>~7.5 lb (3.4 kg)</td><td>~7.5 lb (3.4 kg)</td><td>~7.0 lb (3.2 kg)</td><td>~7.5 lb (3.4 kg)</td><td>~7.5 lb (3.4 kg)</td><td>~7.7 lb (3.5 kg)</td><td>~6.0 lb (2.7 kg)</td><td>~6.0 lb (2.7 kg)</td><td>~7.7 lb (3.5 kg)</td></tr>',
  '<td>Weight</td><td>~7.5 lb (3.4 kg)</td><td>~7.5 lb (3.4 kg)</td><td>~7.0 lb (3.2 kg)</td><td>~7.5 lb (3.4 kg)</td><td>~7.5 lb (3.4 kg)</td><td>~7.7 lb (3.5 kg)</td><td>~6.0 lb (2.7 kg)</td><td>~6.0 lb (2.7 kg)</td><td>~7.7 lb (3.5 kg)</td><td>~6.8 lb (3.1 kg)</td></tr>'
);

fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/best-beginner-electric-guitar.html', t, 'utf8');
console.log('HTML principal fijado');

// Fix Spanish HTML
var g2 = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/best-beginner-electric-guitar_es.html', 'utf8');
var ts2 = g2.indexOf('<tbody>');
var te2 = g2.indexOf('</tbody>', ts2);
var t2 = g2.slice(ts2, te2 + 8);

// Row 6 (Longitud de escala) - add missing 10th value '25.5 in (648 mm)'
t2 = t2.replace(
  '<td>Longitud de escala</td><td>25.5 in (648 mm)</td><td>25.5 in (648 mm)</td><td>25.5 in (648 mm)</td><td>24.75 in (628 mm)</td><td>25.5 in (648 mm)</td><td>25.5 in (648 mm)</td><td>24 in (610 mm)</td><td>24.75 in (629 mm)</td><td>24.75 in (628 mm)</td></tr>',
  '<td>Longitud de escala</td><td>25.5 in (648 mm)</td><td>25.5 in (648 mm)</td><td>25.5 in (648 mm)</td><td>24.75 in (628 mm)</td><td>25.5 in (648 mm)</td><td>25.5 in (648 mm)</td><td>24 in (610 mm)</td><td>24.75 in (629 mm)</td><td>24.75 in (628 mm)</td><td>25.5 in (648 mm)</td></tr>'
);

// Row 9 (Peso) - add missing 10th value '~6.8 lb (3.1 kg)'
t2 = t2.replace(
  '<td>Peso</td><td>~7.5 lb (3.4 kg)</td><td>~7.5 lb (3.4 kg)</td><td>~7.0 lb (3.2 kg)</td><td>~7.5 lb (3.4 kg)</td><td>~7.5 lb (3.4 kg)</td><td>~7.7 lb (3.5 kg)</td><td>~6.0 lb (2.7 kg)</td><td>~6.0 lb (2.7 kg)</td><td>~7.7 lb (3.5 kg)</td></tr>',
  '<td>Peso</td><td>~7.5 lb (3.4 kg)</td><td>~7.5 lb (3.4 kg)</td><td>~7.0 lb (3.2 kg)</td><td>~7.5 lb (3.4 kg)</td><td>~7.5 lb (3.4 kg)</td><td>~7.7 lb (3.5 kg)</td><td>~6.0 lb (2.7 kg)</td><td>~6.0 lb (2.7 kg)</td><td>~7.7 lb (3.5 kg)</td><td>~6.8 lb (3.1 kg)</td></tr>'
);

fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/best-beginner-electric-guitar_es.html', t2, 'utf8');
console.log('HTML ES fijado');