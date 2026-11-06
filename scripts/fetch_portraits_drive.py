import urllib.request
import re
import json
import os

folder_id = '1j8kCGFn_tCs45loWrtML07TRccIukxU7'
url = f'https://drive.google.com/drive/folders/{folder_id}'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})

print(f"Fetching Google Drive folder: {folder_id}...")
try:
    with urllib.request.urlopen(req, timeout=20) as response:
        html = response.read().decode('utf-8', errors='ignore')
        with open('portraits_drive_folder.html', 'w', encoding='utf-8') as f:
            f.write(html)
        print(f"Saved portraits_drive_folder.html, size: {len(html)} bytes")
        
        # Try extracting window['_DRIVE_ivd']
        match = re.search(r"window\['_DRIVE_ivd'\]\s*=\s*'([^']+)'", html)
        items = []
        if match:
            raw_val = match.group(1)
            decoded = raw_val.encode('utf-8').decode('unicode_escape')
            data = json.loads(decoded)
            
            def find_items(node):
                if isinstance(node, list):
                    # Check for [id, [folder_id], filename, mime_type]
                    if len(node) >= 4 and isinstance(node[0], str) and isinstance(node[2], str) and isinstance(node[3], str) and ('image/' in node[3] or 'video/' in node[3] or any(node[2].lower().endswith(ext) for ext in ['.jpg', '.jpeg', '.png', '.webp', '.mp4'])):
                        items.append({
                            'id': node[0],
                            'name': node[2],
                            'mime': node[3]
                        })
                    for child in node:
                        find_items(child)
            find_items(data)
        
        if not items:
            # Fallback regex search for drive items
            # Format often has ["id", ["folder_id"], "name.jpg", ...]
            pattern = re.compile(r'\[\"([a-zA-Z0-9_-]{28,35})\",\[\"[^\"]*\"],\"([^\"]+\.(?:jpg|jpeg|png|webp|JPG|JPEG|PNG|WEBP))\"', re.DOTALL)
            matches = pattern.findall(html)
            seen = set()
            for fid, fname in matches:
                if fid not in seen:
                    seen.add(fid)
                    items.append({
                        'id': fid,
                        'name': fname,
                        'mime': 'image/jpeg'
                    })
        
        print(f"Found {len(items)} items in folder:")
        for idx, item in enumerate(items, 1):
            print(f"  {idx}. {item['name']} (ID: {item['id']})")
            
        with open('portraits_files.json', 'w', encoding='utf-8') as f_out:
            json.dump(items, f_out, indent=2)
        print("Saved items to portraits_files.json")

except Exception as e:
    print("Error:", e)

