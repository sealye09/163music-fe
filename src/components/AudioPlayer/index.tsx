import { FC, useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  BsLink45Deg,
  BsList,
  BsPause,
  BsPlay,
  BsSkipEnd,
  BsSkipStart,
  BsVolumeDown,
  BsVolumeMute,
} from "react-icons/bs";
import { TracksContext } from "../../pages/Layout";
import { getSongUrl } from "../../service";

import "./index.css";

interface Props {}

const AudioPlayer: FC<Props> = ({}) => {
  const { tracks, setTracks, trackIndex, setTrackIndex } = useContext<any>(TracksContext);
  const { song, artist, album } = tracks[trackIndex];

  // State
  const [trackProgress, setTrackProgress] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(80);
  const [isShowVolumeCtr, setIsShowVolumeCtr] = useState<boolean>(false);
  const [isShowPlaylist, setIsShowPlaylist] = useState<boolean>(false);

  // Refs
  const audioRef = useRef(new Audio());
  const intervalRef = useRef(0);
  const isReady = useRef(false);

  const { duration } = audioRef.current;

  const currentPercentage = duration ? `${(trackProgress / duration) * 100}%` : "0%";

  const trackStyling = `-webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #C60C0C), color-stop(${currentPercentage}, rgba(19,19,19,0.85)))`;

  const volumeStyling = `-webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${
    volume / 100
  }, #C60C0C), color-stop(${volume / 100}, rgba(19,19,19,0.85)))`;

  // 转换成 mm:ss 格式
  const toMinutes = (seconds: any) => {
    let m: any = 0;
    while (seconds >= 60) {
      seconds -= 60;
      m += 1;
    }
    let s = seconds.toFixed(0);
    m = m >= 10 ? m : "0" + m;
    s = s >= 10 ? s : "0" + s;
    return m + ":" + s;
  };

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
    if (e.target.value <= 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
      setVolume(e.target.value);
    }
  };

  const playTrack = (e: any) => {
    console.log("dou");

    const node = e.target.parentNode;
    const idx = node.querySelector(".idx").textContent;
    setTrackIndex(idx - 1);
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

  // 控制静音
  useEffect(() => {
    if (isMuted) {
      audioRef.current.muted = true;
    } else {
      audioRef.current.muted = false;
    }
  }, [isMuted]);

  // 控制声音
  useEffect(() => {
    audioRef.current.volume = volume / 100;
  }, [volume]);

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
    <div className="audio-player fixed bottom-0 flex justify-center items-center">
      <div className="m-playbar flex justify-start text-sm py-1">
        <div className="btns flex pr-6 min-w-fit w-2/12">
          <button
            className="prev mx-1"
            title="上一首(ctrl+←)"
            data-action="prev"
            onClick={toPrevTrack}
          >
            <BsSkipStart size={28} />
          </button>
          <button
            className="play mx-1"
            title="播放/暂停(p)"
            data-action="play"
            onClick={toggleAudio}
          >
            {isPlaying ? <BsPause size={28} /> : <BsPlay size={28} />}
          </button>
          <button
            className="next mx-1"
            title="下一首(ctrl+→)"
            data-action="next"
            onClick={toNextTrack}
          >
            <BsSkipEnd size={28} />
          </button>
        </div>

        <div className="w-8/12 flex">
          <div className="flex justify-start pr-6">
            <Link
              to={`/song/${song.id}`}
              className="mask"
            >
              <img
                className="w-10 h-10"
                src={album.picUrl}
              ></img>
            </Link>
          </div>
          <div className="w-min-fit w-9/12">
            <div className="play-info text-xs center-play flex">
              <Link
                to={`/song/${song.id}`}
                className="song-title pr-3"
                title={song.name}
              >
                {song.name}
              </Link>
              <Link
                className="song-artist pr-3"
                to={`/artist/${artist.id}`}
                title={artist.name}
              >
                {artist.name}
              </Link>
              <Link
                to={`/album/${album.id}`}
                className="src-album"
                title={album.name}
              >
                <BsLink45Deg size={14} />
              </Link>
            </div>
            <span className="j-flag time flex justify-start items-center">
              <input
                className="progress-ctr min-w-full"
                style={{ background: trackStyling }}
                type="range"
                value={trackProgress}
                step="1"
                min="0"
                max={duration ? duration : `${duration}`}
                onChange={(e) => onScrub(e.target.value)}
                onMouseUp={onScrubEnd}
                onKeyUp={onScrubEnd}
              ></input>
              <div className="duration-text pl-4 text-xs">
                {toMinutes(trackProgress)}/
                <em>{isNaN(duration) ? "00:00" : toMinutes(duration)}</em>
              </div>
            </span>
          </div>
        </div>

        <div className="btns flex justify-end pl-6 min-w-fit">
          <button
            className="audio-ctr mx-1"
            data-action="audio-ctr"
            onClick={() => {
              setIsShowPlaylist(false);
              setIsShowVolumeCtr(!isShowVolumeCtr);
            }}
          >
            {isMuted ? <BsVolumeMute size={28} /> : <BsVolumeDown size={28} />}
          </button>

          <button
            className="playlist mx-1"
            title="播放列表"
            onClick={() => {
              setIsShowVolumeCtr(false);
              setIsShowPlaylist(!isShowPlaylist);
            }}
          >
            <BsList size={28} />
          </button>
        </div>
      </div>

      {/* 音量控制条 */}
      <div
        tabIndex={0}
        style={{
          display: `${isShowVolumeCtr ? "" : "none"}`,
        }}
        className="volume-ctr absolute bottom-16 h-8 min-w-fit bg-black px-3"
      >
        <input
          type="range"
          style={{
            background: volumeStyling,
          }}
          onChange={(e) => changeVolume(e)}
          value={isMuted ? 0 : volume}
        />
      </div>

      {/* 播放列表 */}
      <div
        tabIndex={0}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.9)",
          display: `${isShowPlaylist ? "" : "none"}`,
        }}
        className="w-1/2 h-80 absolute bottom-12 rounded-t"
      >
        <div className="h-full w-full">
          <table
            className="w-full h-80 block overflow-auto"
            style={{
              color: "#E2E2E2",
              tableLayout: "fixed",
            }}
          >
            <thead className="w-full">
              <tr className="w-full h-8 sticky top-0 bg-black">
                <th
                  align="left"
                  className="idx"
                ></th>
                <th align="left">播放列表</th>
                <th align="left"></th>
                <th align="left">
                  <a
                    onClick={() => {
                      setTracks([
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
                      ]);
                      setTrackIndex(0);
                      audioRef.current.pause();
                    }}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    清除全部
                  </a>
                </th>
              </tr>
            </thead>
            <tbody>
              {tracks ? (
                tracks.map((item: any, idx: number) => (
                  <tr
                    key={item.song.id}
                    className="w-full audio-playlist"
                    onDoubleClick={playTrack}
                  >
                    <td
                      align="center"
                      className={`idx idx-${idx + 1} px-4`}
                    >
                      {idx + 1}
                    </td>
                    <td align="left">
                      <Link
                        className="max-w-fit mr-12 text"
                        title={item.song.name}
                        to={`/song/${item.song.id}`}
                      >
                        {item.song.name}
                      </Link>
                    </td>
                    <td align="left">
                      <Link
                        className="max-w-fit mr-12"
                        title={item.artist.name}
                        to={`/artist/${item.artist.id}`}
                      >
                        {item.artist.name}
                      </Link>
                    </td>
                    <td align="left">
                      <Link
                        className="max-w-fit mr-4"
                        title={item.album.name}
                        to={`/album/${item.album.id}`}
                      >
                        <BsLink45Deg size={14} />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <></>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
