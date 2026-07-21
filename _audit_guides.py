import json, re

with open('data/guides.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

issues = []

for guide in data:
    gid = guide.get('id', '?')
    
    # 1. Check for duplicate FAQ pairs
    faq_keys = [k for k in guide if k.startswith('faq_q') or k.startswith('faq_a')]
    faq_qs = {k: v for k, v in guide.items() if k.startswith('faq_q')}
    faq_as = {k: v for k, v in guide.items() if k.startswith('faq_a')}
    
    # Check duplicate Qs
    seen_q = {}
    for k, v in faq_qs.items():
        if v in seen_q and v.strip():
            issues.append(f'{gid}: Duplicate FAQ Q "{k}" = "{seen_q[k]}" — both say "{v[:60]}..."')
        if v.strip():
            seen_q[v] = k
    
    # Check duplicate As
    seen_a = {}
    for k, v in faq_as.items():
        if v in seen_a and v.strip():
            issues.append(f'{gid}: Duplicate FAQ A "{k}" = "{seen_a[k]}" — both say "{v[:60]}..."')
        if v.strip():
            seen_a[v] = k
    
    # Check Q without A
    q_nums = set(re.findall(r'faq_q(\d+)_', ' '.join(faq_qs.keys())))
    a_nums = set(re.findall(r'faq_a(\d+)_', ' '.join(faq_as.keys())))
    
    # 2. Check for unmatched Q/A pairs across languages
    for qk, qv in list(faq_qs.items())[:10]:
        if not qv.strip():
            continue
        lang = 'en' if qk.endswith('_en') else 'es'
        num = re.search(r'faq_q(\d+)', qk).group(1)
        ak_en = f'faq_a{num}_en'
        ak_es = f'faq_a{num}_es'
        if lang == 'en':
            ak = ak_en
            other_q = qk.replace('_en', '_es')
            other_a = ak_es
        else:
            ak = ak_es
            other_q = qk.replace('_es', '_en')
            other_a = ak_en
        
        if ak not in guide:
            issues.append(f'{gid}: FAQ {qk} has no matching answer "{ak}"')
            continue
        av = guide.get(ak, '')
        if not av.strip():
            issues.append(f'{gid}: FAQ {qk} answer "{ak}" is empty')

    # 3. Check for mojibake
    for k, v in guide.items():
        if isinstance(v, str):
            if 'Ã¶' in v or 'Ã\u00b6' in v:
                issues.append(f'{gid}: Found Ã¶ mojibake in "{k}"')
            if 'â\u0082¬' in v or 'â\u0080\u009d' in v:
                issues.append(f'{gid}: Found â¬ mojibake in "{k}"')
            # Check for â€" pattern (corrupt em dash)
            if 'â' in v and '¬' in v:
                issues.append(f'{gid}: Possible em dash mojibake in "{k}"')
    
    # 4. Check sections
    for idx, section in enumerate(guide.get('sections', [])):
        for fld in ['content', 'content_es']:
            txt = section.get(fld, '')
            if 'Ã¶' in txt:
                issues.append(f'{gid}/section[{idx}]/{fld}: Ã¶ mojibake')
            if 'â\u0082¬' in txt:
                issues.append(f'{gid}/section[{idx}]/{fld}: â¬ mojibake')

    # 5. Check intro/description for mojibake
    for fld in ['intro', 'intro_es', 'description', 'description_es',
                'title', 'title_es', 'conclusion', 'conclusion_es',
                'verdict', 'verdict_es']:
        txt = guide.get(fld, '')
        if 'Ã¶' in txt:
            issues.append(f'{gid}/{fld}: Ã¶ mojibake')
        if 'â\u0082¬' in txt:
            issues.append(f'{gid}/{fld}: â¬ mojibake')

if issues:
    print(f'Found {len(issues)} issues:')
    for i, issue in enumerate(issues, 1):
        print(f'  {i}. {issue}')
else:
    print('No issues found!')

# Print guide list
print(f'\nTotal guides: {len(data)}')
for g in data:
    print(f'  - {g["id"]}: {g["title"][:60]}')
