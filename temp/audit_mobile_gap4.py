import re

html = open('guides/at2020-vs-p120.html', encoding='utf-8', errors='ignore').read()

m = re.search(r'<div class="guide-section-mediabuy">', html)
start = m.start()
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

# Buscar shop-more-list y shop-btn-review
more_match = re.search(r'<div class="shop-more-list".*?</div>', block, re.DOTALL)
if more_match:
    print("=== shop-more-list (first 1000 chars) ===")
    print(more_match.group(0)[:1000])

review_match = re.search(r'<button type="button" class="shop-btn-review".*?</button>', block, re.DOTALL)
if review_match:
    print("\n=== shop-btn-review ===")
    print(review_match.group(0)[:800])
