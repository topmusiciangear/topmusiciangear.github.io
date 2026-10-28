import json
p="data/guides.json"
data=json.load(open(p,encoding="utf-8"))
guide=next(g for g in data if g.get("id")=="best-nylon-guitars-for-beginners")
vp=[]
for s in guide.get("sections",[]):
    vp.append({
        "name": s.get("heading",""),
        "name_es": s.get("heading_es",""),
        "pros": s.get("pros",[]),
        "pros_es": s.get("pros_es",[]),
        "cons": s.get("cons",[]),
        "cons_es": s.get("cons_es",[])
    })
guide["verdictProsCons"]=vp
# insert before faq if exists
with open(p,"w",encoding="utf-8") as f:
    json.dump(data,f,ensure_ascii=False,indent=2)
print("done")
PY