import urllib.request
from PIL import Image
from io import BytesIO
import os

base = "C:\\Users\\Daniel\\projects\\topmusiciangear"
mapping = {
 "nylon-cordoba-c5.webp": "https://r2.gear4music.com/media/64/647915/1200/preview.jpg",
 "nylon-ortega-r121.webp": "https://r2.gear4music.com/media/17/170228/1200/preview.jpg",
 "nylon-taylor-12en.webp": "https://www.taylorguitars.com/sites/default/files/styles/pdp_gallery/public/images/2024-04/Taylor-Academy-12e-N-2209223132-FrontLeft-2023.png.webp?itok=atx0Gwy_",
 "nylon-yamaha-cg122msh.webp": "https://r2.gear4music.com/media/59/598598/1200/preview.jpg",
 "nylon-ibanez-ga35tce.webp": "https://www.ibanez.com/common/product_artist_file/file/p_region_GA35TCE_NT_5B_10.png",
 "nylon-cordoba-protege-c1-34.webp": "https://l6c-acdn2.line6.net/data/6/0a00003e03db69e841fb5d131/image/jpeg/r17673_image/jpeg",
 "nylon-admira-alba.webp": "https://r2.gear4music.com/media/72/720706/1200/preview.jpg",
 "nylon-takamine-gc1ce.webp": "https://r2.gear4music.com/media/18/188552/1200/preview.jpg",
}
for name,url in mapping.items():
    out=os.path.join(base,"img","products",name)
    try:
        data=urllib.request.urlopen(url).read()
        im=Image.open(BytesIO(data))
        im.convert("RGB").save(out, "WEBP", quality=88)
        print("OK", name, im.size)
    except Exception as e:
        print("FAIL", name, e)
