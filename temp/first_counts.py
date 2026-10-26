import json, re
d=json.load(open('temp/products_full_original.json',encoding='utf-8'))
def split_sentences(s):
    s=' '.join(s.split())
    parts=re.split(r'(?<=[.!?])\s+(?=[A-Z0-9ÁÉÍÓÚÜÑ¿¡"“\'\(\[])', s)
    return [p.strip() for p in parts if p.strip()]
for f in ['desc','desc_es']:
    lens=[len(split_sentences(p.get(f) or '')[0]) for p in d if p.get(f)]
    lens.sort()
    print(f, {t:sum(1 for x in lens if x>t) for t in [180,200,220,240,260,300]})
