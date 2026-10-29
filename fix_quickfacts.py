import json
p='data/products.json'
d=json.load(open(p,'r',encoding='utf-8'))
ids=[1069,1066,379,1068,1071,1070]
for prod in d:
    if prod.get('id') in ids:
        facts=prod.get('facts',[])
        # Keep first 3
        prod['facts']=facts[:3]
json.dump(d, open(p,'w',encoding='utf-8'), indent=2)
print('done')