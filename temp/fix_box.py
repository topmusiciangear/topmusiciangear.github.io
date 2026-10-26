import os, json

# Build mapping for pairs
pair_map = {
    '\u251c\u00ae': '\u00e9',  # é
    '\u251c\u2502': '\u00f3',  # ó
    '\u251c\u00ed': '\u00e1',  # á
    '\u251c\u00a1': '\u00ed',  # í
    '\u251c\u2551': '\u00fa',  # ú
    '\u251c\u2592': '\u00f1',  # ñ
    '\u252c\u2592': '\u00b1',  # ±
    '\u252c\u00c1': '\u00b5',  # µ
}

def fix_text(s):
    # replace known pairs
    for k,v in pair_map.items():
        s=s.replace(k,v)
    return s

def fix_obj(obj):
    if isinstance(obj,str):
        return fix_text(obj)
    if isinstance(obj,dict):
        return {k:fix_obj(v) for k,v in obj.items()}
    if isinstance(obj,list):
        return [fix_obj(v) for v in obj]
    return obj

# Fix products.json
path='data/products.json'
data=json.load(open(path,encoding='utf-8'))
new=fix_obj(data)
# count changes
import json as j
old_text=open(path,encoding='utf-8').read()
new_text=j.dumps(new,ensure_ascii=False,indent=2)
# preserve? We'll write with indent 2
json.dump(new, open(path,'w',encoding='utf-8'), ensure_ascii=False, indent=2)
print('products.json updated')

# Verify no box-drawing remains
remaining=0
def has_box(o):
    global remaining
    if isinstance(o,str):
        if any('\u2500'<=c<='\u257f' for c in o): remaining+=1
    elif isinstance(o,dict):
        for v in o.values(): has_box(v)
    elif isinstance(o,list):
        for v in o: has_box(v)
has_box(new)
print('remaining box fields in products:', remaining)