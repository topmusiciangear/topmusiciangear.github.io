data=open('data/products.json','rb').read()
needle=b'"desc_es": "El legendario'
print('count', data.count(needle))