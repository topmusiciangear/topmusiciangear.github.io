const fs = require('fs');

(async () => {
  const url = 'https://www.musik-produktiv.de/suche?q=Neumann+U+87+Ai';
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
  });
  const html = await res.text();
  
  // Save HTML for inspection
  fs.writeFileSync('C:\\pinokio\\api\\ace-step-ui.pinokio.git\\musik-test.html', html);
  console.log(`HTML size: ${html.length} bytes`);
  
  // Look for any hrefs that might be product links
  const allHrefs = html.match(/href="[^"]*"/gi) || [];
  const unique = [...new Set(allHrefs)].sort();
  unique.forEach(h => console.log(h));
  
  // Check for data attributes or JSON in script tags
  const scripts = html.match(/<script[^>]*>[\s\S]*?<\/script>/gi) || [];
  console.log(`\nScript tags: ${scripts.length}`);
  scripts.forEach((s, i) => {
    if (s.length < 500) console.log(`Script ${i}: ${s.substring(0, 300)}`);
  });
  
  // Check for any JSON data
  const jsonMatches = html.match(/\{["'][^"']+["'][:][^}]+}/g);
  if (jsonMatches) {
    console.log(`\nJSON-like patterns: ${jsonMatches.length}`);
    jsonMatches.slice(0, 3).forEach(j => console.log(j.substring(0, 200)));
  }
})();
