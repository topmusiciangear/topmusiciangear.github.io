import json

with open('data/products.json', 'r', encoding='utf-8') as f:
    products = json.load(f)
    prod_ids = {p['id'] for p in products}

with open('data/guides.json', 'r', encoding='utf-8') as f:
    guides = json.load(f)

issues = []

for g in guides:
    gid = g['id']
    
    # Verify all product references
    for pid in g.get('featuredProducts', []):
        if pid not in prod_ids:
            issues.append(f'{gid}: featuredProducts {pid} MISSING')
    for sec_idx, sec in enumerate(g.get('sections', [])):
        for pid in sec.get('products', []):
            if pid not in prod_ids:
                issues.append(f'{gid}/section[{sec_idx}]: products {pid} MISSING')
    
    # Verify conclusion/verdict are not empty
    for field in ['conclusion', 'conclusion_es', 'verdict', 'verdict_es',
                  'intro', 'intro_es', 'title', 'title_es', 'description', 'description_es']:
        val = g.get(field, '')
        if not val or not val.strip():
            issues.append(f'{gid}: {field} is EMPTY')
    
    # Check FAQ Q/A pairs
    faq_keys = {}
    for k, v in g.items():
        if k.startswith('faq_') and v:
            faq_keys[k] = v
    
    # Check that each faq_q has a matching faq_a
    for k in faq_keys:
        if k.startswith('faq_q'):
            num_lang = k[6:]  # e.g., "1_en"
            ak = 'faq_a' + num_lang
            if ak not in faq_keys:
                issues.append(f'{gid}: FAQ {k} has no matching answer "{ak}"')
    
    # Check for empty FAQ values
    for k in faq_keys:
        if not faq_keys[k].strip():
            issues.append(f'{gid}: FAQ {k} is EMPTY')

    # Check sections for empty content
    for sec_idx, sec in enumerate(g.get('sections', [])):
        for field in ['content', 'content_es', 'heading', 'heading_es']:
            val = sec.get(field, '')
            if not val or not val.strip():
                issues.append(f'{gid}/section[{sec_idx}]: {field} is EMPTY')

if issues:
    print(f'Found {len(issues)} issues:')
    for i, issue in enumerate(issues, 1):
        print(f'  {i}. {issue}')
else:
    print('No issues found in guides.json!')
