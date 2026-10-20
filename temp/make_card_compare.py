from PIL import Image

prod = Image.open('temp/mackie_transparent.png').convert('RGBA')
W, H = 760, 570  # 2 cards of 380x285
card = Image.new('RGBA', (W * 2, H), (26, 26, 26, 255))

# left: plain dark tile, 4:3 cover crop like the site
def cover(src, w, h):
    r = max(w / src.width, h / src.height)
    s = src.resize((round(src.width * r), round(src.height * r)), Image.LANCZOS)
    x = (s.width - w) // 2
    y = (s.height - h) // 2
    return s.crop((x, y, x + w, y + h))

left = cover(prod, W, H)
card.alpha_composite(left, (0, 0))

# right: same cut-out, with a soft radial glow so the black cabinet separates
from PIL import ImageDraw, ImageFilter
glow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
d = ImageDraw.Draw(glow)
d.ellipse((W * 0.16, H * 0.10, W * 0.84, H * 0.95), fill=(255, 255, 255, 26))
glow = glow.filter(ImageFilter.GaussianBlur(38))
card.alpha_composite(glow, (W, 0))
card.alpha_composite(left, (W, 0))

card.convert('RGB').save('temp/mackie_card_compare.jpg', quality=92)
print('ok')
