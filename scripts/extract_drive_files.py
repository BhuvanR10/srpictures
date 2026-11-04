import re
import json

with open('drive_folder.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract window['_DRIVE_ivd'] = '...';
match = re.search(r"window\['_DRIVE_ivd'\]\s*=\s*'([^']+)'", content)
if not match:
    print("Could not find window['_DRIVE_ivd']")
    exit(1)

raw_val = match.group(1)
# Decode js escapes like \x5b, \x22, etc.
decoded = raw_val.encode('utf-8').decode('unicode_escape')

data = json.loads(decoded)
print("Type of data:", type(data))
print("Len of data:", len(data))

# Format of items in _DRIVE_ivd:
# [ [id, [folder_id], filename, mime_type, ...], ... ]
items = []
def find_items(node):
    if isinstance(node, list):
        if len(node) >= 4 and isinstance(node[0], str) and isinstance(node[2], str) and isinstance(node[3], str) and 'image/' in node[3]:
            items.append({
                'id': node[0],
                'name': node[2],
                'mime': node[3]
            })
        for child in node:
            find_items(child)

find_items(data)

print(f"Extracted {len(items)} images:")
for it in items:
    print(f"ID: {it['id']} | Name: {it['name']}")

with open('car_delivery_drive_files.json', 'w') as f:
    json.dump(items, f, indent=2)

