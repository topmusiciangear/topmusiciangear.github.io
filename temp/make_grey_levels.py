from PIL import Image, ImageDraw, ImageFont

prod = Image.open('temp/mackie_transparent.png').convert('RGBA')
W, H = 380, 285
LABEL = 34

def cover(src, w, h):
    r = max(w / src.width, h / src.height)
    s = src.resize((round(src.width * r), round(src.height * r)), Image.LANCZOS)
    x = (s.width - w) // 2
    y = (s.height - h) // 2
    return s.crop((x, y, x + w, y + h))

img = cover(prod, W, H)
levels = [0.0, 0.08, 0.12, 0.16, 0.20, 0.26]
sheet = Image.new('RGB', (W * len(levels), H + LABEL), (10, 10, 10))
d = ImageDraw.Draw(sheet)
try:
    font = ImageFont.truetype('arial.ttf', 16)
except Exception:
    font = ImageFont.load_default()

for i, a in enumerate(levels):
    base = (26, 26, 26)
    bg = tuple(round(base[c] + a * (255 - base[c])) for c in range(3))
    tile = Image.new('RGBA', (W, H), bg + (255,))
    tile.alpha_composite(img)
    sheet.paste(tile.convert('RGB'), (i * W, 0))
    txt = 'base' if a == 0 else f'+{int(a*100)}% blanco  {bg[0]}'
    d.text((i * W + 14, H + 9), txt, fill=(200, 200, 200), font=font)
    d.line([(i * W, 0), (i * W, H + LABEL)], fill=(60, 60, 60))

sheet.save('temp/mackie_grey_levels.jpg', quality=92)
print('ok', sheet.size)
