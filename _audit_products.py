import json, re

with open('data/products.json', 'r', encoding='utf-8') as f:
    products = json.loads(f.read())

issues = []

for p in products:
    pid = p['id']
    title = p.get('title', '')
    title_es = p.get('title_es', '')
    desc = p.get('desc', '')
    desc_es = p.get('desc_es', '')
    brand = p.get('brand', '')

    # 1. title_es encoding issues (replacement chars / mojibake)
    if '\ufffd' in title_es:
        issues.append((pid, 'title_es', 'Has U+FFFD replacement char', title_es[:80]))

    # Check for mojibake patterns: Ã± (should be ñ), Ã¡ (á), Ã© (é), Ã³ (ó), etc.
    mojibake_patterns = [('Ã±', 'ñ'), ('Ã¡', 'á'), ('Ã©', 'é'), ('Ã³', 'ó'), ('Ãº', 'ú'),
                         ('Ã¼', 'ü'), ('Ã¶', 'ö'), ('Â', ''), ('â\x80\x93', '—'), ('â\x80\x99', "'")]
    for bad, good in mojibake_patterns:
        if bad in title_es:
            issues.append((pid, 'title_es', f'Mojibake "{bad}" should be "{good}"', title_es[:80]))
            break

    # 2. desc_es encoding issues
    if '\ufffd' in desc_es:
        issues.append((pid, 'desc_es', f'Has U+FFFD replacement char', desc_es[:80]))
    for bad, good in mojibake_patterns:
        if bad in desc_es:
            issues.append((pid, 'desc_es', f'Mojibake "{bad}" should be "{good}"', desc_es[:80]))
            break

    # 3. Check if title_es is different from title and might be unnecessary translation
    if title_es and title_es != title:
        # Check if title_es just swaps word order or translates words
        # Skip if it's just the same product name (most should be this)
        title_words_en = set(title.lower().split())
        title_words_es = set(title_es.lower().split())
        # If they share very few words, it's likely a translation
        if len(title_words_en & title_words_es) < max(1, len(title_words_en) // 3):
            issues.append((pid, 'title_es', f'Likely unnecessary translation', f'EN: {title[:60]} | ES: {title_es[:60]}'))

    # 4. desc has Spanish text (check for common Spanish words in EN field)
    spanish_indicators = ['más', 'para', 'con', 'los', 'las', 'del', 'una', 'por', 'que', 'el bajo',
                          'la guitarra', 'el sonido', 'los músicos', 'mástil', 'pastillas']
    for word in spanish_indicators:
        if word in desc.lower():
            # Count Spanish chars
            spanish_chars = sum(1 for c in desc if c in 'áéíóúñü¿¡')
            if spanish_chars >= 2:
                issues.append((pid, 'desc', f'Likely Spanish text in EN field', desc[:80]))
                break

    # 5. desc_es has no Spanish chars at all (might be missing translation)
    if len(desc_es) > 20:
        spanish_chars = sum(1 for c in desc_es if c in 'áéíóúñü¿¡')
        if spanish_chars == 0:
            issues.append((pid, 'desc_es', 'No Spanish accented chars - might be untranslated', desc_es[:80]))

    # 6. Brand has mojibake
    for bad, good in mojibake_patterns:
        if bad in brand:
            issues.append((pid, 'brand', f'Mojibake "{bad}" should be "{good}"', brand))
            break

print(f'Scanned {len(products)} products.')
print(f'Found {len(issues)} issues.\n')

# Group by type
from collections import Counter
type_counts = Counter(i[2] for i in issues)
print('=== Issue types ===')
for issue_type, count in type_counts.most_common():
    print(f'  [{count}] {issue_type}')

print('\n=== All issues ===')
for pid, field, problem, preview in issues:
    print(f'  id={pid:>3} [{field:>10}] {problem}')
    print(f'          {preview}')
