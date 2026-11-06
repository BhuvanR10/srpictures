import urllib.request
import json
import os
import io
import time
from PIL import Image

dest_dir = os.path.join('public', 'assets', 'categories', 'portraits')
os.makedirs(dest_dir, exist_ok=True)

with open('portraits_files.json', 'r', encoding='utf-8') as f:
    raw_files = json.load(f)

# Deduplicate files by id
seen = set()
files = []
for item in raw_files:
    if item['id'] not in seen:
        seen.add(item['id'])
        files.append(item)

print(f"Total unique portrait files to download: {len(files)}")

downloaded_items = []

for idx, item in enumerate(files, 1):
    fid = item['id']
    raw_name = item['name']
    
    clean_name = f"portrait-{idx:02d}.webp"
    out_path = os.path.join(dest_dir, clean_name)
    web_path = f"/assets/categories/portraits/{clean_name}"
    
    print(f"[{idx}/{len(files)}] Downloading {raw_name} -> {clean_name}...")
    
    # Try Google's high-speed image CDN first
    img_data = None
    urls = [
        f"https://lh3.googleusercontent.com/d/{fid}=s1800",
        f"https://drive.google.com/uc?export=download&id={fid}"
    ]
    
    for url in urls:
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
            with urllib.request.urlopen(req, timeout=15) as resp:
                data = resp.read()
                if len(data) > 5000:
                    img_data = data
                    break
        except Exception as e:
            continue
            
    if img_data:
        try:
            # Open with PIL and convert to WebP
            img = Image.open(io.BytesIO(img_data))
            
            # Convert RGBA / P to RGB if needed
            if img.mode in ('RGBA', 'LA'):
                background = Image.new('RGB', img.size, (0, 0, 0))
                background.paste(img, mask=img.split()[-1])
                img = background
            elif img.mode != 'RGB':
                img = img.convert('RGB')
                
            # Resize if max dimension > 1800
            max_dim = max(img.width, img.height)
            if max_dim > 1800:
                scale = 1800.0 / max_dim
                new_w = int(img.width * scale)
                new_h = int(img.height * scale)
                img = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
                
            # Save WebP with 85 quality
            img.save(out_path, 'WEBP', quality=85, method=4)
            size_kb = os.path.getsize(out_path) / 1024
            print(f"  [OK] Saved WebP! Size: {size_kb:.1f} KB ({img.width}x{img.height})")
            
            downloaded_items.append({
                'id': f"portrait-{idx:02d}",
                'src': web_path,
                'alt': f"Portrait Photography #{idx:02d} - The SR Pictures",
                'caption': f"Portrait Frame #{idx:02d}"
            })
        except Exception as e:
            print(f"  [ERROR] Processing image {raw_name}: {e}")
    else:
        print(f"  [FAILED] Could not download {raw_name} ({fid})")
        
    time.sleep(0.1)

print(f"\nDone! Successfully processed {len(downloaded_items)} of {len(files)} portraits.")

with open('public/assets/categories/portraits/portraits_images.json', 'w', encoding='utf-8') as out_json:
    json.dump(downloaded_items, out_json, indent=2)

print("Saved image metadata to public/assets/categories/portraits/portraits_images.json")

