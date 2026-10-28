import json, urllib.parse
p="data/products.json"
data=json.load(open(p,encoding="utf-8"))
ids=[459,1058,1059,1060,1061,553,1062,1063,1064,1065]
for prod in data:
    if prod.get("id") in ids:
        stores=prod.setdefault("stores",{})
        if "reverb" not in stores:
            q=urllib.parse.quote(prod["title"])
            stores["reverb"]=f"https://reverb.com/marketplace?query={q}"
with open(p,"w",encoding="utf-8") as f:
    json.dump(data,f,ensure_ascii=False,indent=2)
print("done")
PY