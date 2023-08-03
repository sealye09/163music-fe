import { FC, createContext, useEffect, useMemo, useRef, useState } from "react";

import { songApi } from "@/service";
import useAudioStore from "@/stores/useAudioStore";

import LeftControl from "./LeftControl";
import RightControl from "./RightControl";
import CenterBar from "./CenterBar";

export interface AudioPlayerContextProps {
  isShowVolumeCtr: boolean;
  setIsShowVolumeCtr: (isShowVolumeCtr: boolean) => void;
  isShowPlaylist: boolean;
  setIsShowPlaylist: (isShowPlaylist: boolean) => void;
}

// create Context
export const AudioPlayerContext = createContext(null as unknown as AudioPlayerContextProps);

const AudioPlayer: FC = ({}) => {
  // Store
  const volume = useAudioStore((state) => state.volume);
  const setVolume = useAudioStore((state) => state.setVolume);
  const isPlaying = useAudioStore((state) => state.isPlaying);
  const setIsPlaying = useAudioStore((state) => state.setIsPlaying);
  const tracks = useAudioStore((state) => state.tracks);
  const trackIndex = useAudioStore((state) => state.trackIndex);
  const prevTrack = useAudioStore((state) => state.prevTrack);
  const nextTrack = useAudioStore((state) => state.nextTrack);

  const { song, artist, album } = tracks[trackIndex];

  // State
  const [trackProgress, setTrackProgress] = useState<number>(0);
  const [isShowVolumeCtr, setIsShowVolumeCtr] = useState<boolean>(false);
  const [isShowPlaylist, setIsShowPlaylist] = useState<boolean>(false);

  // Refs
  const audioRef = useRef(new Audio());
  const intervalRef = useRef<ReturnType<typeof setInterval> | number>(0);
  const isReady = useRef(false);

  const { duration } = audioRef.current;
  const isMuted = audioRef.current.volume <= 0;

  // 控制声音
  audioRef.current.volume = useMemo(() => volume / 100, [volume]);

  // 计时器
  const startTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        toNextTrack();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, 1000);
  };

  const onScrub = (value: any) => {
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  };

  const onScrubEnd = () => {
    if (!isPlaying) {
      setIsPlaying(true);
    }
    startTimer();
  };

  const toPrevTrack = () => {
    console.log("previous song");
    prevTrack();
  };

  const toNextTrack = () => {
    console.log("next song");
    nextTrack();
  };

  const toggleAudio = () => {
    console.log("toggle audio");
    setIsPlaying(!isPlaying);
    setTrackProgress(audioRef.current.currentTime);
  };

  // 控制播放/暂停
  useEffect(() => {
    if (isPlaying) {
      audioRef.current
        .play()
        .then(() => {
          startTimer();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // 切换歌曲
  useEffect(() => {
    audioRef.current.pause();

    songApi.getSongUrl(song.id).then((res) => {
      audioRef.current = new Audio(res.data[0].url);

      setTrackProgress(audioRef.current.currentTime);

      if (isReady.current) {
        audioRef.current
          .play()
          .then(() => {
            audioRef.current.volume = volume / 100;
            audioRef.current.muted = isMuted;
            setIsPlaying(true);
            startTimer();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        isReady.current = true;
      }
    });
  }, [trackIndex, tracks[trackIndex].song.id]);

  // 卸载数据
  useEffect(() => {
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <AudioPlayerContext.Provider
      value={
        {
          isShowVolumeCtr,
          setIsShowVolumeCtr,
          isShowPlaylist,
          setIsShowPlaylist,
        } as AudioPlayerContextProps
      }
    >
      <div className="fixed bottom-0 flex justify-center items-center w-screen text-white bg-black/80">
        <div className="flex justify-start w-[864px] gap-6 text-sm py-1">
          <LeftControl
            handlePrevTrack={toPrevTrack}
            handleNextTrack={toNextTrack}
            toggleAudio={toggleAudio}
            isPlaying={isPlaying}
          />

          <CenterBar
            duration={duration}
            trackProgress={trackProgress}
            onScrub={onScrub}
            onScrubEnd={onScrubEnd}
            song={song}
            album={album}
            artist={artist}
          />

          <RightControl />
        </div>
      </div>
    </AudioPlayerContext.Provider>
  );
};

export default AudioPlayer;
