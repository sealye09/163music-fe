import { FC, useContext, useEffect, useMemo, useRef, useState } from "react";
import { TracksContext } from "../../pages/Layout";
import LeftControl from "./LeftControl";
import RightControl from "./RightControl";
import CenterBar from "./CenterBar";
import VolumeControl from "./VolumeControl";
import Playlist from "./Playlist";

import { getSongUrl } from "../../service";

import styles from "./index.module.css";

interface Props {}

const AudioPlayer: FC<Props> = ({}) => {
  const { tracks, trackIndex, setTrackIndex } = useContext<any>(TracksContext);
  const { song, artist, album } = tracks[trackIndex];

  // State
  const [trackProgress, setTrackProgress] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(80);
  const [isShowVolumeCtr, setIsShowVolumeCtr] = useState<boolean>(false);
  const [isShowPlaylist, setIsShowPlaylist] = useState<boolean>(false);

  // Refs
  const audioRef = useRef(new Audio());
  const intervalRef = useRef(0);
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
    if (trackIndex - 1 < 0) {
      setTrackIndex(tracks.length - 1);
    } else {
      setTrackIndex(trackIndex - 1);
    }
  };

  const toNextTrack = () => {
    console.log("next song");
    if (trackIndex < tracks.length - 1) {
      setTrackIndex(trackIndex + 1);
    } else {
      setTrackIndex(0);
    }
  };

  const toggleAudio = () => {
    console.log("toggle audio");
    setTrackProgress(audioRef.current.currentTime);
    setIsPlaying(!isPlaying);
  };

  const changeVolume = (e: any) => {
    setVolume(e.target.value);
  };

  const handleShowPlaylist = () => {
    setIsShowVolumeCtr(false);
    setIsShowPlaylist(!isShowPlaylist);
  };

  const handleShowVolumeCtr = () => {
    setIsShowPlaylist(false);
    setIsShowVolumeCtr(!isShowVolumeCtr);
  };

  // 控制播放/暂停
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // 切换歌曲
  useEffect(() => {
    audioRef.current.pause();

    getSongUrl(song.id).then((res) => {
      audioRef.current = new Audio(res.data[0].url);

      setTrackProgress(audioRef.current.currentTime);

      if (isReady.current) {
        audioRef.current.play();
        audioRef.current.volume = volume / 100;
        audioRef.current.muted = isMuted;
        setIsPlaying(true);
        startTimer();
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
    <div className={`${styles.audio_player} fixed bottom-0 flex justify-center items-center`}>
      <div className={`${styles.m_playbar} flex justify-start gap-6 text-sm py-1`}>
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

        <RightControl
          isMuted={isMuted}
          handleShowVolumeCtr={handleShowVolumeCtr}
          handleShowPlaylist={handleShowPlaylist}
        />
      </div>

      {/* 音量控制条 */}
      <VolumeControl
        isMuted={isMuted}
        changeVolume={changeVolume}
        volume={volume}
        isShowVolumeCtr={isShowVolumeCtr}
      />

      {/* 播放列表 */}
      <Playlist
        isShowPlaylist={isShowPlaylist}
        audioRef={audioRef}
      />
    </div>
  );
};

export default AudioPlayer;
