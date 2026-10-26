import json
p = 'data/products.json'
d = json.load(open(p, encoding='utf-8'))
updates = {
  434: ("Loud sources", "Fuentes potentes"),
  570: ("Serious practice", "Estudio serio"),
  54: ("Beginners", "Principiantes"),
}
for prod in d:
    if prod['id'] in updates:
        prod['bestFor']['en'], prod['bestFor']['es'] = updates[prod['id']]
json.dump(d, open(p, 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
for prod in json.load(open(p, encoding='utf-8')):
    if prod['id'] in updates:
        print(prod['id'], prod['bestFor'])
