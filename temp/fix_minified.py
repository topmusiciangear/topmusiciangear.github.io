s = open('css/style.min.css', encoding='utf-8').read()

# Fix the buy section: change flex:1 1 auto;width:100% to flex:1 1 50%;width:50%
old = '.guide-section-mediabuy > .guide-section-buy{flex:1 1 auto;width:100%;max-width:none}'
new = '.guide-section-mediabuy > .guide-section-buy{flex:1 1 50%;width:50%;max-width:none}'

if old in s:
    s = s.replace(old, new)
    print('Replaced buy section rules')
else:
    print('Old pattern not found')

open('css/style.min.css', 'w', encoding='utf-8').write(s)
print('Minified CSS updated')