import json

with open('data/guides.json', 'r', encoding='utf-8') as f:
    guides = json.load(f)

for gid in ('ew100-vs-ulxd', 'xr18-vs-cq18t', 'active-vs-passive-pa'):
    for g in guides:
        if g['id'] == gid:
            print(f"\n=== {gid} ===")
            print(f"sections: {len(g.get('sections', []))}")
            for s in g.get('sections', []):
                h = s.get('heading', '')[:80]
                print(f"  heading: {h}")
                print(f"  products: {s.get('products', [])}")
            c = str(g.get('conclusion', ''))[:150]
            print(f"conclusion: {c}")
            
            # Check all FAQ-like fields
            for k, v in g.items():
                if 'faq' in k.lower():
                    print(f"  {k}: {str(v)[:100]}")
            break
