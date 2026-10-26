import json, re
g=json.load(open('data/guides.json',encoding='utf-8'))
p=json.load(open('data/products.json',encoding='utf-8'))
pm={x['id']:x for x in p}

# Build map: product_id -> guide section content
prod_guides={}
for guide in g:
    for sec in guide.get('sections',[]):
        for pid in (sec.get('products') or []):
            if pid not in prod_guides:
                prod_guides[pid]=[]
            prod_guides[pid].append((guide['id'], sec.get('content','')+' '+sec.get('content_es','')))

report=[]
for prod in p:
    if not prod.get('facts'):
        continue
    pid=prod['id']
    our_facts = [(f['value'], f['label'].get('en','')) for f in prod['facts']]
    our_bestfor = prod.get('bestFor',{}).get('en','')
    # get guide content
    contents = prod_guides.get(pid, [])
    guide_specs = set()
    for gid, content in contents:
        # extract type
        for m in re.finditer(r'(dynamic|condenser|ribbon|shotgun|wireless|usb)', content, re.I):
            guide_specs.add('type:'+m.group(1).lower())
        # extract pattern
        for m in re.finditer(r'(cardioid|supercardioid|hypercardioid|omni(?:directional)?|figure-?8|lobar|multi-pattern)', content, re.I):
            guide_specs.add('pattern:'+m.group(1).lower())
        # extract self-noise
        for m in re.finditer(r'self[- ]?noise[^.]*?(\d+)\s*dB', content, re.I):
            guide_specs.add('selfnoise:'+m.group(1))
        # extract SPL
        for m in re.finditer(r'(\d+)\s*dB\s*SPL', content, re.I):
            guide_specs.add('spl:'+m.group(1))
        # extract diaphragm
        for m in re.finditer(r'(\d+)\s*mm', content, re.I):
            guide_specs.add('dia:'+m.group(1))
    report.append(f"PID {pid} | {prod['title']} | ours={our_facts} bestFor={our_bestfor} | guide_specs={sorted(guide_specs)}")

open('temp/audit_report.txt','w',encoding='utf-8').write('\n'.join(report))
print('done', len(report))
