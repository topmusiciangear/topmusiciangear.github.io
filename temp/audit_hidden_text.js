const fs = require('fs');
const path = 'C:/Users/Daniel/projects/topmusiciangear/';

// Check for hidden text in all guide pages
const files = fs.readdirSync(path + 'guides').filter(f => f.endsWith('.html'));
let hiddenTextIssues = 0;
const hiddenTextList = [];

files.forEach(f => {
  const html = fs.readFileSync(path + 'guides/' + f, 'utf8');
  
  // Check display:none elements with text
  const dnRegex = /<[^>]*style\s*=\s*"[^"]*display\s*:\s*none[^"]*"[^>]*>([\s\S]*?)<\/[^>]+>/gi;
  let m;
  while ((m = dnRegex.exec(html)) !== null) {
    const text = m[1].replace(/<[^>]+>/g, '').trim();
    if (text.length > 20) {
      // Check if this text appears elsewhere in the page (visible)
      const visibleText = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
      if (!visibleText.includes(text.slice(0, 50))) {
        hiddenTextIssues++;
        hiddenTextList.push(f + ': hidden text not visible: ' + text.slice(0, 80));
      }
    }
  }
  
  // Check HTML comments with substantial text
  const comments = html.match(/<!--[\s\S]*?-->/g) || [];
  comments.forEach(c => {
    const text = c.replace(/<!--|-->/g, '').trim();
    if (text.length > 50 && !text.includes('cookie') && !text.includes('affiliate') && !text.includes('modal') && !text.includes('banner')) {
      hiddenTextIssues++;
      hiddenTextList.push(f + ': comment with text: ' + text.slice(0, 80));
    }
  });
});

console.log('Hidden text issues: ' + hiddenTextIssues);
hiddenTextList.slice(0, 30).forEach(i => console.log('  ' + i));
if (hiddenTextList.length > 30) console.log('  ... and ' + (hiddenTextList.length - 30) + ' more');
fs.writeFileSync(path + 'temp/audit_hidden_text.txt', hiddenTextList.join('\n'), 'utf8');
console.log('Report saved to temp/audit_hidden_text.txt');
