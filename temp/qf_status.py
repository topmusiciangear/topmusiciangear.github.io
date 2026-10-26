import json, collections

p = json.load(open('data/products.json', encoding='utf-8'))
cat = collections.Counter()
have = collections.Counter()
for x in p:
    k = x.get('category') or 'NONE'
    cat[k] += 1
    if x.get('facts'):
        have[k] += 1

print('total products:', len(p))
print('with facts   :', sum(have.values()))
print()
print(f"{'category':24} {'total':>6} {'facts':>6} {'missing':>8}")
for k, v in cat.most_common():
    print(f"{k:24} {v:6} {have.get(k, 0):6} {v - have.get(k, 0):8}")
