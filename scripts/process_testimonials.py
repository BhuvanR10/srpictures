import os
import subprocess
import json

src_dir = r"C:\Users\gagan\Downloads\TESTIMONIALS-20261106T180639Z-1-001\TESTIMONIALS"
videos_out = r"public\videos\testimonials"
posters_out = r"public\assets\testimonials"

os.makedirs(videos_out, exist_ok=True)
os.makedirs(posters_out, exist_ok=True)

files = [
    "Copy of REVIEW 7.mp4",
    "Copy of REVIEW 8.mp4",
    "Copy of REVIEW 9.mp4",
    "lv_0_20260218184902.mp4",
    "lv_0_20260303195549.mp4",
    "lv_0_20260303200848.mp4",
    "lv_0_20260303203539.mp4",
    "lv_0_20260717183159.mp4"
]

manifest = []

for idx, fname in enumerate(files, 1):
    src_path = os.path.join(src_dir, fname)
    if not os.path.exists(src_path):
        print(f"Skipping missing: {src_path}")
        continue
    
    out_video_name = f"testimonial-{idx}.mp4"
    out_poster_name = f"testimonial-{idx}-poster.jpg"
    
    out_video_path = os.path.join(videos_out, out_video_name)
    out_poster_path = os.path.join(posters_out, out_poster_name)
    
    # 1. Probe duration
    probe_cmd = [
        "ffprobe", "-v", "quiet", "-print_format", "json",
        "-show_format", src_path
    ]
    res = subprocess.run(probe_cmd, stdout=subprocess.PIPE, text=True)
    info = json.loads(res.stdout)
    duration = float(info.get("format", {}).get("duration", 0))
    minutes = int(duration // 60)
    seconds = int(duration % 60)
    dur_str = f"{minutes}:{seconds:02d}"
    
    print(f"[{idx}/8] Processing {fname} ({dur_str})...")
    
    # 2. Extract poster at 1.5s
    poster_time = min(1.5, max(0.5, duration / 2))
    poster_cmd = [
        "ffmpeg", "-y", "-ss", str(poster_time), "-i", src_path,
        "-vf", "scale=720:1280", "-vframes", "1", "-q:v", "3",
        out_poster_path
    ]
    subprocess.run(poster_cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    
    # 3. Compress video
    video_cmd = [
        "ffmpeg", "-y", "-i", src_path,
        "-vf", "scale=720:1280",
        "-c:v", "libx264", "-crf", "26", "-preset", "faster", "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "128k", "-ar", "44100",
        "-movflags", "+faststart",
        out_video_path
    ]
    subprocess.run(video_cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    
    size_mb = os.path.getsize(out_video_path) / (1024 * 1024)
    print(f"  -> Finished: {out_video_name} ({size_mb:.2f} MB)")
    
    manifest.append({
        "id": idx,
        "src_file": fname,
        "video": f"/videos/testimonials/{out_video_name}",
        "poster": f"/assets/testimonials/{out_poster_name}",
        "duration": dur_str,
        "seconds": round(duration, 1),
        "sizeMb": round(size_mb, 2)
    })

with open("scripts/testimonials_manifest.json", "w") as f:
    json.dump(manifest, f, indent=2)

print("\nProcessing complete! Manifest written to scripts/testimonials_manifest.json")

