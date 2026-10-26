import json
p='data/guides.json'
d=json.load(open(p, encoding='utf-8'))
g=next(x for x in d if x['id']=='best-digital-pianos')
secs=g['sections']
# remove duplicate consecutive sections with same products and empty heading
new_secs=[]
prev=None
for s in secs:
    # if empty heading and products same as previous, skip
    if prev and s.get('heading')=='' and prev.get('heading')=='' and s.get('products')==prev.get('products'):
        continue
    # also remove duplicate empty heading with same product as immediately previous non-empty? Let's just deduplicate exact duplicate
    if prev and s.get('heading')==prev.get('heading') and s.get('products')==prev.get('products') and s.get('content')==prev.get('content'):
        continue
    new_secs.append(s)
    prev=s
g['sections']=new_secs
json.dump(d, open(p,'w',encoding='utf-8'), ensure_ascii=False, indent=2)
print('done', len(secs), len(new_secs))
