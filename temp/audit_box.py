import json
data=json.load(open('data/products.json',encoding='utf-8'))
def strings(obj, path=''):
    if isinstance(obj,str):
        yield path, obj
    elif isinstance(obj,dict):
        for k,v in obj.items():
            yield from strings(v, path+'/'+k)
    elif isinstance(obj,list):
        for i,v in enumerate(obj):
            yield from strings(v, path+f'[{i}]')

moji_fields=0
examples=[]
for pr in data:
    for path,s in strings(pr):
        if any(0x2500 <= ord(c) <= 0x257F for c in s):
            moji_fields+=1
            if len(examples)<30:
                sig=''.join(sorted(set(c for c in s if 0x2500<=ord(c)<=0x257F)))
                examples.append((pr['id'], path, repr(sig), s[:70]))
print('fields with box-drawing mojibake:', moji_fields)
with open('temp/box_out.txt','w',encoding='utf-8') as f:
    for e in examples:
        f.write(repr(e)+'\n')