var fs = require('fs');
var g = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8');
var j = JSON.parse(g);
var item = j[26]; // best-beginner-electric-guitar

console.log('Before fix:');
for (var r = 0; r < item.productTable.rows.length; r++) {
    var row = item.productTable.rows[r];
    console.log('Row', r, 'values count:', row.values.length, 'label:', row.label);
}

for (var r = 0; r < item.productTable.rows.length; r++) {
    var row = item.productTable.rows[r];
    row.values.splice(10, 1); // remove 11th value (index 10)
}

console.log('\\nAfter fix:');
for (var r = 0; r < item.productTable.rows.length; r++) {
    var row = item.productTable.rows[r];
    console.log('Row', r, 'values count:', row.values.length, 'label:', row.label);
}

// Also fix the Spanish version if it exists at another index
// Let me check if there's an Spanish version
console.log('\\nSearching for Spanish version...');
for (var i = 0; i < j.length; i++) {
    if (j[i] && j[i].id === 'best-beginner-electric-guitar-es') {
        console.log('Found Spanish version at index', i);
        var item_es = j[i];
        if (item_es.productTable) {
            for (var r = 0; r < item_es.productTable.rows.length; r++) {
                var row = item_es.productTable.rows[r];
                row.values.splice(10, 1);
            }
            console.log('Spanish version fixed too.');
        }
        break;
    }
}

// Write the modified JSON back
fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', JSON.stringify(j, null, 2), 'utf8');
console.log('\\nJSON file updated successfully.');