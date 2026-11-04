import json
with open('data/guides.json', encoding='utf-8') as f:
    guides=json.load(f)
for g in guides:
    if g['id']=='tuners-bass-guitar':
        print(json.dumps(g.get('faq'), indent=2, ensure_ascii=False)[:2000])
        break
