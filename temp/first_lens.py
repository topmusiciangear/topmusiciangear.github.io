import json, re
d=json.load(open('temp/products_full_original.json',encoding='utf-8'))

def split_sentences(s):
    s=' '.join(s.split())
    # split at .!? followed by space and uppercase/quote/end, but not decimals
    parts=re.split(r'(?<=[.!?])\s+(?=[A-ZÁÉÍÓÚÜÑ¿¡"“\'\(\[])', s)
    return [p.strip() for p in parts if p.strip()]

for f in ['desc','desc_es']:
    first_lens=[]
    for p in d:
        s=(p.get(f) or '').strip()
        if not s: continue
        ss=split_sentences(s)
        first_lens.append(len(ss[0]) if ss else 0)
    first_lens.sort()
    print(f,'first sentence median',first_lens[len(first_lens)//2],'p90',first_lens[int(len(first_lens)*0.9)],'max',first_lens[-1],'>260',sum(1 for x in first_lens if x>260),'>300',sum(1 for x in first_lens if x>300))
# print >260 examples
for f in ['desc','desc_es']:
    print('---',f)
    for p in d:
        s=(p.get(f) or '').strip()
        if not s: continue
        ss=split_sentences(s)
        if ss and len(ss[0])>260:
            print(p['id'],len(ss[0]),repr(ss[0]))