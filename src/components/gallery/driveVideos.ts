import type { GridCardData } from './GridCard';

// 8 Master Downloaded Google Drive Reels from https://drive.google.com/drive/folders/1hYNyWCCkXjLcJmaMT8-mHCOU9c68-jaI
const V_BABY_LOUKYA = '/assets/drive_videos/Baby_Loukya_Reel.mp4';
const V_NB_REEL = '/assets/drive_videos/NB_Reel.mp4';
const V_SWW = '/assets/drive_videos/SWW.mp4';
const V_REEL_1 = '/assets/drive_videos/Reel_1.mp4';
const V_BARAAT = '/assets/drive_videos/Baraat_151155.mp4';
const V_HALDI = '/assets/drive_videos/Haldi_151327.mp4';
const V_REEL_3 = '/assets/drive_videos/Reel_3.mp4';
const V_REEL_4 = '/assets/drive_videos/Reel_4.mp4';

// Lightweight WebP Posters for instant zero-lag loading
const VIDEO_POSTER_MAP: Record<string, string> = {
  [V_BABY_LOUKYA]: '/assets/drive_videos/posters/Baby_Loukya_Reel.webp',
  [V_NB_REEL]: '/assets/drive_videos/posters/NB_Reel.webp',
  [V_SWW]: '/assets/drive_videos/posters/SWW.webp',
  [V_REEL_1]: '/assets/drive_videos/posters/Reel_1.webp',
  [V_BARAAT]: '/assets/drive_videos/posters/Baraat_151155.webp',
  [V_HALDI]: '/assets/drive_videos/posters/Haldi_151327.webp',
  [V_REEL_3]: '/assets/drive_videos/posters/Reel_3.webp',
  [V_REEL_4]: '/assets/drive_videos/posters/Reel_4.webp',
};

const RAW_DRIVE_VIDEOS: Omit<GridCardData, 'poster'>[] = [
  {
    id: 'drv-01',
    type: 'video',
    src: V_BABY_LOUKYA,
    title: 'Baby Loukya Reel // The SR Pictures',
    category: 'Baby & Family Cine',
    specs: 'Original Drive Master • 4K DCI • 24 FPS',
    driveId: '1u30IT6awaBcX92_R22TTQaZukAEINWah',
  },
  {
    id: 'drv-02',
    type: 'video',
    src: V_REEL_1,
    title: 'Reel 1 // High Fashion Monolith',
    category: 'Fashion & Nightlife',
    specs: 'Original Drive Master • 85mm f/1.4',
    driveId: '1ZfvEACBN_b_3hthKincATCb3vMtStYlB',
  },
  {
    id: 'drv-03',
    type: 'video',
    src: V_SWW,
    title: 'SWW // Bengaluru Twilight Glow',
    category: 'Cinematic Films',
    specs: 'Original Drive Master • 50mm f/1.2',
    driveId: '1QhF6AKwvbGAI1Aln8qX4iQAKAWi0HokB',
  },
  {
    id: 'drv-04',
    type: 'video',
    src: V_BARAAT,
    title: 'Baraat Rhythm // Grand Arrival Reel',
    category: 'Celebration Reels',
    specs: 'Original Drive Master • 60 FPS Slow-Mo',
    driveId: '18nhsGqC240SM9IRaGRk06kbg2cmczcxn',
  },
  {
    id: 'drv-05',
    type: 'video',
    src: V_NB_REEL,
    title: 'NB Reel // Sangeet Red Dance Flare',
    category: 'Celebration Films',
    specs: 'Original Drive Master • 35mm T1.5',
    driveId: '1htIPKT12WW52hWEij5l04evgbLKx838U',
  },
  {
    id: 'drv-06',
    type: 'video',
    src: V_HALDI,
    title: 'Haldi Moments // Bridal Adornment Details',
    category: 'Ceremony Cine',
    specs: 'Original Drive Master • 85mm f/1.4',
    driveId: '1svdDzh9YETh2GCiGUew8TWKdcEJrvM61',
  },
  {
    id: 'drv-07',
    type: 'video',
    src: V_REEL_3,
    title: 'Reel 3 // Low Key Ambient Light',
    category: 'Cinematography',
    specs: 'Original Drive Master • 50mm f/1.4',
    driveId: '1TZGk6QuVQ1eQYq4PikfuvM9wcupbPp2J',
  },
  {
    id: 'drv-08',
    type: 'video',
    src: V_REEL_4,
    title: 'Reel 4 // Shadows of the City — Street Visuals',
    category: 'Street Cine',
    specs: 'Original Drive Master • 4K Ultra HD',
    driveId: '1P4d_hL7syXBx4x7QRM-qKwOEieICFRHm',
  },
];

export const ALL_DRIVE_VIDEOS: GridCardData[] = RAW_DRIVE_VIDEOS.map((item) => ({
  ...item,
  poster: VIDEO_POSTER_MAP[item.src],
}));
