import json
data=json.load(open('data/products.json',encoding='utf-8'))
p=next(x for x in data if x['id']==379)
print('current len', len(p['desc_es']))
print(p['desc_es'][:100])
print('contains replacement', '\ufffd' in p['desc_es'])
