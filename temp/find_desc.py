data=open('data/products.json','rb').read()
needle=b'"desc_es": "El legendario'
i=data.find(needle)
print('needle found', i)
print(repr(data[i:i+160]))