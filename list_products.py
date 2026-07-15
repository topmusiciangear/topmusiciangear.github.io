import re, os
guides_dir = r"C:\Users\Daniel\projects\topmusiciangear\guides"
products = set()
for f in sorted(os.listdir(guides_dir)):
    if "-vs-" not in f or not f.endswith(".html") or f.endswith("_es.html"):
        continue
    path = os.path.join(guides_dir, f)
    html = open(path, "r", encoding="utf-8").read()
    names = re.findall(r'guide-product-card-title">([^<]+)<', html)
    for n in names:
        products.add(n)
for p in sorted(products):
    print(p)
print(f"\nTotal unique products: {len(products)}")
