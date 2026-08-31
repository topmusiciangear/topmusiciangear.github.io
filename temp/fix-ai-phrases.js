var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));

var fixed = 0;

function fixAll(from, to) {
  g.forEach(guide => {
    ['intro', 'conclusion', 'intro_es', 'conclusion_es'].forEach(f => {
      if (guide[f] && guide[f].includes(from)) {
        guide[f] = guide[f].split(from).join(to);
        fixed++;
      }
    });
    guide.sections.forEach((s, i) => {
      ['content', 'content_es'].forEach(f => {
        if (s[f] && s[f].includes(from)) {
          guide.sections[i][f] = s[f].split(from).join(to);
          fixed++;
        }
      });
    });
  });
}

// ============= EN: Remove "actually" =============
// "actually" is overused and sounds AI. Replace with nothing or context-appropriate
fixAll(' actually ', ' ');
fixAll('actually,', ',');
fixAll('actually.', '.');
fixAll('actually ', ' ');
fixAll(' actually', '');

// ============= EN: Remove "genuinely" =============
fixAll(' genuinely ', ' ');
fixAll('genuinely,', ',');
fixAll('genuinely.', '.');
fixAll('genuinely ', ' ');
fixAll(' genuinely', '');

// ============= EN: Remove "simply" =============
fixAll(' simply ', ' ');
fixAll('simply,', ',');
fixAll('simply.', '.');
fixAll('simply ', ' ');
fixAll(' simply', '');

// ============= EN: Remove "honestly" =============
fixAll(' honestly ', ' ');
fixAll('honestly,', ',');
fixAll('honestly.', '.');

// ============= EN: Remove "literally" =============
fixAll(' literally ', ' ');
fixAll('literally,', ',');
fixAll('literally.', '.');

// ============= EN: Remove exaggerated quantities =============
fixAll('hundreds of hours', 'extensive time');
fixAll('hundreds of products', 'many products');
fixAll('hundreds of sessions', 'many sessions');
fixAll('thousands of hours', 'extensive time');
fixAll('thousands of products', 'many products');
fixAll('thousands of sessions', 'many sessions');
fixAll('thousands of mixes', 'many mixes');
fixAll('dozens of hours', 'many hours');
fixAll('dozens of products', 'many products');
fixAll('dozens of sessions', 'many sessions');
fixAll('countless hours', 'many hours');
fixAll('countless sessions', 'many sessions');
fixAll('countless mixes', 'many mixes');

// ============= EN: Remove personal references =============
fixAll('I have used', 'After testing');
fixAll('I used', 'After testing');
fixAll('I use', '');
fixAll('I own', '');
fixAll('I spent', 'After spending');
fixAll('I have spent', 'After spending');
fixAll('I have tested', 'After testing');
fixAll('I tested', 'After testing');
fixAll('my setup', 'the setup');
fixAll('my desk', 'the desk');
fixAll('my studio', 'the studio');
fixAll('my room', 'the room');

// ============= ES: Remove "he usado" / "he probado" =============
fixAll('he usado', 'tras usar');
fixAll('he probado', 'tras probar');
fixAll('he testado', 'tras probar');

// ============= ES: Remove "realmente" =============
fixAll(' realment ', ' ');
fixAll('realmente,', ',');
fixAll('realmente.', '.');
fixAll('realmente ', ' ');
fixAll(' realmente', '');

// ============= ES: Remove "de verdad" =============
fixAll(' de verdad', '');

// ============= ES: Remove "en serio" =============
fixAll(' en serio', '');

// ============= ES: Remove "auténticamente" =============
fixAll(' auténticamente', '');

// ============= ES: Remove "honestamente" =============
fixAll(' honestamente', '');

// ============= ES: Remove exaggerated quantities =============
fixAll('cientos de horas', 'muchas horas');
fixAll('cientos de productos', 'muchos productos');
fixAll('miles de horas', 'muchas horas');
fixAll('miles de productos', 'muchos productos');
fixAll('miles de sesiones', 'muchas sesiones');
fixAll('miles de mezclas', 'muchas mezclas');
fixAll('decenas de horas', 'muchas horas');
fixAll('decenas de productos', 'muchos productos');
fixAll('incontables horas', 'muchas horas');

// ============= ES: Remove "mi setup" / "mi escritorio" =============
fixAll('mi setup', 'el setup');
fixAll('mi escritorio', 'el escritorio');
fixAll('mi estudio', 'el estudio');
fixAll('mi habitación', 'la habitación');

// ============= EN: Remove "after testing" + quantities =============
fixAll('after testing hundreds', 'after testing many');
fixAll('after testing thousands', 'after testing many');
fixAll('after testing dozens', 'after testing many');
fixAll('after running hundreds', 'after running many');
fixAll('after running thousands', 'after running many');
fixAll('after spending hundreds', 'after spending many');
fixAll('after spending thousands', 'after spending many');
fixAll('after years of testing', 'after extensive testing');

// ============= ES: Remove "después de probar" + quantities =============
fixAll('después de probar cientos', 'después de probar muchos');
fixAll('después de probar miles', 'después de probar muchos');
fixAll('después de probar decenas', 'después de probar muchos');
fixAll('tras probar cientos', 'tras probar muchos');
fixAll('tras probar miles', 'tras probar muchos');

// ============= EN: "after years" → neutral =============
fixAll('after years of', 'after extensive');
fixAll('After years of', 'After extensive');

// ============= ES: "after years" → neutral =============
fixAll('después de años de', 'tras una extensa');
fixAll('tras años de', 'tras una extensa');

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2), 'utf8');
console.log('Total fixes: ' + fixed);
