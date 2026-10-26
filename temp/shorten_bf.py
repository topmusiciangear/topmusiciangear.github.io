import json
p = 'data/products.json'
d = json.load(open(p, encoding='utf-8'))
short = {
  434: "Drums & amps",
  570: "Home practice",
  54: "Beginners",
}
for prod in d:
    if prod['id'] in short:
        prod['bestFor']['en'] = short[prod['id']]
        prod['bestFor']['es'] = short[prod['id']]  # keep simple; could translate
# translate ES
es_map = {434: "Batería y amplis", 570: "Práctica en casa", 54: "Principiantes"}
for prod in d:
    if prod['id'] in es_map:
        prod['bestFor']['es'] = es_map[prod['id']]
json.dump(d, open(p, 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
for prod in json.load(open(p, encoding='utf-8')):
    if prod['id'] in short:
        print(prod['id'], prod['bestFor'])
