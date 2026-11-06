import cv2
import os
import glob

def process_video_posters():
    drive_videos_dir = "public/assets/drive_videos"
    posters_dir = os.path.join(drive_videos_dir, "posters")
    os.makedirs(posters_dir, exist_ok=True)

    videos = glob.glob(os.path.join(drive_videos_dir, "*.mp4"))
    print(f"Found {len(videos)} drive reels to process with OpenCV...")

    for v_path in videos:
        base_name = os.path.splitext(os.path.basename(v_path))[0]
        cap = cv2.VideoCapture(v_path)
        if not cap.isOpened():
            print(f"Error opening {v_path}")
            continue

        fps = cap.get(cv2.CAP_PROP_FPS) or 30.0
        orig_w = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        orig_h = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
        total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

        # Seek to 1.0 second mark (frame at fps * 1.0)
        target_frame = min(int(fps * 1.0), max(0, total_frames - 1))
        cap.set(cv2.CAP_PROP_POS_FRAMES, target_frame)
        ret, frame = cap.read()

        if not ret or frame is None:
            # Fallback to frame 0
            cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
            ret, frame = cap.read()

        cap.release()

        if not ret or frame is None:
            print(f"Failed to read frame from {v_path}")
            continue

        # Target dimensions: 720p vertical (720x1280) for 9:16 reels, or 720p proportional
        if orig_h >= orig_w:
            target_w = 720
            target_h = int(720 * (orig_h / orig_w))
            # align to even
            if target_h % 2 != 0: target_h += 1
            if target_h > 1280: target_h = 1280
        else:
            target_w = 1280
            target_h = 720

        # Downscale using cv2.INTER_AREA (retains edge sharpness on typography & details without aliasing)
        resized = cv2.resize(frame, (target_w, target_h), interpolation=cv2.INTER_AREA)

        # Encode to JPEG with 85% quality factor
        jpg_out = os.path.join(posters_dir, f"{base_name}.jpg")
        cv2.imwrite(jpg_out, resized, [cv2.IMWRITE_JPEG_QUALITY, 85])
        jpg_size = os.path.getsize(jpg_out) / 1024

        # Also write WebP version for maximum web performance if supported
        webp_out = os.path.join(posters_dir, f"{base_name}.webp")
        cv2.imwrite(webp_out, resized, [cv2.IMWRITE_WEBP_QUALITY, 85])
        webp_size = os.path.getsize(webp_out) / 1024

        print(f"[OK] {base_name}: {orig_w}x{orig_h} -> {target_w}x{target_h} | JPG: {jpg_size:.1f} KB | WebP: {webp_size:.1f} KB")

    # Process Hero Video Poster
    hero_video = "public/assets/hero-bg-1080p.mp4"
    if os.path.exists(hero_video):
        cap = cv2.VideoCapture(hero_video)
        fps = cap.get(cv2.CAP_PROP_FPS) or 30.0
        cap.set(cv2.CAP_PROP_POS_FRAMES, int(fps * 1.0))
        ret, frame = cap.read()
        cap.release()
        if ret and frame is not None:
            # 1080p horizontal (1920x1080)
            h, w = frame.shape[:2]
            target_w, target_h = 1920, 1080
            resized = cv2.resize(frame, (target_w, target_h), interpolation=cv2.INTER_AREA)
            hero_jpg = "public/assets/hero-cinematic-poster.jpg"
            cv2.imwrite(hero_jpg, resized, [cv2.IMWRITE_JPEG_QUALITY, 85])
            print(f"[OK] Hero Poster: {target_w}x{target_h} | JPG: {os.path.getsize(hero_jpg)/1024:.1f} KB")

if __name__ == "__main__":
    process_video_posters()
