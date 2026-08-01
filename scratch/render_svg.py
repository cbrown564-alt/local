import re
import subprocess
import os
import shutil

dist_index = "dist/index.html"
with open(dist_index, "r", encoding="utf-8") as f:
    html = f.read()

# Extract town-map css
css_match = re.search(r"<style[^>]*>(.*?\.town-map.*?)</style>", html, re.DOTALL)
css = css_match.group(1) if css_match else ""

# Extract town-map svg
svg_match = re.search(r"(<svg[^>]*class=\"town-map-svg\"[^>]*>.*?</svg>)", html, re.DOTALL)
if not svg_match:
    print("SVG not found in dist/index.html")
    exit(1)

svg_code = svg_match.group(1)

# Inject CSS inside <defs><style>...</style></defs>
full_svg = svg_code.replace("<defs>", f"<defs><style>{css}</style>")

svg_out = ".scratch/map_standalone.svg"
os.makedirs(".scratch", exist_ok=True)
with open(svg_out, "w", encoding="utf-8") as f:
    f.write(full_svg)

png_target_dir = "/Users/cobro/.gemini/antigravity/brain/50e5334f-ee14-47db-b040-6464dbdbada3"
os.makedirs(png_target_dir, exist_ok=True)

# Run qlmanage
cmd = ["qlmanage", "-t", "-s", "1440", "-o", png_target_dir, svg_out]
subprocess.run(cmd, check=True)

# qlmanage names it map_standalone.svg.png
generated_png = os.path.join(png_target_dir, "map_standalone.svg.png")
final_png = os.path.join(png_target_dir, "town_map_rendered.png")

if os.path.exists(generated_png):
    shutil.move(generated_png, final_png)
    print(f"Successfully generated rendered map image at {final_png}")
else:
    print("qlmanage did not produce expected output file")
