import { FC, useEffect, useMemo, useRef } from "react";

import {
  nextTrack,
  prevTrack,
  setIsPlaying,
  setTimer,
  useAudioStore,
} from "@/stores/useAudioStore";
import { songApi } from "@/service";

import LeftControl from "./LeftControl";
import RightControl from "./RightControl";
import CenterBar from "./CenterBar";

const AudioPlayer: FC = ({}) => {
  // Store
  const timer = useAudioStore((state) => state.timer);
  const volume = useAudioStore((state) => state.volume);
  const isPlaying = useAudioStore((state) => state.isPlaying);
  const tracks = useAudioStore((state) => state.tracks);
  const trackIndex = useAudioStore((state) => state.trackIndex);

  const { song, artist, album } = tracks[trackIndex];

  // Refs
  const audioRef = useRef(new Audio());
  const intervalRef = useRef<NodeJS.Timeout | number>(0);

  const { duration } = audioRef.current;

  // 控制声音
  audioRef.current.volume = useMemo(() => volume / 100, [volume]);

  // 计时器
  const startTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        toNextTrack();
      } else {
        setTimer(audioRef.current.currentTime);
      }
    }, 500);
  };

  const onScrub = (value: any) => {
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTimer(audioRef.current.currentTime);
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
    setIsPlaying(true);
  };

  const toNextTrack = () => {
    console.log("next song");
    nextTrack();
    setIsPlaying(true);
  };

  const toggleAudio = () => {
    console.log("toggle audio");
    setIsPlaying(!isPlaying);
    setTimer(audioRef.current.currentTime);
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
    let isUnmounted = false;
    if (isUnmounted) return;

    audioRef.current.pause();

    songApi.getSongUrl(song.id).then((res) => {
      audioRef.current = new Audio(res.data[0].url);

      setTimer(audioRef.current.currentTime);

      if (isPlaying) {
        audioRef.current.play().then(() => {
          startTimer();
        });
      }
    });

    return () => {
      isUnmounted = true;
    };
  }, [trackIndex, tracks[trackIndex].song.id]);

  // 卸载数据
  useEffect(() => {
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="fixed bottom-0 z-50 flex justify-center items-center w-screen text-white bg-black/80">
      <div className="flex justify-start w-content gap-6 text-sm py-1">
        <LeftControl
          handlePrevTrack={toPrevTrack}
          handleNextTrack={toNextTrack}
          toggleAudio={toggleAudio}
          isPlaying={isPlaying}
        />

        <CenterBar
          duration={duration}
          trackProgress={timer}
          onScrub={onScrub}
          onScrubEnd={onScrubEnd}
          song={song}
          album={album}
          artist={artist}
        />

        <RightControl />
      </div>
    </div>
  );
};

export default AudioPlayer;
