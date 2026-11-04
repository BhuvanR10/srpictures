import urllib.request
import json
import os
import time

dest_dir = os.path.join('public', 'assets', 'car_delivery')
os.makedirs(dest_dir, exist_ok=True)

with open('car_delivery_drive_files.json', 'r') as f:
    files = json.load(f)

print(f"Total files to download: {len(files)}")

downloaded_items = []

for idx, item in enumerate(files, 1):
    fid = item['id']
    raw_name = item['name']
    
    # Normalize extension to .jpg
    ext = os.path.splitext(raw_name)[1].lower()
    if ext not in ['.jpg', '.jpeg', '.png', '.webp']:
        ext = '.jpg'
    
    clean_name = f"car-delivery-{idx:02d}{ext}"
    out_path = os.path.join(dest_dir, clean_name)
    web_path = f"/assets/car_delivery/{clean_name}"
    
    # Download URL using Google's image server (max width/height 1400px for web optimization)
    # This automatically optimizes the image payload while maintaining retina sharpness
    url = f"https://lh3.googleusercontent.com/d/{fid}=s1400"
    
    print(f"[{idx}/{len(files)}] Downloading {raw_name} -> {clean_name}...")
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = resp.read()
            if len(data) > 5000:
                with open(out_path, 'wb') as f_out:
                    f_out.write(data)
                file_size_kb = len(data) / 1024
                print(f"  OK! Size: {file_size_kb:.1f} KB")
                downloaded_items.append({
                    'id': f"car-del-{idx:02d}",
                    'src': web_path,
                    'alt': f"Car Delivery Moment {idx} - The SR Pictures",
                    'caption': f"Automotive Delivery Moment #{idx:02d}"
                })
            else:
                print(f"  Warning: downloaded size too small ({len(data)} bytes), trying direct uc link")
                alt_url = f"https://drive.google.com/uc?export=download&id={fid}"
                req2 = urllib.request.Request(alt_url, headers={'User-Agent': 'Mozilla/5.0'})
                with urllib.request.urlopen(req2, timeout=15) as resp2:
                    data2 = resp2.read()
                    with open(out_path, 'wb') as f_out:
                        f_out.write(data2)
                    print(f"  OK (alt)! Size: {len(data2)/1024:.1f} KB")
                    downloaded_items.append({
                        'id': f"car-del-{idx:02d}",
                        'src': web_path,
                        'alt': f"Car Delivery Moment {idx} - The SR Pictures",
                        'caption': f"Automotive Delivery Moment #{idx:02d}"
                    })
    except Exception as e:
        print(f"  Error downloading {fid}: {e}")
    
    # Small pause to be polite to CDN
    time.sleep(0.15)

print(f"\nDone! Successfully downloaded {len(downloaded_items)} of {len(files)} files.")

with open('public/assets/car_delivery/car_delivery_images.json', 'w') as out_json:
    json.dump(downloaded_items, out_json, indent=2)

print("Saved metadata to public/assets/car_delivery/car_delivery_images.json")

