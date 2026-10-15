const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data', 'guides.json');
const guides = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const results = [];

/**
 * Strip HTML tags from a string
 */
function stripHtml(html) {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

/**
 * Get the first sentence from a text string.
 * A sentence ends with . ! or ? followed by whitespace or end of string.
 */
function getFirstSentence(text) {
  const stripped = stripHtml(text);
  if (!stripped) return '';
  // Find the first sentence terminator followed by space or end
  const match = stripped.match(/^(.+?[.!?])(?:\s|$)/);
  return match ? match[1] : stripped;
}

/**
 * Check if the first alphabetic character in a string is lowercase.
 * Returns true if the first letter is lowercase.
 */
function startsLowercase(text) {
  if (!text || typeof text !== 'string') return false;
  const stripped = stripHtml(text);
  if (!stripped) return false;
  // Find the first alphabetic character
  const match = stripped.match(/[a-zA-Z]/);
  if (!match) return false;
  const char = match[0];
  return char === char.toLowerCase() && char !== char.toUpperCase();
}

/**
 * Get the first 80 characters of text (stripped of HTML) for display
 */
function preview(text) {
  const stripped = stripHtml(text);
  return stripped.substring(0, 80);
}

for (const guide of guides) {
  const id = guide.id;

  // a. intro
  if (guide.intro && startsLowercase(guide.intro)) {
    results.push({ guide: id, field: 'intro', preview: preview(guide.intro) });
  }

  // b. intro_es
  if (guide.intro_es && startsLowercase(guide.intro_es)) {
    results.push({ guide: id, field: 'intro_es', preview: preview(guide.intro_es) });
  }

  // c & d. sections content and content_es
  if (guide.sections && Array.isArray(guide.sections)) {
    guide.sections.forEach((section, idx) => {
      // c. content
      if (section.content && startsLowercase(section.content)) {
        results.push({ guide: id, field: `sections[${idx}].content`, preview: preview(section.content) });
      }
      // d. content_es
      if (section.content_es && startsLowercase(section.content_es)) {
        results.push({ guide: id, field: `sections[${idx}].content_es`, preview: preview(section.content_es) });
      }
    });
  }

  // e. conclusion
  if (guide.conclusion && startsLowercase(guide.conclusion)) {
    results.push({ guide: id, field: 'conclusion', preview: preview(guide.conclusion) });
  }

  // f. conclusion_es
  if (guide.conclusion_es && startsLowercase(guide.conclusion_es)) {
    results.push({ guide: id, field: 'conclusion_es', preview: preview(guide.conclusion_es) });
  }
}

// Output report
console.log('=== Lowercase Start Report ===');
console.log(`Total guides scanned: ${guides.length}`);
console.log(`Issues found: ${results.length}`);
console.log('');

if (results.length === 0) {
  console.log('No lowercase-start issues found.');
} else {
  // Group by guide
  const byGuide = {};
  for (const r of results) {
    if (!byGuide[r.guide]) byGuide[r.guide] = [];
    byGuide[r.guide].push(r);
  }

  for (const [guideId, items] of Object.entries(byGuide)) {
    console.log(`\n--- ${guideId} ---`);
    for (const item of items) {
      console.log(`  ${item.field}: "${item.preview}..."`);
    }
  }
}
