import json
p=json.load(open('data/products.json', encoding='utf-8'))
ids=[1069,379,1066,1068,1071,1070]
for i in ids:
    prod=next((x for x in p if x.get('id')==i), None)
    if prod:
        print(i, prod.get('img'), prod.get('title'))
