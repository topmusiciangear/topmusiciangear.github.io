with open('guides/pro-headphones.html', 'r', encoding='utf-8') as f:
    content = f.read()

checks = ['guide-comp-wrap', 'guide-verdict-grid', 'Focal Utopia 2022', 
          'How Do They Compare', 'guide-comp-table', 'verdict-product-name',
          'Pure beryllium']
for c in checks:
    print(f'{c}: {c in content}')

idx = content.find('guide-verdict')
if idx >= 0:
    print('Found guide-verdict at', idx)
    print(content[idx:idx+1200])
else:
    print('No guide-verdict section found')
    idx = content.find('Verdict')
    if idx >= 0:
        print('Found Verdict at', idx)
        print(content[idx:idx+500])
    # Show middle section
    mid = len(content) // 2
    print('Mid section:', content[mid:mid+500])
