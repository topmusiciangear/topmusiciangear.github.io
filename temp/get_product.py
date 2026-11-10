import json
with open(r'C:\Users\Daniel\projects\topmusiciangear\data\products.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
p = next((x for x in data if x.get('id') == 115), None)
print(json.dumps(p, ensure_ascii=False, indent=2))
