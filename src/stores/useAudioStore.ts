import { create } from "zustand";
import { persist } from "zustand/middleware";

import { Track } from "@/types";

const initTrack = [
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

const initStore = {
  tracks: initTrack,
  trackIndex: 0,
  volume: 60,
  isPlaying: false,
  timer: 0,
};

export const useAudioStore = create<typeof initStore>()(
  persist(() => initStore, {
    name: "audio-storage",
    partialize: (state) => {
      return {
        tracks: state.tracks,
        trackIndex: state.trackIndex,
        volume: state.volume,
      };
    },
  })
);

// 获取当前歌曲下标
export const getTrackIndex = () => useAudioStore.getState().trackIndex;

// 获取当前歌曲
export const getCurrentTrack = () => useAudioStore.getState().tracks[getTrackIndex()];

export const getTracks = () => useAudioStore.getState().tracks;

// 设置定时器
export const setTimer = (timer: number) => useAudioStore.setState({ timer });

// 设置音量
export const setVolume = (volume: number) => useAudioStore.setState({ volume });

// 设置播放状态
export const setIsPlaying = (isPlaying: boolean) => useAudioStore.setState({ isPlaying });

// 添加歌曲（单个）
export const addTrack = (track: Track) =>
  useAudioStore.setState((state) => ({ tracks: [...state.tracks, track] }));

// 重置歌曲
export const resetTracks = () => useAudioStore.setState({ tracks: initTrack, trackIndex: 0 });

// 设置列表
export const setTracks = (tracks: Track[]) =>
  useAudioStore.setState(() => ({
    tracks: [...tracks],
  }));

// 设置当前歌曲索引
export const setTrackIndex = (index: number) => useAudioStore.setState({ trackIndex: index });

// 下一首
export const nextTrack = () =>
  getTrackIndex() === getTracks().length - 1
    ? setTrackIndex(0)
    : setTrackIndex(getTrackIndex() + 1);

// 上一首
export const prevTrack = () =>
  getTrackIndex() === 0
    ? setTrackIndex(getTracks().length - 1)
    : setTrackIndex(getTrackIndex() - 1);
