import re, os
guides_dir = r"C:\Users\Daniel\projects\topmusiciangear\guides"
all_es = set()
all_en = set()
for f in sorted(os.listdir(guides_dir)):
    if "-vs-" not in f or not f.endswith(".html"):
        continue
    path = os.path.join(guides_dir, f)
    html = open(path, "r", encoding="utf-8").read()
    names = re.findall(r'guide-product-card-title">([^<]+)<', html)
    for n in names:
        if f.endswith("_es.html"):
            all_es.add(n)
        else:
            all_en.add(n)
print("EN names:", sorted(all_en))
print()
print("ES names:", sorted(all_es))
print()
# Find mismatches
for n in all_es:
    if n not in all_en:
        print(f"MISMATCH: {n}")
