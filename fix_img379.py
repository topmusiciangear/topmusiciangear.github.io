import json
p='data/products.json'
d=json.load(open(p,'r',encoding='utf-8'))
for prod in d:
    if prod.get('id')==379:
        prod['img']='https://banners.pluginboutique.com/x33gegcapv3lmyd754n0oie193zn'
        break
json.dump(d, open(p,'w',encoding='utf-8'), indent=2)
print('done')