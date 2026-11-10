import json
with open(r'C:\Users\Daniel\projects\topmusiciangear\data\products.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
keys = set()
for x in data:
    keys.update(x.keys())
print(sorted(keys))
