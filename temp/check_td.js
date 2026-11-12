var fs = require('fs');
var g = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/best-beginner-electric-guitar.html', 'utf8');
var ts = g.indexOf('<tbody>');
var te = g.indexOf('</tbody>', ts);
var t = g.slice(ts, te + 8);
console.log('Length:', t.length);
console.log('Has <td>: ', t.indexOf('<td') > -1);
var c = (t.match(/<td /g) || []).length;
console.log('Matches <td [: ', c);
var c2 = (t.match(/<td>/g) || []).length;
console.log('Matches <td>: ', c2);

// Also count per row
var rows = t.match(/<tr>/g);
console.log('Number of <tr>: ', rows ? rows.length : 0);
if (rows && rows.length > 0) {
    // Get each row's td count
    var lines = t.split('<tr>');
    for (var i = 1; i < lines.length; i++) {
        var row = lines[i].slice(0, 200);
        var rowTd = (row.match(/<td>/g) || []).length;
        console.log('Row', i, ': <td> count =', rowTd);
    }
}