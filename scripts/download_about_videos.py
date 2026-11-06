import urllib.request
import urllib.parse
import http.cookiejar
import re
import os
import sys

VIDEOS = [
    {"id": "1gRMYN1MkKlqQ3wOIBLKVA6v2MiQjKagS", "dest": "raw_about_video_1.mp4", "name": "About Video 1"},
    {"id": "10B6lbxEfqFtU9hpXkNtkgBcfZsHVHWXT", "dest": "raw_about_video_2.mp4", "name": "About Video 2"}
]

def download_file(file_id, destination, label):
    cj = http.cookiejar.CookieJar()
    opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cj))
    opener.addheaders = [
        ('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')
    ]

    print(f"\n[{label}] Requesting initial download page for ID: {file_id}...")
    init_url = f"https://drive.google.com/uc?export=download&id={file_id}"
    req = urllib.request.Request(init_url)
    with opener.open(req) as resp:
        content_type = resp.headers.get('Content-Type', '')
        if 'text/html' not in content_type:
            data = resp.read()
            with open(destination, 'wb') as f:
                f.write(data)
            print(f"Direct download succeeded! Size: {len(data)/(1024*1024):.2f} MB")
            return True
        html = resp.read().decode('utf-8', errors='ignore')

    form_match = re.search(r'<form id="download-form" action="([^"]+)" method="get">(.*?)</form>', html, re.DOTALL)
    if not form_match:
        form_match = re.search(r'<form action="([^"]+)" method="get">(.*?)</form>', html, re.DOTALL)

    if not form_match:
        # Check confirm in url
        m = re.search(r'confirm=([0-9A-Za-z_-]+)', html)
        token = m.group(1) if m else 't'
        download_url = f"https://drive.usercontent.google.com/download?id={file_id}&export=download&confirm={token}"
    else:
        action = form_match.group(1)
        form_content = form_match.group(2)
        params = {}
        for inp in re.finditer(r'<input\s+type="hidden"\s+name="([^"]+)"\s+value="([^"]+)"', form_content):
            params[inp.group(1)] = inp.group(2)
        download_url = f"{action}?{urllib.parse.urlencode(params)}"

    print(f"[{label}] Connecting to download stream: {download_url[:80]}...")
    with opener.open(download_url) as stream:
        content_length = stream.headers.get('Content-Length')
        print(f"[{label}] Starting transfer, total size: {int(content_length)/(1024*1024):.2f} MB" if content_length else f"[{label}] Starting transfer...")
        total_bytes = 0
        with open(destination, 'wb') as f:
            while True:
                chunk = stream.read(1024 * 1024)
                if not chunk:
                    break
                f.write(chunk)
                total_bytes += len(chunk)
                if content_length:
                    pct = (total_bytes / int(content_length)) * 100
                    print(f"[{label}] {total_bytes/(1024*1024):.1f} MB / {int(content_length)/(1024*1024):.1f} MB ({pct:.1f}%)", end='\r')
                else:
                    print(f"[{label}] {total_bytes/(1024*1024):.1f} MB...", end='\r')
        print(f"\n[{label}] Finished: {destination} ({total_bytes/(1024*1024):.2f} MB)")
        return True

if __name__ == "__main__":
    for item in VIDEOS:
        download_file(item["id"], item["dest"], item["name"])

