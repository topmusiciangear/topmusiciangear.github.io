with open('data/products.json', 'rb') as f:
    raw_bytes = f.read()

# Check lone continuation bytes with context
print('Lone continuation bytes location and context:')
count = 0
for i, b in enumerate(raw_bytes):
    if 0x80 <= b <= 0xBF:
        if i == 0:
            count += 1
            ctx = raw_bytes[max(0,i-5):i+5]
            if count <= 5:
                print(f'  pos={i}: ...{ctx.hex()}...')
        else:
            prev = raw_bytes[i-1]
            if not (0xC2 <= prev <= 0xF4):
                count += 1
                if count <= 10:
                    ctx = raw_bytes[max(0,i-10):min(len(raw_bytes),i+10)]
                    try:
                        ctx_decoded = ctx.decode('utf-8', errors='replace')
                    except:
                        ctx_decoded = '<undecodable>'
                    print(f'  pos={i} (byte=0x{b:02X}, prev=0x{prev:02X}): ...{ctx.hex()}... ctx="{ctx_decoded}"')

print(f'\nTotal lone continuation bytes: {count}')
