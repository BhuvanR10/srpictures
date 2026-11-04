import urllib.request
import json
import os

with open('car_delivery_drive_files.json', 'r') as f:
    files = json.load(f)

test_file = files[0] # 17CYLe_Kiv8SkyyLPp7mGZ0IuuNTnhoUD
fid = test_file['id']
name = test_file['name']

urls_to_test = [
    f"https://lh3.googleusercontent.com/d/{fid}=s1200",
    f"https://drive.google.com/uc?export=download&id={fid}",
    f"https://drive.usercontent.google.com/download?id={fid}&export=download"
]

for u in urls_to_test:
    try:
        req = urllib.request.Request(u, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = resp.read()
            print(f"URL: {u[:45]}... | Status: {resp.status} | Size: {len(data)} bytes")
            if len(data) > 1000:
                with open('test_drive_download.jpg', 'wb') as out:
                    out.write(data)
                print("Successfully saved test_drive_download.jpg!")
                break
    except Exception as e:
        print(f"URL {u[:45]} failed: {e}")

