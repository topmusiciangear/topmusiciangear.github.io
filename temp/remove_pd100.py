import json, re
path = 'data/guides.json'
with open(path, 'r', encoding='utf-8') as f:
    data = json.load(f)

product_id = 436
product_name_en = 'MAONO PD100 Gen2 USB/XLR Dynamic Microphone'
product_name_es = 'Micrófono Dinámico USB/XLR MAONO PD100 Gen2'
# Also shorter variants
product_names = [product_name_en, product_name_es, 'MAONO PD100 Gen2']
product_pattern = re.compile('|'.join(map(re.escape, product_names)), re.IGNORECASE)

def clean_html(text, pattern):
    # Remove <p>...</p> blocks containing product name
    # Split by paragraph tags
    # Simpler: remove any occurrence of product name and surrounding <strong>...</strong> paragraph
    # Use regex to remove <p>.*product.*</p>
    # We'll remove paragraphs containing pattern
    def repl(m):
        inner = m.group(0)
        if pattern.search(inner):
            # remove whole paragraph
            return ''
        return inner
    # Replace <p>...</p> blocks
    cleaned = re.sub(r'<p[^>]*>.*?</p>', repl, text, flags=re.DOTALL)
    # Also remove any remaining inline mentions
    cleaned = pattern.sub('', cleaned)
    # Collapse multiple spaces
    cleaned = re.sub(r'\s{2,}', ' ', cleaned)
    return cleaned.strip()

for guide in data:
    if guide.get('id') != 'budget-mics':
        continue
    # Sections
    new_sections = []
    for sec in guide.get('sections', []):
        # Remove dedicated section if heading mentions PD100
        heading = sec.get('heading','')
        heading_es = sec.get('heading_es','')
        if 'PD100' in heading or 'PD100' in heading_es:
            # Skip this section entirely
            continue
        # Filter products list
        prods = sec.get('products', [])
        prods_filtered = [p for p in prods if p != product_id]
        sec['products'] = prods_filtered
        # Clean content
        if 'content' in sec:
            sec['content'] = clean_html(sec['content'], product_pattern)
        if 'content_es' in sec:
            sec['content_es'] = clean_html(sec['content_es'], product_pattern)
        new_sections.append(sec)
    guide['sections'] = new_sections

    # verdict / verdict_es
    if 'verdict' in guide:
        guide['verdict'] = clean_html(guide['verdict'], product_pattern)
    if 'verdict_es' in guide:
        guide['verdict_es'] = clean_html(guide['verdict_es'], product_pattern)

    # conclusion / conclusion_es
    if 'conclusion' in guide:
        guide['conclusion'] = clean_html(guide['conclusion'], product_pattern)
    if 'conclusion_es' in guide:
        guide['conclusion_es'] = clean_html(guide['conclusion_es'], product_pattern)

    # productTable
    pt = guide.get('productTable')
    if isinstance(pt, dict):
        # Remove column with PD100
        cols = pt.get('columns', [])
        keep_idx = []
        for i, col in enumerate(cols):
            title = col.get('title','')
            title_es = col.get('title_es','')
            if product_pattern.search(title) or product_pattern.search(title_es):
                continue
            keep_idx.append(i)
        new_cols = [cols[i] for i in keep_idx]
        # Filter rows values
        new_rows = []
        for row in pt.get('rows', []):
            values = row.get('values', [])
            new_values = [values[i] for i in keep_idx if i < len(values)]
            row_copy = dict(row)
            row_copy['values'] = new_values
            new_rows.append(row_copy)
        pt['columns'] = new_cols
        pt['rows'] = new_rows
        guide['productTable'] = pt

    # verdictProsCons
    vpc = guide.get('verdictProsCons', [])
    new_vpc = []
    for item in vpc:
        name = item.get('name','')
        name_es = item.get('name_es','')
        if product_pattern.search(name) or product_pattern.search(name_es):
            continue
        # Also clean pros/cons content
        new_item = dict(item)
        # optional clean textual fields
        for k in ['pros','cons','pros_es','cons_es']:
            if k in new_item and isinstance(new_item[k], list):
                new_item[k] = [v for v in new_item[k] if not product_pattern.search(v)]
        new_vpc.append(new_item)
    guide['verdictProsCons'] = new_vpc

    # featuredProducts
    fp = guide.get('featuredProducts', [])
    guide['featuredProducts'] = [p for p in fp if p != product_id]

    # Remove product id from any other top-level product arrays (e.g., relatedGuides not)
    # Also check if intro mentions product name
    # Clean intro fields
    for field in ['intro','intro_es']:
        if field in guide:
            guide[field] = product_pattern.sub('', guide[field])

    # Clean description fields
    for field in ['description','description_es','featuredSnippet']:
        if field in guide and isinstance(guide[field], str):
            guide[field] = product_pattern.sub('', guide[field])

# Write back
with open(path, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print('Done')
