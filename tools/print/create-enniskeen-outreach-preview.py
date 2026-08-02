from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from PIL import Image as PILImage
import os


ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "../.."))
OUT = os.path.join(ROOT, "output/pdf/hotel-enniskeen-outreach-preview.pdf")
TMP = os.path.join(ROOT, "tmp/pdfs")
os.makedirs(os.path.dirname(OUT), exist_ok=True)
os.makedirs(TMP, exist_ok=True)

W, H = A4
FOREST = colors.HexColor("#173E31")
FOREST_DARK = colors.HexColor("#102D24")
GOLD = colors.HexColor("#C9952D")
INK = colors.HexColor("#16221D")
MOSS = colors.HexColor("#53665D")
LINE = colors.HexColor("#CBD3CE")
PALE = colors.HexColor("#F5F6F3")
WHITE = colors.white

pdfmetrics.registerFont(TTFont("AvenirBook", "/System/Library/Fonts/Avenir Next.ttc", subfontIndex=7))
pdfmetrics.registerFont(TTFont("AvenirDemi", "/System/Library/Fonts/Avenir Next.ttc", subfontIndex=2))
pdfmetrics.registerFont(TTFont("AvenirItalic", "/System/Library/Fonts/Avenir Next.ttc", subfontIndex=4))
pdfmetrics.registerFont(TTFont("Baskerville", "/System/Library/Fonts/Supplemental/Baskerville.ttc", subfontIndex=0))
pdfmetrics.registerFont(TTFont("BaskervilleItalic", "/System/Library/Fonts/Supplemental/Baskerville.ttc", subfontIndex=2))

homepage = os.path.join(ROOT, "public/media/concepts/hotel-enniskeen/hotel-enniskeen-after.jpg")
logo = os.path.join(ROOT, "public/brand/mourne-made-logo.png")


