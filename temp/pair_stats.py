import json

rows = json.load(open('temp/all_card_counts.json', encoding='utf-8'))
by = {}
for r in rows:
    by.setdefault(r['id'], {})[r['f']] = r['w']

both = {'en_short_es_short': 0, 'en_ok_es_short': 0, 'en_short_es_ok': 0, 'both_ok': 0}
detail = []
for pid, d in by.items():
    en = d.get('desc', 0)
    es = d.get('desc_es', 0)
    if en < 32 and es < 32:
        both['en_short_es_short'] += 1
        detail.append((pid, en, es))
    elif en >= 32 and es < 32:
        both['en_ok_es_short'] += 1
    elif en < 32 and es >= 32:
        both['en_short_es_ok'] += 1
    else:
        both['both_ok'] += 1
print(both)
print('products with both <32:', len(detail))
print('en>=32, es<32:', both['en_ok_es_short'])
print('en<32, es>=32:', both['en_short_es_ok'])
