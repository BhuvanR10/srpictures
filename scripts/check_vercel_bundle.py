import urllib.request
import re

url = "https://photoportfolio-lake.vercel.app/"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req).read().decode('utf-8')
js_files = re.findall(r'src="(/assets/[^"]+\.js)"', html)
print("JS in html:", js_files)

for js_path in js_files:
    js_url = "https://photoportfolio-lake.vercel.app" + js_path
    js_content = urllib.request.urlopen(urllib.request.Request(js_url, headers={'User-Agent': 'Mozilla/5.0'})).read().decode('utf-8')
    chunks = re.findall(r'assets/[a-zA-Z0-9_\-]+\.js', js_content)
    for c in set(chunks):
        c_url = f"https://photoportfolio-lake.vercel.app/{c}"
        try:
            content = urllib.request.urlopen(urllib.request.Request(c_url, headers={'User-Agent': 'Mozilla/5.0'})).read().decode('utf-8')
            if "hero-bg" in content:
                print(f"Found hero-bg in chunk: {c}")
                # print snippet
                idx = content.find("hero-bg")
                print(content[max(0, idx-100):min(len(content), idx+200)])
        except Exception as e:
            pass

