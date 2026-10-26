import json, re
data=json.load(open('data/products.json',encoding='utf-8'))
def strings_with_path(obj, path=''):
    if isinstance(obj,str):
        yield path,obj
    elif isinstance(obj,dict):
        for k,v in obj.items():
            yield from strings_with_path(v, path+'/'+k)
    elif isinstance(obj,list):
        for i,v in enumerate(obj):
            yield from strings_with_path(v, path+f'[{i}]')

targets=['\u252c\u2592','\u252c\u00c1']
for pr in data:
    for path,s in strings_with_path(pr):
        for t in targets:
            if t in s:
                idx=s.find(t)
                with open('temp/targets_out.txt','a',encoding='utf-8') as f:
                    f.write(f"{pr['id']} {path}\n")
                    f.write(repr(s[max(0,idx-40):idx+40])+'\n')