import json, re, collections
data=json.load(open('data/products.json',encoding='utf-8'))
def strings(obj):
    if isinstance(obj,str): yield obj
    elif isinstance(obj,dict):
        for v in obj.values(): yield from strings(v)
    elif isinstance(obj,list):
        for v in obj: yield from strings(v)

pairs=collections.Counter()
for pr in data:
    for s in strings(pr):
        # find box drawing char followed by any char
        for m in re.finditer(r'[\u2500-\u257f].', s):
            pairs[m.group(0)] += 1
# write unique pairs with codepoints
lines=[]
for pair,cnt in pairs.most_common():
    cps=' '.join(f'U+{ord(ch):04X}' for ch in pair)
    lines.append(f'{cnt:4d} {cps}  {pair!r}')
open('temp/pairs.txt','w',encoding='utf-8').write('\n'.join(lines))