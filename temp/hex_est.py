raw=open('data/products.json','rb').read()
needle=b'"desc_es": "El legendario'
i=raw.find(needle)
seg=raw[i:i+200]
start=seg.find(b': "')+3
# find 'est' in decoded? Instead locate bytes for est
k=seg.find(b'est')
print('k',k)
print(seg[k:k+10].hex())
print(seg[k:k+10])