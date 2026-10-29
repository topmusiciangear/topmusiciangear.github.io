import json
g=json.load(open('data/guides.json', encoding='utf-8'))
guide=next(x for x in g if x.get('id')=='channel-strip-plugins')
sections=guide.get('sections', [])
for s in sections:
    if s.get('products'):
        print(s.get('heading'))
        print('pros', s.get('pros'))
        print('cons', s.get('cons'))
        print('---')
