import json, re
d={p['id']:p for p in json.load(open('temp/products_full_original.json',encoding='utf-8'))}
s=d[116]['desc_es']
print(repr(s))
parts=re.split(r'(?<=[.!?])\s+(?=[A-Z0-9\u00c1\u00c9\u00cd\u00d3\u00da\u00dc\u00d1\u00bf\u00a1"\u201c\u0027\(\[])', s)
print([len(x) for x in parts])
print(repr(d[1053]['desc']), repr(d[1053]['desc_es']))
print(repr(d[1053].get('title')))
