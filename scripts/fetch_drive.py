import urllib.request
import re
import json

url = 'https://drive.google.com/drive/folders/1LHpzPrBQhoGsiBM4D7cdLK1m51QWPvdY'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})

try:
    with urllib.request.urlopen(req, timeout=15) as response:
        html = response.read().decode('utf-8', errors='ignore')
        with open('drive_folder.html', 'w', encoding='utf-8') as f:
            f.write(html)
        print('Saved drive_folder.html, size:', len(html))
        
        # Look for drive items in the initial data blob
        # Typical Google Drive SSR data contains items in window['_DRIVE_ivd'] or similar JSON arrays
        pattern = re.compile(r'\[\"([a-zA-Z0-9_-]{28,})\",\[\"(.*?)\"', re.DOTALL)
        found = pattern.findall(html)
        print('Found candidate pairs:', len(found))
        for fid, fname in found[:20]:
            print(f"ID: {fid} | Name: {fname}")
except Exception as e:
    print('Error:', e)

