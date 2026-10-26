import json, collections
data=json.load(open('data/products.json',encoding='utf-8'))
# collect all strings recursively
def strings(obj, path=''):
    if isinstance(obj,str):
        yield path, obj
    elif isinstance(obj,dict):
        for k,v in obj.items():
            yield from strings(v, path+'/'+k)
    elif isinstance(obj,list):
        for i,v in enumerate(obj):
            yield from strings(v, path+f'[{i}]')

conv=0; unconv=0
examples=[]
for pr in data:
    for path,s in strings(pr):
        if any(ord(c)>127 for c in s):
            try:
                ns=s.encode('cp437').decode('utf-8')
                if ns!=s:
                    conv+=1
            except Exception:
                unconv+=1
                if len(examples)<20:
                    # codepoint signature
                    sig=''.join(f'U+{ord(c):04X}' for c in s if ord(c)>127)
                    examples.append((pr['id'], path, sig, s[:60]))
print('convertible fields:', conv)
print('unconvertible fields:', unconv)
for e in examples:
    print(e)