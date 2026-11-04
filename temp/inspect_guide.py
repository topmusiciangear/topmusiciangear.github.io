import json
with open('data/guides.json', encoding='utf-8') as f:
    guides=json.load(f)
for g in guides:
    if g['id']=='tuners-bass-guitar':
        keys=[k for k in g.keys() if 'faq' in k.lower()]
        print('faq keys',keys)
        # print verdictProsCons
        vpc=g.get('verdictProsCons',[])
        for v in vpc:
            if 'snark' in v.get('name','').lower():
                print(json.dumps(v, ensure_ascii=False, indent=2))
        print('conclusion', g.get('conclusion')[:200])
        break
