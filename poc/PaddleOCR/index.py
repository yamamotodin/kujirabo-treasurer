from paddleocr import PaddleOCR, draw_ocr
from PIL import Image

ocr = PaddleOCR(lang="japan")
img_path = './recept03.jpeg'
# img_path = './scrs.png'

# file, ext = os.path.splitext(img_path)
with Image.open(img_path) as im:
    result = ocr.ocr(img_path)
    for res in result:
        for index in range(len(res)):
            line = res[index]
#            print(line)
            xys = line[0]
            box = (xys[0][0], xys[0][1], xys[1][0], xys[2][1])
#            print(box)
            filename = "crop_%02d.jpeg" % (index)
            im.crop(box=box).convert('RGB').save(fp=filename)
            print(filename)

        # im.thumbnail(size)
        # im.save(file + ".thumbnail", "JPEG")


