import json, re
STOP = set('''a an the and or but for with of to in on at by from as is are were was be been being this that these those per than into over under between during without within
el la los las un una unos unas de del al a con por para en y o u que se su sus sin sobre entre hasta desde segun según durante mediante tras contra ni e'''.split())
def split_sentences(s):
    s=' '.join(s.split())
    parts=re.split(r'(?<=[.!?])\s+(?=[A-Z0-9ÁÉÍÓÚÜÑ¿¡"“\'\(\[])', s)
    return [p.strip() for p in parts if p.strip()]
def make(s,max_len=240,min_len=120):
    ss=split_sentences(s)
    if not ss: return s
    out=ss[0]; i=1
    while len(out)<min_len and i<len(ss):
        cand=out+' '+ss[i]
        if len(cand)<=max_len:
            out=cand; i+=1
        else:
            break
    return out
full={p['id']:p for p in json.load(open('temp/products_full_original.json',encoding='utf-8'))}
cur={p['id']:p for p in json.load(open('data/products.json',encoding='utf-8'))}
rows=[]
for pid,p in cur.items():
    src=full.get(pid) or p
    for f in ['desc','desc_es']:
        rows.append((pid,f,make((src.get(f) or p.get(f) or '').strip())))
lens=sorted(len(x[2]) for x in rows)
print('min',lens[0],'median',lens[len(lens)//2],'p90',lens[int(len(lens)*0.9)],'max',lens[-1])
for t in [100,120,140,160,180,200,220,240,260,300]:
    print(' >',t,sum(1 for x in lens if x>t),' <',t,sum(1 for x in lens if x<t))
with open('temp/gen_whole.txt','w',encoding='utf-8') as fh:
    for pid,f,n in rows:
        fh.write(f"{pid} {f} len={len(n)}\n{n}\n\n")
