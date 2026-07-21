with open('data/products.json', 'rb') as f:
    raw = f.read()

# The byte pattern for the corrupt em dash
# Original — (U+2014) in UTF-8: E2 80 94
# When misinterpreted as Latin-1/Win-1252: â (E2) + € (80) + " (94 or 9D)
# Let's search for the common corruption patterns

import re

# Pattern 1: E2 80 94 (correct em dash in UTF-8)
correct_count = raw.count(b'\xe2\x80\x94')
print(f'Correct em dashes (—): {correct_count}')

# Pattern 2: Corrupt em dash - â followed by Windows-1252 artifacts
# The corruption could be: â€" (E2 82 AC E2 80 9C) or â€" (E2 80 9C) etc.
# Let's find all sequences that look like corrupted em dashes

# Search for â (0xC3 0xA2) near the context where em dashes should be
corrupt_count = 0
for i in range(len(raw) - 6):
    # Check for pattern: space + corrupt sequence + space
    # The typical corruption: 0xC3 0xA2 0xE2 0x82 0xAC 0xE2 0x80 0x9D = â€"
    # Or simpler: 0xE2 0x82 0xAC 0xE2 0x80 0x9D = €"
    # Let's check for 3-byte sequences where the first byte is E2 and context suggests em dash position
    if (raw[i:i+3] == b'\xe2\x82\xac' and i > 0 and chr(raw[i-1]) == ' '):
        # Found € preceded by space - might be part of corrupt em dash
        pass

# Simpler approach: just find all instances of 0xC3 0xA2 (â)
# which might indicate the mojibake
count_a = raw.count(b'\xc3\xa2')
print(f'Instances of â (possible mojibake): {count_a}')

# Find 0xE2 0x82 0xAC (€ in UTF-8) - this is often part of corrupt em dash
count_euro = raw.count(b'\xe2\x82\xac')
print(f'Instances of € (possible mojibake): {count_euro}')

# Show context for some of these
print('\nSamples of â occurrences:')
found = 0
for i in range(len(raw) - 10):
    if raw[i:i+2] == b'\xc3\xa2' and found < 5:
        ctx = raw[max(0,i-15):i+15]
        try:
            txt = ctx.decode('utf-8', errors='replace')
            print(f'  pos={i}: ...{txt}...')
        except:
            pass
        found += 1

print('\nSamples of € occurrences:')
found = 0
for i in range(len(raw) - 6):
    if raw[i:i+3] == b'\xe2\x82\xac' and found < 5:
        ctx = raw[max(0,i-15):i+15]
        try:
            txt = ctx.decode('utf-8', errors='replace')
            print(f'  pos={i}: ...{txt}...')
        except:
            pass
        found += 1
