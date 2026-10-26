import re

html = open('guides/at2020-vs-p120.html', encoding='utf-8', errors='ignore').read()

# Extraer cada bloque guide-section-mediabuy completo hasta su cierre
matches = list(re.finditer(r'<div class="guide-section-mediabuy">', html))
print(f"Total bloques: {len(matches)}\n")

for i, m in enumerate(matches):
    start = m.start()
    # Buscar el cierre del div guide-section-mediabuy correspondiente
    # Contar divs anidados
    depth = 0
    end = start
    j = start
    while j < len(html):
        if html[j:j+5] == '<div ':
            depth += 1
        elif html[j:j+6] == '</div>':
            depth -= 1
            if depth == 0:
                end = j + 6
                break
        j += 1
    
    block = html[start:end]
    
    print(f"=== BLOQUE {i+1} ===")
    
    # Mostrar guide-section-imgs
    imgs_match = re.search(r'<div class="guide-section-imgs">.*?</div>', block, re.DOTALL)
    if imgs_match:
        print("IMGS:", imgs_match.group(0)[:300])
    
    # Mostrar guide-section-buy completo
    buy_match = re.search(r'<div class="guide-section-buy">.*?</div>', block, re.DOTALL)
    if buy_match:
        print("BUY:", buy_match.group(0)[:1500])
    
    # Mostrar cualquier margin-top inline
    margins = re.findall(r'margin-top:\s*\d+px', block)
    print("MARGINS inline:", margins)
    print()
