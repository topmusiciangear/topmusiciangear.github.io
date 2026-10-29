import json
data=json.load(open('data/products.json',encoding='utf-8'))
ids=[1069,379,1066,1068,1071,1070]
for p in data:
    if p.get('id') in ids:
        desc_es=p.get('desc_es','')
        # check for replacement char
        if '�' in desc_es:
            print(p['id'], 'has replacement char')
        # print first 100 chars
        print(p['id'], desc_es[:120])
