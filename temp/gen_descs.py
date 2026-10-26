import json, re

STOP = set('''a an the and or but for with of to in on at by from as is are was were be been being this that these those per than into over under between during without within
el la los las un una unos unas de del al a con por para en y o u que se su sus sin sobre entre hasta desde segun según durante mediante tras contra ni e'''.split())

def first_sentence(s):
    s=' '.join(s.split())
    for i,ch in enumerate(s):
        if ch in '.!?':
            # skip decimal or abbreviation: next char must be space/end/quote/capital
            j=i+1
            while j<len(s) and s[j]==' ': j+=1
            if j>=len(s):
                return s[:i+1].strip()
            nxt=s[j]
            prev=s[i-1] if i>0 else ''
            if nxt.isupper() or nxt in '"“”¿¡([':
                # avoid decimal: if prev and next are digits
                if prev.isdigit() and nxt.isdigit():
                    continue
                # avoid common abbreviations
                token=re.findall(r'[A-Za-zÁÉÍÓÚÜÑáéíóúüñ.]+$', s[:i+1])
                if token and token[0].lower() in {'mr','mrs','dr','st','vs','etc','u.s','e.g','i.e'}:
                    continue
                return s[:i+1].strip()
    return s

def clean_cut(p):
    p=p.strip()
    p=re.sub(r'[\s,;:—–-]+$','',p)
    # drop trailing stopwords
    while True:
        words=re.findall(r"[\wÁÉÍÓÚÜÑáéíóúüñ'’.-]+", p)
        if not words: break
        last=words[-1].strip('.,;:—–-').lower()
        if last in STOP or last.isdigit() or len(last)==1:
            # remove last word
            p=re.sub(r"[\s,;:—–-]*[\wÁÉÍÓÚÜÑáéíóúüñ'’.-]+$", '', p).strip()
            p=re.sub(r'[\s,;:—–-]+$','',p)
            continue
        break
    return p

def make_desc(s, max_len=158):
    s=' '.join(s.split())
    fs=first_sentence(s)
    if len(fs)<=max_len:
        return fs
    cut=s[:max_len]
    # candidate boundaries in cut
    cands=[m.end() for m in re.finditer(r'[;:—–,)]', cut)]
    for c in reversed(cands):
        p=clean_cut(cut[:c])
        if len(p)>=60:
            return p+'.'
    # fallback word boundary
    p=clean_cut(cut.rsplit(' ',1)[0])
    return p+'.'

cur={p['id']:p for p in json.load(open('data/products.json',encoding='utf-8'))}
before={p['id']:p for p in json.load(open('temp/products_before.json',encoding='utf-8'))}
rows=[]
for pid,p in cur.items():
    o=before.get(pid,{})
    for f in ['desc','desc_es']:
        b=(o.get(f) or '').strip()
        c=(p.get(f) or '').strip()
        if not b: continue
        n=make_desc(b)
        if n!=c:
            rows.append((pid,f,c,n))
with open('temp/new_descs.txt','w',encoding='utf-8') as f:
    for r in rows:
        f.write(f"{r[0]} {r[1]}\nOLD: {r[2]}\nNEW: {r[3]}\n\n")
print('changed',len(rows))
# report problematic new
bad=[]
for pid,f,c,n in rows:
    words=re.findall(r"[\wÁÉÍÓÚÜÑáéíóúüñ'’.-]+", n)
    last=words[-1].strip('.,;:—–-').lower() if words else ''
    if last in STOP or last.isdigit() or len(last)==1 or len(n)<40:
        bad.append((pid,f,last,n))
with open('temp/new_bad.txt','w',encoding='utf-8') as f:
    for r in bad:
        f.write(f"{r[0]} {r[1]} last={r[2]!r}\n{r[3]}\n\n")
print('bad new',len(bad))