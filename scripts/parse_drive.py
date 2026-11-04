import re
import json

with open('drive_folder.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Let's search for image names or patterns like .jpg, .png, .jpeg
jpg_matches = re.findall(r'[\w\-\.]+\.(?:jpg|jpeg|png|webp)', content, re.I)
print('Unique image filenames found:', set(jpg_matches))

# Look for Google Drive file IDs (typically 33 chars like 1LHpzPrBQhoGsiBM4D7cdLK1m51QWPvdY)
# Or search for data arrays
data_matches = re.findall(r'\[\"([a-zA-Z0-9_-]{33})\"', content)
print('Candidate 33-char IDs found:', len(set(data_matches)), list(set(data_matches))[:10])

# Search for the folder ID in the page
print('Folder ID mentions:', content.count('1LHpzPrBQhoGsiBM4D7cdLK1m51QWPvdY'))

# Find script tags with data
scripts = re.findall(r'<script[^>]*>(.*?)</script>', content, re.DOTALL)
print('Number of script tags:', len(scripts))
for i, s in enumerate(scripts):
    if '1LHpzPrBQhoGsiBM4D7cdLK1m51QWPvdY' in s or '.jpg' in s.lower():
        print(f"Script {i} contains keywords, length: {len(s)}")
        # Check for JSON or arrays
        lines = s.split('\n')
        for l in lines:
            if '.jpg' in l.lower() or '1LHpz' in l:
                print('  Line snippet:', l[:200])

