import json

with open('public/assets/categories/portraits/portraits_images.json', 'r', encoding='utf-8') as f:
    images = json.load(f)

ts_lines = ["export const PORTRAITS_IMAGES: CategoryImage[] = ["]
for img in images:
    ts_lines.append("  {")
    ts_lines.append(f"    id: '{img['id']}',")
    ts_lines.append(f"    src: '{img['src']}',")
    ts_lines.append(f"    alt: '{img['alt']}',")
    ts_lines.append(f"    caption: '{img['caption']}',")
    ts_lines.append("  },")
ts_lines.append("];\n")

portraits_ts = "\n".join(ts_lines)

with open('portraits_ts_chunk.txt', 'w', encoding='utf-8') as f:
    f.write(portraits_ts)

print(f"Generated {len(images)} portraits TS definitions.")

