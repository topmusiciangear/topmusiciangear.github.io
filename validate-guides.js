/**
 * Validates guides.json for required fields before build/deploy.
 * Run with: node validate-guides.js
 * Exits with code 1 if validation fails.
 */

const fs = require('fs');
const path = require('path');

// ============================================================
// TRULY REQUIRED FIELDS (cause crashes if missing)
// ============================================================
const REQUIRED_FIELDS = [
  // Core identity - MUST exist
  'id',
  'title',
  'title_es',
  'category',
  
  // Card/grid rendering - MUST exist (crash if undefined)
  'intro',
  'intro_es',
];

// Fields that should exist but have fallbacks in code
const RECOMMENDED_FIELDS = [
  'category_es',
  'desc',
  'desc_es',
  'conclusion',
  'conclusion_es',
  'verdict',
  'verdict_es',
  'products',
  'featuredProducts',
  'featuredProducts_es',
  'sections',
  'verdictPros',
  'verdictPros_es',
  'verdictCons',
  'verdictCons_es',
  'verdictProsCons',
  'score',
  'score_es',
  'badge',
  'badge_es',
  'image',
];

const ARRAY_FIELDS = [
  'products',
  'featuredProducts',
  'featuredProducts_es',
  'sections',
  'verdictPros',
  'verdictPros_es',
  'verdictCons',
  'verdictCons_es',
];

const OBJECT_FIELDS = [
  'verdictProsCons',
];

function validateGuide(guide, index) {
  const errors = [];
  const warnings = [];
  
  // Check REQUIRED fields (hard failure)
  REQUIRED_FIELDS.forEach(field => {
    const value = guide[field];
    if (value === undefined || value === null) {
      errors.push(`REQUIRED field missing: ${field}`);
    } else if (typeof value === 'string' && value.trim() === '') {
      errors.push(`REQUIRED field empty: ${field}`);
    } else if (typeof value !== 'string' && !Array.isArray(value)) {
      errors.push(`REQUIRED field ${field} must be a string (got ${typeof value})`);
    }
  });
  
  // Check RECOMMENDED fields (warnings only)
  RECOMMENDED_FIELDS.forEach(field => {
    const value = guide[field];
    if (value === undefined || value === null) {
      warnings.push(`Recommended field missing: ${field}`);
    } else if (typeof value === 'string' && value.trim() === '') {
      warnings.push(`Recommended field empty: ${field}`);
    }
  });
  
  // Check array fields
  ARRAY_FIELDS.forEach(field => {
    const value = guide[field];
    if (value !== undefined && value !== null && !Array.isArray(value)) {
      errors.push(`Field ${field} must be an array`);
    }
  });
  
  // Check object fields
  OBJECT_FIELDS.forEach(field => {
    const value = guide[field];
    if (value !== undefined && value !== null && typeof value !== 'object') {
      errors.push(`Field ${field} must be an object`);
    }
  });
  
  // Check id format
  if (guide.id && typeof guide.id === 'string') {
    if (!/^[a-z0-9-]+$/.test(guide.id)) {
      warnings.push(`id should be lowercase with hyphens only: ${guide.id}`);
    }
  }
  
  // Check category validity
  const validCategories = [
    'microphones', 'guitars', 'basses', 'keyboards', 'interfaces',
    'in_ear_monitors', 'monitors', 'headphones', 'drum-machine', 'plugins',
    'accessories', 'amps', 'pedals', 'live_sound', 'mixers', 'daw',
    'streaming', 'production', 'strings', 'other'
  ];
  if (guide.category && !validCategories.includes(guide.category)) {
    warnings.push(`Unknown category: ${guide.category}`);
  }
  
  return { errors, warnings };
}

function main() {
  console.log('=== GUIDES VALIDATION ===\n');
  
  const guidesPath = path.join(__dirname, 'data', 'guides.json');
  if (!fs.existsSync(guidesPath)) {
    console.error('❌ guides.json not found');
    process.exit(1);
  }
  
  let guides;
  try {
    const raw = fs.readFileSync(guidesPath, 'utf8').replace(/^\ufeff/, '');
    guides = JSON.parse(raw);
  } catch (e) {
    console.error('❌ Invalid JSON in guides.json:', e.message);
    process.exit(1);
  }
  
  console.log(`Found ${Object.keys(guides).length} guides\n`);
  
  let totalErrors = 0;
  let totalWarnings = 0;
  let guidesWithErrors = 0;
  
  Object.entries(guides).forEach(([key, guide]) => {
    const { errors, warnings } = validateGuide(guide, key);
    
    if (errors.length > 0 || warnings.length > 0) {
      console.log(`\n📋 Guide [${key}] "${guide.title || guide.id || 'NO TITLE'}" (id: ${guide.id || 'MISSING'})`);
    }
    
    errors.forEach(e => {
      console.log(`  ❌ ${e}`);
      totalErrors++;
    });
    
    warnings.forEach(w => {
      console.log(`  ⚠️  ${w}`);
      totalWarnings++;
    });
    
    if (errors.length > 0) guidesWithErrors++;
  });
  
  console.log('\n=== SUMMARY ===');
  console.log(`Guides checked: ${Object.keys(guides).length}`);
  console.log(`Guides with errors: ${guidesWithErrors}`);
  console.log(`Total errors: ${totalErrors}`);
  console.log(`Total warnings: ${totalWarnings}`);
  
  if (totalErrors > 0) {
    console.log('\n❌ VALIDATION FAILED - Fix errors before build/deploy');
    process.exit(1);
  } else {
    console.log('\n✅ VALIDATION PASSED');
    process.exit(0);
  }
}

main();