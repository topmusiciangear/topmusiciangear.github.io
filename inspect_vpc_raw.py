import json
g=json.load(open('data/guides.json', encoding='utf-8'))
guide=next(x for x in g if x.get('id')=='channel-strip-plugins')
vpc=guide.get('verdictProsCons', [])
print(json.dumps(vpc[:2], ensure_ascii=False, indent=2))
