import { create } from "zustand";

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

interface TrackStore {
  tracks: Track[];
  trackIndex: number;
  addTrack: (track: Track) => void;
  addTracks: (tracks: Track[]) => void;
  setTracks: (tracks: Track[]) => void;
  resetTracks: () => void;
  setTrackIndex: (index: number) => void;
  nextTrack: () => void;
  prevTrack: () => void;
}

const useTrackStore = create<TrackStore>((set) => ({
  tracks: defaultTrack,
  trackIndex: 0,

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
}));

export default useTrackStore;
