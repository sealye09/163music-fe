import { create } from "zustand";
import { persist } from "zustand/middleware";

import { Track } from "@/types";

const defaultTrack = [
  {
    song: {
      id: 19537524,
      name: "I'll Be Your Mirror",
    },
    artist: {
      id: 101996,
      name: "The Velvet Underground",
    },
    album: {
      id: 1798937,
      name: "The Velvet Underground & Nico",
      picUrl:
        "https://p1.music.126.net/5CuLry1JQsbXoBvBgL9BmQ==/2535473814614187.jpg?param=130y130",
    },
  },
];

interface AudioStore {
  tracks: Track[];
  trackIndex: number;
  volume: number;
  isPlaying: boolean;
  setVolume: (volume: number) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  addTrack: (track: Track) => void;
  addTracks: (tracks: Track[]) => void;
  setTracks: (tracks: Track[]) => void;
  resetTracks: () => void;
  setTrackIndex: (index: number) => void;
  nextTrack: () => void;
  prevTrack: () => void;
}

const useAudioStore = create<AudioStore>()(
  persist(
    (set) => ({
      tracks: defaultTrack,
      trackIndex: 0,
      volume: 60,
      isPlaying: false,

      // 设置音量
      setVolume: (volume: number) => set({ volume }),

      // 设置播放状态
      setIsPlaying: (isPlaying: boolean) => set({ isPlaying }),

      // 添加歌曲（单个）
      addTrack: (track: Track) => set((state) => ({ tracks: [...state.tracks, track] })),

      // 添加歌曲（多个）
      addTracks: (tracks: Track[]) => set((state) => ({ tracks: [...state.tracks, ...tracks] })),

      // 重置歌曲
      resetTracks: () => set({ tracks: defaultTrack, trackIndex: 0 }),

      // 设置列表
      setTracks: (tracks: Track[]) =>
        set(() => ({
          tracks: [...tracks],
        })),

      // 设置当前歌曲索引
      setTrackIndex: (index: number) => set({ trackIndex: index }),

      // 下一首
      nextTrack: () =>
        set((state) => {
          if (state.trackIndex === state.tracks.length - 1) {
            return { trackIndex: 0 };
          }
          return { trackIndex: state.trackIndex + 1 };
        }),

      // 上一首
      prevTrack: () =>
        set((state) => {
          {
            if (state.trackIndex === 0) {
              return { trackIndex: state.tracks.length - 1 };
            }
            return { trackIndex: state.trackIndex - 1 };
          }
        }),
    }),
    {
      name: "audio-storage",
      partialize: (state) => {
        return {
          tracks: state.tracks,
          trackIndex: state.trackIndex,
          volume: state.volume,
        };
      },
    }
  )
);

export default useAudioStore;
