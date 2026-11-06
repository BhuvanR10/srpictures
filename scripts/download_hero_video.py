import urllib.request
import urllib.parse
import http.cookiejar
import re
import os

FILE_ID = "1lGi-s_sRfPKrnHmFZ73ggW9KJmINkBrA"
OUTPUT_FILE = "public/assets/hero-raw-video.mp4"

def download_drive_video():
    cj = http.cookiejar.CookieJar()
    opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cj))
    opener.addheaders = [
        ('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')
    ]

    print("Fetching initial page...")
    init_url = f"https://drive.google.com/uc?export=download&id={FILE_ID}"
    with opener.open(init_url) as resp:
        html = resp.read().decode('utf-8', errors='ignore')

    form_match = re.search(r'<form id="download-form" action="([^"]+)" method="get">(.*?)</form>', html, re.DOTALL)
    if not form_match:
        # Check alternative action
        form_match = re.search(r'<form action="([^"]+)" method="get">(.*?)</form>', html, re.DOTALL)
    
    if not form_match:
        print("Could not find download form in response!")
        return False

    action = form_match.group(1)
    form_content = form_match.group(2)

    params = {}
    for inp in re.finditer(r'<input\s+type="hidden"\s+name="([^"]+)"\s+value="([^"]+)"', form_content):
        params[inp.group(1)] = inp.group(2)

    query_str = urllib.parse.urlencode(params)
    download_url = f"{action}?{query_str}"
    print(f"Connecting to download URL: {download_url}")

    with opener.open(download_url) as stream:
        content_type = stream.headers.get('Content-Type')
        content_length = stream.headers.get('Content-Length')
        print(f"Stream started: Type={content_type}, Size={int(content_length)/(1024*1024):.2f} MB" if content_length else f"Type={content_type}")

        total_bytes = 0
        with open(OUTPUT_FILE, 'wb') as f:
            while True:
                chunk = stream.read(1024 * 1024)
                if not chunk:
                    break
                f.write(chunk)
                total_bytes += len(chunk)
                if content_length:
                    pct = (total_bytes / int(content_length)) * 100
                    print(f"Downloaded {total_bytes/(1024*1024):.1f} MB / {int(content_length)/(1024*1024):.1f} MB ({pct:.1f}%)", end='\r')
                else:
                    print(f"Downloaded {total_bytes/(1024*1024):.1f} MB...", end='\r')

    print(f"\nSuccessfully downloaded video to {OUTPUT_FILE}! Total: {total_bytes/(1024*1024):.2f} MB")
    return True

if __name__ == "__main__":
    download_drive_video()
