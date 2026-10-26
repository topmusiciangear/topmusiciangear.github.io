s = open('css/style.min.css', encoding='utf-8').read()

# 1. Add flex-wrap: wrap to mediabuy mobile query
old1 = '.guide-section-mediabuy{flex-direction:row}'
new1 = '.guide-section-mediabuy{flex-direction:row;flex-wrap:wrap}'
if old1 in s:
    s = s.replace(old1, new1, 1)
    print('1. Added flex-wrap: wrap to minified mediabuy')
else:
    print('1. old1 not found')

# 2. Change buy section to 100% with margin-top
old2 = '.guide-section-mediabuy > .guide-section-buy{flex:1 1 auto;width:100%;max-width:none}'
new2 = '.guide-section-mediabuy > .guide-section-buy{flex:1 1 100%;width:100%;max-width:none;margin-top:16px}'
if old2 in s:
    s = s.replace(old2, new2, 1)
    print('2. Updated buy section to 100% with margin-top')
else:
    print('2. old2 not found')

# 3. Change photo width from 120px to 50% in mobile query
old3 = 'width:120px;height:120px;object-fit:contain;padding:4px;box-sizing:border-box;border}'
# Need to find the specific occurrence in the mobile context
# Let me search for width:120px in the mobile section
import re
# Find all width:120px occurrences
for m in re.finditer(r'width:\\s*120px', s):
    start = m.start()
    context = s[max(0,start-50):start+50]
    if 'flex-direction:row' in context or 'max-width:640' in context:
        print(f'3a. Found width:120px in mobile context at {start}')
        # Replace this specific one
        end = s.index('}', start)
        before = s[:start]
        after = s[end+1:]
        new_width = 'width:50%;height:50%'
        # Check if already 50%
        if 'width:50%' not in before[-50:]:
            s = before + new_width + '}' + after
            print('3b. Replaced width:120px with width:50% in mobile context')
        else:
            print('3b. Already width:50%')
        break
else:
    print('3. No width:120px found in mobile context')

# 4. Add mobile 640px rule for quick-facts 50%
old4 = 'width:50%;height:50%;object-fit:contain;padding:4px;box-sizing:border-box;border}'
# Check if width:50% already exists
if 'width:50%}' in s:
    print('4. width:50% already present')
else:
    print('4. Need to add width:50% for photos')
    # Try to find the photo rule and change 120px to 50%
    # This is tricky in minified, let's just verify what we have

# Write the file
open('css/style.min.css', 'w', encoding='utf-8').write(s)
print('Minified CSS written')

# Verify the mobile media query
i = s.find('max-width:640px')
if i >= 0:
    print()
    print('Mobile query in minified:')
    # Find the end brace
    end = s.index('}', i)
    print(s[i:end+1])