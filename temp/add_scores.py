import json
p="data/products.json"
data=json.load(open(p,encoding="latin-1"))
scores={459:9.8,1058:9.6,1059:9.5,1060:9.1,1061:9.2,553:9.0,1062:8.9,1063:8.8,1064:8.7,1065:9.0}
for prod in data:
    if prod.get("id") in scores:
        prod["score"]=scores[prod["id"]]
with open(p,"w",encoding="latin-1") as f:
    json.dump(data,f,ensure_ascii=False,indent=2)
print("done")
PY