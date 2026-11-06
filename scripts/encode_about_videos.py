import cv2
import subprocess
import os

FFMPEG_PATH = r"C:\Users\gagan\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg.Essentials_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-9.0.1-essentials_build\bin\ffmpeg.exe"

VIDEOS = [
    {
        "raw": "raw_about_video_1.mp4",
        "mp4_out": "public/assets/about/about-reel-01.mp4",
        "poster_out": "public/assets/about/about-reel-01-poster.jpg",
        "name": "About Video 1",
    },
    {
        "raw": "raw_about_video_2.mp4",
        "mp4_out": "public/assets/about/about-reel-02.mp4",
        "poster_out": "public/assets/about/about-reel-02-poster.jpg",
        "name": "About Video 2",
    }
]

def extract_poster(raw_path, poster_path, label):
    print(f"[{label}] Extracting poster at 1.0s with OpenCV...")
    cap = cv2.VideoCapture(raw_path)
    fps = cap.get(cv2.CAP_PROP_FPS) or 30.0
    cap.set(cv2.CAP_PROP_POS_FRAMES, int(fps * 1.0))
    ret, frame = cap.read()
    cap.release()

    if not ret or frame is None:
        print(f"[{label}] Error reading frame!")
        return False

    # Downscale to 720x1280 vertical with cv2.INTER_AREA (sharpness without aliasing)
    target_w, target_h = 720, 1280
    resized = cv2.resize(frame, (target_w, target_h), interpolation=cv2.INTER_AREA)

    # Save JPEG with 85% quality factor
    cv2.imwrite(poster_path, resized, [cv2.IMWRITE_JPEG_QUALITY, 85])
    print(f"[{label}] Poster saved: {poster_path} ({os.path.getsize(poster_path)/1024:.1f} KB)")
    return True

def encode_video(raw_path, mp4_out, label):
    print(f"[{label}] Encoding video to 720x1280 H.264 (CRF 24, faststart)...")
    cmd = [
        FFMPEG_PATH,
        "-i", raw_path,
        "-vf", "scale=720:1280",
        "-c:v", "libx264",
        "-crf", "24",
        "-preset", "fast",
        "-c:a", "aac",
        "-b:a", "128k",
        "-movflags", "+faststart",
        "-y",
        mp4_out
    ]
    subprocess.run(cmd, check=True)
    size_mb = os.path.getsize(mp4_out) / (1024 * 1024)
    print(f"[{label}] Encoded video saved: {mp4_out} ({size_mb:.2f} MB)")

if __name__ == "__main__":
    os.makedirs("public/assets/about", exist_ok=True)
    for v in VIDEOS:
        extract_poster(v["raw"], v["poster_out"], v["name"])
        encode_video(v["raw"], v["mp4_out"], v["name"])
    print("\nAll videos and posters successfully processed!")

