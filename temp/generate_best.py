import json, re

STOP = set('''a an the and or but for with of to in on at by from as is are were was be been being this that these those per than into over under between during without within
el la los las un una unos unas de del al a con por para en y o u que se su sus sin sobre entre hasta desde segun según durante mediante tras contra ni e'''.split())

def split_sentences(s):
    s=' '.join(s.split())
    parts=re.split(r'(?<=[.!?])\s+(?=[A-ZÁÉÍÓÚÜÑ¿¡"“\'\(\[])', s)
    return [p.strip() for p in parts if p.strip()]

def strip_tail(p):
    p=re.sub(r'[\s,;:—–-]+$','',p)
    for _ in range(8):
        words=re.findall(r"[\wÁÉÍÓÚÜÑáéíóúüñ'’.-]+", p)
        if not words: break
        last=words[-1].strip('.,;:—–-').lower()
        if last in STOP or last.isdigit() or len(last)==1:
            newp=re.sub(r"[\s,;:—–-]*[\wÁÉÍÓÚÜÑáéíóúüñ'’.-]+$", '', p).strip()
            newp=re.sub(r'[\s,;:—–-]+$','',newp)
            if newp==p: break
            p=newp
            continue
        break
    return p

STRONG = r';:| [—–] '

def strong_cut(s, max_len):
    cut=s[:max_len]
    cands=[m.start() for m in re.finditer(STRONG, cut)]
    for c in reversed(cands):
        p=strip_tail(cut[:c].strip())
        if len(p)>=110:
            return p+'.'
    return None

CUTS=[]

def make_desc(s, max_len=190, hard_max=230, min_len=115):
    s=' '.join(s.split())
    if not s:
        return s
    ss=split_sentences(s)
    if not ss:
        return s
    out=ss[0]
    if len(out)>max_len:
        cut=strong_cut(out, max_len)
        if cut:
            CUTS.append((out, cut))
            out=cut
    i=1
    while i<len(ss):
        cand=out+' '+ss[i]
        if len(out)>=min_len and len(cand)>max_len:
            break
        if len(cand)<=hard_max or (len(out)<min_len and len(cand)<=260):
            out=cand
            i+=1
            continue
        if len(out)<min_len:
            cut=strong_cut(cand, max_len)
            if cut:
                CUTS.append((cand, cut))
                out=cut
        break
    out=out.strip()
    out=re.sub(r'\s+',' ',out)
    if out.endswith('…'):
        out=out[:-1].rstrip()
    # normalize lowercase sentence starts left in the source text
    out=re.sub(r'([.!?] )([a-záéíóúüñ])', lambda m: m.group(1)+m.group(2).upper(), out)
    if not re.search(r'[.!?]$', out):
        out=out.rstrip(' ,;:—–-')+'.'
    return out

full={p['id']:p for p in json.load(open('temp/products_full_original.json',encoding='utf-8'))}
b0d={p['id']:p for p in json.load(open('temp/products_before.json',encoding='utf-8'))}
cur={p['id']:p for p in json.load(open('data/products.json',encoding='utf-8'))}

out={}
for pid,p in cur.items():
    src=full.get(pid) or b0d.get(pid) or p
    for f in ['desc','desc_es']:
        base=(src.get(f) or p.get(f) or '').strip()
        out[(pid,f)]=make_desc(base)

rows=[(pid,f,n) for (pid,f),n in out.items()]
with open('temp/generated_descs.txt','w',encoding='utf-8') as fh:
    for pid,f,n in rows:
        fh.write(f"{pid} {f} len={len(n)}\n{n}\n\n")

with open('temp/generated_cuts.txt','w',encoding='utf-8') as fh:
    for orig,cut in CUTS:
        fh.write(f"ORIG({len(orig)}): {orig}\nCUT({len(cut)}): {cut}\n\n")

lens=[len(n) for _,_,n in rows]
lens.sort()
print('n',len(lens),'min',lens[0],'median',lens[len(lens)//2],'p90',lens[int(len(lens)*0.9)],'max',lens[-1])
print('>200',sum(1 for x in lens if x>200),'>240',sum(1 for x in lens if x>240),'<100',sum(1 for x in lens if x<100),'<110',sum(1 for x in lens if x<110))
print('cuts',len(CUTS))

bad=[]
for pid,f,n in rows:
    words=re.findall(r"[\wÁÉÍÓÚÜÑáéíóúüñ'’.-]+", n)
    last=words[-1].strip('.,;:—–-').lower() if words else ''
    if last in STOP or last.isdigit() or len(last)==1:
        bad.append((pid,f,last,n))
print('bad endings',len(bad))
with open('temp/generated_bad.txt','w',encoding='utf-8') as fh:
    for r in bad:
        fh.write(f"{r[0]} {r[1]} last={r[2]!r}\n{r[3]}\n\n")
