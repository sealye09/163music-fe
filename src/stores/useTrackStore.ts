import { Track } from "@/types";
import { create } from "zustand";

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
  addTrack: (track: Track) => set((state) => ({ tracks: [...state.tracks, track] })),
  addTracks: (tracks: Track[]) => set((state) => ({ tracks: [...state.tracks, ...tracks] })),
  resetTracks: () => set({ tracks: defaultTrack, trackIndex: 0 }),
  setTracks: (tracks: Track[]) =>
    set((state) => ({
      tracks: [...tracks],
    })),
  setTrackIndex: (index: number) => set({ trackIndex: index }),
  nextTrack: () =>
    set((state) => {
      if (state.trackIndex === state.tracks.length - 1) {
        return { trackIndex: 0 };
      }
      return { trackIndex: state.trackIndex + 1 };
    }),
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
