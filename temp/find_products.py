import json
with open(r'C:\Users\Daniel\projects\topmusiciangear\data\products.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
for pid in [3001,3002,3003,112,115]:
    p = next((x for x in data if x.get('id')==pid), None)
    if p:
        print(pid, p.get('title'), p.get('score'))