def crop(path, x, y, w, h, anchor="center"):
    im = PILImage.open(path).convert("RGB")
    # The saved homepage includes a concept-disclosure bar above the site itself.
    # The PDF carries its own disclosure, so start the hero at the site's masthead.
    if os.path.basename(path) == "hotel-enniskeen-after.jpg":
        im = im.crop((0, 90, im.width, im.height))
    iw, ih = im.size
    target = w / h
    if iw / ih > target:
        nw = int(ih * target)
        if anchor == "left":
            left = 0
        elif anchor == "right":
            left = iw - nw
        else:
            left = (iw - nw) // 2
        box = (left, 0, left + nw, ih)
    else:
        nh = int(iw / target)
        top = max(0, (ih - nh) // 2)
        box = (0, top, iw, top + nh)
    out = os.path.join(TMP, f"{os.path.basename(path)}-{int(w)}-{int(h)}.jpg")
    im.crop(box).save(out, quality=95)
    c.drawImage(out, x, y, width=w, height=h, mask="auto")


def write(value, x, y, font="AvenirBook", size=10, colour=INK, leading=None, width=None):
    c.setFont(font, size)
    c.setFillColor(colour)
    leading = leading or size * 1.35
    words = value.split()
    lines, line = [], ""
    for word in words:
        trial = (line + " " + word).strip()
        if width and line and pdfmetrics.stringWidth(trial, font, size) > width:
            lines.append(line)
            line = word
        else:
            line = trial
    if line:
        lines.append(line)
    for index, line in enumerate(lines):
        c.drawString(x, y - index * leading, line)
    return y - len(lines) * leading


def label(value, x, y, size=7, colour=MOSS, spacing=0.55):
    c.setFont("AvenirDemi", size)
    c.setFillColor(colour)
    cursor = x
    for char in value.upper():
        c.drawString(cursor, y, char)
        cursor += pdfmetrics.stringWidth(char, "AvenirDemi", size) + spacing


c = canvas.Canvas(OUT, pagesize=A4)
c.setTitle("Hotel Enniskeen outreach preview - Mourne Made")
c.setAuthor("Mourne Made")

c.setFillColor(PALE)
c.rect(0, 0, W, H, fill=1, stroke=0)

# Quiet, useful provenance at the top; the concept itself gets the first impression.
c.drawImage(logo, 17 * mm, H - 18 * mm, width=42 * mm, height=11.5 * mm,
            mask="auto", preserveAspectRatio=True, anchor="sw")
write("Hotel Enniskeen / Newcastle", W - 82 * mm, H - 11.5 * mm,
      font="AvenirDemi", size=7.5, colour=FOREST, width=65 * mm)
write("Prepared by Mourne Made / August 2026", W - 82 * mm, H - 17.5 * mm,
      size=7.5, colour=MOSS, width=65 * mm)

# 1. Hero: the redesigned homepage, shown as the real artifact rather than re-described.
hero_x = 17 * mm
hero_y = H - 115 * mm
hero_w = W - 34 * mm
hero_h = 88 * mm
c.setFillColor(FOREST_DARK)
c.rect(hero_x - 1.2 * mm, hero_y - 1.2 * mm, hero_w + 2.4 * mm, hero_h + 2.4 * mm, fill=1, stroke=0)
crop(homepage, hero_x, hero_y, hero_w, hero_h, anchor="center")
c.setFillColor(FOREST)
c.rect(hero_x, hero_y - 10 * mm, hero_w, 10 * mm, fill=1, stroke=0)
write("A clearer first impression, with checking dates close at hand.",
      hero_x + 5 * mm, hero_y - 6.7 * mm, font="AvenirDemi", size=7.5,
      colour=WHITE, width=155 * mm)

# 2. A conservative problem statement paired with a concrete, supportive response.
statement_top = hero_y - 27 * mm
write("Guests can already find Enniskeen online.", 17 * mm, statement_top - 2 * mm,
      font="Baskerville", size=18, colour=INK, leading=21, width=69 * mm)
write("The house, rooms, dining and estate are all there. Bringing them together more clearly would help guests understand the stay and find their way to checking dates.",
      17 * mm, statement_top - 29 * mm, size=8.5, colour=MOSS, leading=11.5, width=70 * mm)

c.setStrokeColor(LINE)
c.setLineWidth(0.65)
c.line(99 * mm, statement_top + 1 * mm, 99 * mm, statement_top - 54 * mm)

write("Bring the whole stay into one clear route.", 111 * mm, statement_top - 2 * mm,
      font="Baskerville", size=23, colour=FOREST, leading=25, width=80 * mm)
write("Lead with the character of the house, give each reason to visit room to breathe, and hand guests into the Bookin1 journey Enniskeen already uses.",
      111 * mm, statement_top - 29 * mm, size=8.5, colour=INK, leading=11.5, width=78 * mm)
write("Enniskeen's story, voucher shop and booking engine stay in place.",
      111 * mm, statement_top - 49 * mm, font="AvenirDemi", size=7.5, colour=FOREST,
      leading=10, width=78 * mm)

# 3. The concept in one glance: three distinct moments, one continuous route.
summary_y = 66 * mm
c.setFillColor(WHITE)
c.rect(0, 0, W, 78 * mm, fill=1, stroke=0)
write("From the house to checking dates.", 17 * mm, summary_y,
      font="Baskerville", size=17, colour=FOREST)
write("The character of Enniskeen stays connected to the booking journey already in use.",
      17 * mm, summary_y - 9 * mm, size=8, colour=MOSS, width=150 * mm)

node_y = 42 * mm
centres = [41 * mm, 105 * mm, 169 * mm]
heads = ["Meet the place", "Explore the stay", "Check dates"]
bodies = ["House and Shimna Valley", "Rooms, dining, estate and days out", "Existing Bookin1 journey"]

# One rail governs the whole diagram; text and nodes share the same three centres.
c.setStrokeColor(GOLD)
c.setLineWidth(1)
c.line(centres[0], node_y, centres[-1], node_y)
for index, (centre, head, body) in enumerate(zip(centres, heads, bodies)):
    c.setFillColor(GOLD if index == 2 else FOREST)
    c.circle(centre, node_y, 2.4 * mm, fill=1, stroke=0)
    c.setFont("AvenirDemi", 9)
    c.setFillColor(INK)
    c.drawCentredString(centre, 31 * mm, head)
    c.setFont("AvenirBook", 7.5)
    c.setFillColor(MOSS)
    c.drawCentredString(centre, 23 * mm, body)

c.setStrokeColor(LINE)
c.setLineWidth(0.5)
c.line(17 * mm, 17 * mm, W - 17 * mm, 17 * mm)
write("Independent, uncommissioned concept. Visualisations are provisional; any future work would use only assets and wording approved by the hotel.",
      17 * mm, 10.5 * mm, size=6.2, colour=MOSS, width=112 * mm, leading=8)
write("mournemade.co.uk/transformations/hotel-enniskeen/", W - 71 * mm, 10.5 * mm,
      font="AvenirDemi", size=6.2, colour=FOREST, width=54 * mm)

c.save()
print(OUT)
