import { FC, useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { TracksContext } from '../../pages/Layout';
import { getSongUrl } from '../../service';

import './index.css';

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

  const currentPercentage = duration ? `${(trackProgress / duration) * 100}%` : '0%';

  const trackStyling = `-webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #C60C0C), color-stop(${currentPercentage}, rgba(19,19,19,0.85)))`;

  const volumeStyling = `-webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${volume / 100}, #C60C0C), color-stop(${
    volume / 100
  }, rgba(19,19,19,0.85)))`;

  // 转换成 mm:ss 格式
  const toMinutes = (seconds: any) => {
    let m: any = 0;
    while (seconds >= 60) {
      seconds -= 60;
      m += 1;
    }
    let s = seconds.toFixed(0);
    m = m >= 10 ? m : '0' + m;
    s = s >= 10 ? s : '0' + s;
    return m + ':' + s;
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
    console.log('previous song');
    if (trackIndex - 1 < 0) {
      setTrackIndex(tracks.length - 1);
    } else {
      setTrackIndex(trackIndex - 1);
    }
  };

  const toNextTrack = () => {
    console.log('next song');
    if (trackIndex < tracks.length - 1) {
      setTrackIndex(trackIndex + 1);
    } else {
      setTrackIndex(0);
    }
  };

  const toggleAudio = () => {
    console.log('toggle audio');
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
    console.log('dou');

    const node = e.target.parentNode;
    const idx = node.querySelector('.idx').textContent;
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
    <div className='audio-player fixed bottom-0 flex justify-center items-center'>
      <div className='m-playbar flex justify-start text-sm py-1'>
        <div className='btns flex pr-6 min-w-fit w-2/12'>
          <button
            className='prev mx-1'
            title='上一首(ctrl+←)'
            data-action='prev'
            onClick={toPrevTrack}
          >
            <svg
              viewBox='0 0 1024 1024'
              version='1.1'
              xmlns='http://www.w3.org/2000/svg'
              p-id='13536'
              width='32'
              height='32'
            >
              <path
                d='M512 42.666667C252.793333 42.666667 42.666667 252.793333 42.666667 512s210.126667 469.333333 469.333333 469.333333 469.333333-210.126667 469.333333-469.333333S771.206667 42.666667 512 42.666667z m0 896c-235.64 0-426.666667-191.026667-426.666667-426.666667s191.026667-426.666667 426.666667-426.666667 426.666667 191.026667 426.666667 426.666667-191.026667 426.666667-426.666667 426.666667z m-74.666667-213.38a53.373333 53.373333 0 0 1-53.333333-53.333334V352.066667A53.333333 53.333333 0 0 1 467.373333 308L702 467.933333a53.333333 53.333333 0 0 1 0 88.133334L467.373333 716a53.286667 53.286667 0 0 1-30.04 9.286667z m0.08-383.933334a11.093333 11.093333 0 0 0-5.08 1.28 10.446667 10.446667 0 0 0-5.666666 9.433334v319.866666a10.666667 10.666667 0 0 0 16.666666 8.82l234.666667-159.94a10.666667 10.666667 0 0 0 0-17.626666l-234.666667-159.933334a10.313333 10.313333 0 0 0-5.906666-1.92z'
                fill='#ffffff'
                p-id='13537'
              ></path>
            </svg>
          </button>
          <button
            className='play mx-1'
            title='播放/暂停(p)'
            data-action='play'
            onClick={toggleAudio}
          >
            {isPlaying ? (
              <svg
                viewBox='0 0 1024 1024'
                version='1.1'
                xmlns='http://www.w3.org/2000/svg'
                p-id='13986'
                width='32'
                height='32'
              >
                <path
                  d='M512 42.666667C252.793333 42.666667 42.666667 252.793333 42.666667 512s210.126667 469.333333 469.333333 469.333333 469.333333-210.126667 469.333333-469.333333S771.206667 42.666667 512 42.666667z m0 896c-235.64 0-426.666667-191.026667-426.666667-426.666667s191.026667-426.666667 426.666667-426.666667 426.666667 191.026667 426.666667 426.666667-191.026667 426.666667-426.666667 426.666667z m106.666667-213.333334a21.333333 21.333333 0 0 1-21.333334-21.333333V320a21.333333 21.333333 0 0 1 42.666667 0v384a21.333333 21.333333 0 0 1-21.333333 21.333333z m-213.333334 0a21.333333 21.333333 0 0 1-21.333333-21.333333V320a21.333333 21.333333 0 0 1 42.666667 0v384a21.333333 21.333333 0 0 1-21.333334 21.333333z'
                  fill='#ffffff'
                  p-id='13987'
                ></path>
              </svg>
            ) : (
              <svg
                viewBox='0 0 1024 1024'
                version='1.1'
                xmlns='http://www.w3.org/2000/svg'
                p-id='13536'
                width='32'
                height='32'
              >
                <path
                  d='M512 42.666667C252.793333 42.666667 42.666667 252.793333 42.666667 512s210.126667 469.333333 469.333333 469.333333 469.333333-210.126667 469.333333-469.333333S771.206667 42.666667 512 42.666667z m0 896c-235.64 0-426.666667-191.026667-426.666667-426.666667s191.026667-426.666667 426.666667-426.666667 426.666667 191.026667 426.666667 426.666667-191.026667 426.666667-426.666667 426.666667z m-74.666667-213.38a53.373333 53.373333 0 0 1-53.333333-53.333334V352.066667A53.333333 53.333333 0 0 1 467.373333 308L702 467.933333a53.333333 53.333333 0 0 1 0 88.133334L467.373333 716a53.286667 53.286667 0 0 1-30.04 9.286667z m0.08-383.933334a11.093333 11.093333 0 0 0-5.08 1.28 10.446667 10.446667 0 0 0-5.666666 9.433334v319.866666a10.666667 10.666667 0 0 0 16.666666 8.82l234.666667-159.94a10.666667 10.666667 0 0 0 0-17.626666l-234.666667-159.933334a10.313333 10.313333 0 0 0-5.906666-1.92z'
                  fill='#ffffff'
                  p-id='13537'
                ></path>
              </svg>
            )}
          </button>
          <button
            className='next mx-1'
            title='下一首(ctrl+→)'
            data-action='next'
            onClick={toNextTrack}
          >
            <svg
              viewBox='0 0 1024 1024'
              version='1.1'
              xmlns='http://www.w3.org/2000/svg'
              p-id='14508'
              width='32'
              height='32'
            >
              <path
                d='M512 42.666667C252.793333 42.666667 42.666667 252.793333 42.666667 512s210.126667 469.333333 469.333333 469.333333 469.333333-210.126667 469.333333-469.333333S771.206667 42.666667 512 42.666667z m0 896c-235.64 0-426.666667-191.026667-426.666667-426.666667s191.026667-426.666667 426.666667-426.666667 426.666667 191.026667 426.666667 426.666667-191.026667 426.666667-426.666667 426.666667z m-32-213.38a53.373333 53.373333 0 0 1-53.333333-53.333334V352.066667A53.333333 53.333333 0 0 1 510.04 308L744.666667 467.933333a53.333333 53.333333 0 0 1 0 88.133334L510.04 716a53.286667 53.286667 0 0 1-30.04 9.286667z m0.08-383.933334a11.093333 11.093333 0 0 0-5.08 1.28 10.446667 10.446667 0 0 0-5.666667 9.433334v319.866666a10.666667 10.666667 0 0 0 16.666667 8.82l234.666667-159.94a10.666667 10.666667 0 0 0 0-17.626666l-234.666667-159.933334a10.313333 10.313333 0 0 0-5.906667-1.92zM362.666667 725.333333a21.333333 21.333333 0 0 1-21.333334-21.333333V320a21.333333 21.333333 0 0 1 42.666667 0v384a21.333333 21.333333 0 0 1-21.333333 21.333333z'
                fill='#ffffff'
                p-id='14509'
              ></path>
            </svg>
          </button>
        </div>

        <div className='w-8/12 flex'>
          <div className='flex justify-start pr-6'>
            <Link
              to={`/song/${song.id}`}
              className='mask'
            >
              <img
                className='w-10 h-10'
                src={album.picUrl}
              ></img>
            </Link>
          </div>
          <div className='w-min-fit w-9/12'>
            <div className='play-info text-xs center-play flex'>
              <Link
                to={`/song/${song.id}`}
                className='song-title pr-3'
                title={song.name}
              >
                {song.name}
              </Link>
              <Link
                className='song-artist pr-3'
                to={`/artist/${artist.id}`}
                title={artist.name}
              >
                {artist.name}
              </Link>
              <Link
                to={`/album/${album.id}`}
                className='src-album'
                title={album.name}
              >
                <svg
                  viewBox='0 0 1024 1024'
                  version='1.1'
                  xmlns='http://www.w3.org/2000/svg'
                  p-id='24379'
                  width='14'
                  height='14'
                >
                  <path
                    d='M300.813333 936.293333a213.586667 213.586667 0 0 1-80.326666-15.553333 212.34 212.34 0 0 1-117.226667-117.226667 215.186667 215.186667 0 0 1 0-160.666666 210.886667 210.886667 0 0 1 46.7-70.526667l135.766667-135.746667a210.986667 210.986667 0 0 1 70.526666-46.7 215.273333 215.273333 0 0 1 160.666667 0 210.986667 210.986667 0 0 1 70.526667 46.7 21.333333 21.333333 0 0 1-30.173334 30.173334c-32.086667-32.086667-74.94-49.753333-120.666666-49.753334S348 434.666667 315.893333 466.746667L180.133333 602.506667c-32.086667 32.086667-49.76 74.946667-49.76 120.666666s17.673333 88.6 49.76 120.666667 74.94 49.753333 120.666667 49.753333 88.593333-17.666667 120.666667-49.753333l71.766666-71.76a21.333333 21.333333 0 0 1 30.173334 30.166667l-71.746667 71.793333a210.886667 210.886667 0 0 1-70.526667 46.666667 213.58 213.58 0 0 1-80.32 15.586666z m366.933334-302.166666a210.986667 210.986667 0 0 0 70.526666-46.7l135.766667-135.766667a210.886667 210.886667 0 0 0 46.666667-70.526667 215.186667 215.186667 0 0 0 0-160.666666 212.34 212.34 0 0 0-117.226667-117.226667 215.186667 215.186667 0 0 0-160.666667 0 210.886667 210.886667 0 0 0-70.526666 46.7L500.573333 221.726667a21.333333 21.333333 0 0 0 30.173334 30.166666L602.506667 180.133333c32.086667-32.086667 74.946667-49.76 120.666666-49.753333s88.6 17.666667 120.666667 49.753333 49.76 74.94 49.76 120.666667-17.673333 88.593333-49.76 120.666667l-135.733333 135.786666c-32.086667 32.086667-74.946667 49.753333-120.666667 49.753334s-88.593333-17.666667-120.666667-49.753334a21.333333 21.333333 0 0 0-30.173333 30.173334 210.986667 210.986667 0 0 0 70.526667 46.7 215.273333 215.273333 0 0 0 160.666666 0z'
                    fill='#ffffff'
                    p-id='24380'
                  ></path>
                </svg>
              </Link>
            </div>
            <span className='j-flag time flex justify-start items-center'>
              <input
                className='progress-ctr min-w-full'
                style={{ background: trackStyling }}
                type='range'
                value={trackProgress}
                step='1'
                min='0'
                max={duration ? duration : `${duration}`}
                onChange={(e) => onScrub(e.target.value)}
                onMouseUp={onScrubEnd}
                onKeyUp={onScrubEnd}
              ></input>
              <div className='duration-text pl-4 text-xs'>
                {toMinutes(trackProgress)}/<em>{isNaN(duration) ? '00:00' : toMinutes(duration)}</em>
              </div>
            </span>
          </div>
        </div>

        <div className='btns flex justify-end pl-6 min-w-fit'>
          <button
            className='audio-ctr mx-1'
            data-action='audio-ctr'
            onClick={() => {
              setIsShowPlaylist(false);
              setIsShowVolumeCtr(!isShowVolumeCtr);
            }}
          >
            {isMuted ? (
              <svg
                viewBox='0 0 1024 1024'
                version='1.1'
                xmlns='http://www.w3.org/2000/svg'
                p-id='7136'
                width='24'
                height='24'
              >
                <path
                  d='M633.755767 219.58a21.333333 21.333333 0 0 0-30.173334 0L469.335767 353.833333V106.666667a21.333333 21.333333 0 0 0-36.42-15.086667L225.835767 298.666667H53.335767a53.393333 53.393333 0 0 0-53.333334 53.333333v320a53.393333 53.393333 0 0 0 53.333334 53.333333h44.5L6.2491 816.913333a21.333333 21.333333 0 0 0 30.173333 30.173334L158.1691 725.333333h67.666667l207.08 207.086667A21.333333 21.333333 0 0 0 469.335767 917.333333V414.166667l164.42-164.413334a21.333333 21.333333 0 0 0 0-30.173333zM53.335767 682.666667a10.666667 10.666667 0 0 1-10.666667-10.666667V352a10.666667 10.666667 0 0 1 10.666667-10.666667h181.333333a21.333333 21.333333 0 0 0 15.086667-6.246666L426.6691 158.166667v238.333333L140.502433 682.666667z m373.333333 183.166666l-176.913333-176.92A21.333333 21.333333 0 0 0 234.6691 682.666667h-33.833333L426.6691 456.833333z'
                  fill='#ffffff'
                  p-id='7137'
                ></path>
              </svg>
            ) : (
              <svg
                viewBox='0 0 1024 1024'
                version='1.1'
                xmlns='http://www.w3.org/2000/svg'
                p-id='23549'
                width='24'
                height='24'
              >
                <path
                  d='M448 938.666667a21.333333 21.333333 0 0 1-15.093333-6.246667L225.833333 725.333333H53.333333a53.393333 53.393333 0 0 1-53.333333-53.333333V352a53.393333 53.393333 0 0 1 53.333333-53.333333h172.5l207.08-207.086667A21.333333 21.333333 0 0 1 469.333333 106.666667v810.666666a21.333333 21.333333 0 0 1-21.333333 21.333334zM53.333333 341.333333a10.666667 10.666667 0 0 0-10.666666 10.666667v320a10.666667 10.666667 0 0 0 10.666666 10.666667h181.333334a21.333333 21.333333 0 0 1 15.086666 6.246666L426.666667 865.833333V158.166667L249.753333 335.086667A21.333333 21.333333 0 0 1 234.666667 341.333333z m664.266667 437.246667a21.333333 21.333333 0 0 1-13.733333-37.666667c6.666667-5.586667 13.146667-11.553333 19.333333-17.726666C779.6 666.78 810.666667 591.78 810.666667 512s-31.066667-154.78-87.48-211.186667c-6.173333-6.173333-12.666667-12.14-19.333334-17.726666a21.333333 21.333333 0 1 1 27.446667-32.666667 346.585333 346.585333 0 0 1 22.046667 20.213333 341.066667 341.066667 0 0 1 0 482.72 346.585333 346.585333 0 0 1-22.046667 20.213334 21.24 21.24 0 0 1-13.7 5.013333zM629.333333 625.72a21.333333 21.333333 0 0 1-16.733333-34.546667 127.366667 127.366667 0 0 0 0-158.346666 21.333333 21.333333 0 0 1 33.486667-26.433334 170.733333 170.733333 0 0 1 0 211.213334A21.333333 21.333333 0 0 1 629.333333 625.72z'
                  fill='#ffffff'
                  p-id='23550'
                ></path>
              </svg>
            )}
          </button>

          <button
            className='play mx-1'
            title='播放顺序'
          >
            <svg
              viewBox='0 0 1024 1024'
              version='1.1'
              xmlns='http://www.w3.org/2000/svg'
              p-id='23855'
              width='24'
              height='24'
            >
              <path
                d='M64 682.666667a21.333333 21.333333 0 0 1-21.333333-21.333334V224a53.393333 53.393333 0 0 1 53.333333-53.333333h812.5l-48.92-48.913334a21.333333 21.333333 0 0 1 30.173333-30.173333l85.333334 85.333333a21.333333 21.333333 0 0 1 0 30.173334l-85.333334 85.333333a21.333333 21.333333 0 0 1-30.173333-30.173333l48.92-48.913334H96a10.666667 10.666667 0 0 0-10.666667 10.666667v437.333333a21.333333 21.333333 0 0 1-21.333333 21.333334z m100.42 249.753333a21.333333 21.333333 0 0 0 0-30.173333L115.5 853.333333H928a53.393333 53.393333 0 0 0 53.333333-53.333333V362.666667a21.333333 21.333333 0 0 0-42.666666 0v437.333333a10.666667 10.666667 0 0 1-10.666667 10.666667H115.5l48.92-48.913334a21.333333 21.333333 0 0 0-30.173333-30.173333l-85.333334 85.333333a21.333333 21.333333 0 0 0 0 30.173334l85.333334 85.333333a21.333333 21.333333 0 0 0 30.173333 0z'
                fill='#ffffff'
                p-id='23856'
              ></path>
            </svg>
          </button>
          <button
            className='playlist mx-1'
            title='播放列表'
            onClick={() => {
              setIsShowVolumeCtr(false);
              setIsShowPlaylist(!isShowPlaylist);
            }}
          >
            <svg
              viewBox='0 0 1024 1024'
              version='1.1'
              xmlns='http://www.w3.org/2000/svg'
              p-id='24123'
              width='24'
              height='24'
            >
              <path
                d='M42.666667 106.666667a21.333333 21.333333 0 0 1 21.333333-21.333334h896a21.333333 21.333333 0 0 1 0 42.666667H64a21.333333 21.333333 0 0 1-21.333333-21.333333z m21.333333 405.333333h597.333333a21.333333 21.333333 0 0 0 0-42.666667H64a21.333333 21.333333 0 0 0 0 42.666667z m384 341.333333H64a21.333333 21.333333 0 0 0 0 42.666667h384a21.333333 21.333333 0 0 0 0-42.666667z m516.513333-299.146666a21.333333 21.333333 0 0 1-25.333333-16.34c-2.726667-12.586667-9.8-36.313333-26.533333-53.733334-7.213333-7.446667-15.273333-12.886667-23.98-16.113333a21.18 21.18 0 0 1-4.36-2.186667A140.893333 140.893333 0 0 1 853.333333 438v436.666667c0 15.633333-4.5 30.666667-13.38 44.666666-8.053333 12.666667-19.333333 23.94-33.613333 33.44-27.64 18.433333-64 28.58-102.34 28.58s-74.666667-10.146667-102.34-28.58c-14.253333-9.5-25.56-20.746667-33.613333-33.44-8.88-14-13.38-29.013333-13.38-44.666666s4.5-30.666667 13.38-44.666667c8.053333-12.666667 19.333333-23.94 33.613333-33.44C629.333333 778.146667 665.646667 768 704 768s74.666667 10.146667 102.34 28.58c1.48 0.98 2.913333 2 4.326667 3.006667V320a21.333333 21.333333 0 0 1 42.626666-1.266667c1.073333 18.04 5.806667 52.666667 25.446667 82.08 7.713333 11.553333 16.846667 21.006667 27.153333 28.133334 13.853333 5.513333 26.453333 14.113333 37.493334 25.606666 22.813333 23.753333 32.966667 53.493333 37.466666 74.266667a21.333333 21.333333 0 0 1-16.34 25.366667zM810.666667 874.666667c0-20.82-17.54-35.62-28-42.586667-20.706667-13.806667-48.666667-21.413333-78.666667-21.413333s-58 7.606667-78.666667 21.413333c-10.453333 6.966667-28 21.766667-28 42.586667s17.54 35.62 28 42.586666c20.706667 13.806667 48.666667 21.413333 78.666667 21.413334s58-7.606667 78.666667-21.413334c10.46-6.966667 28-21.766667 28-42.586666z'
                fill='#ffffff'
                p-id='24124'
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* 音量控制条 */}
      <div
        tabIndex={0}
        style={{
          display: `${isShowVolumeCtr ? '' : 'none'}`,
        }}
        className='volume-ctr absolute bottom-16 h-8 min-w-fit bg-black px-3'
      >
        <input
          type='range'
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
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          display: `${isShowPlaylist ? '' : 'none'}`,
        }}
        className='w-1/2 h-80 absolute bottom-12 rounded-t'
      >
        <div className='h-full w-full'>
          <table
            className='w-full h-80 block overflow-auto'
            style={{
              color: '#E2E2E2',
              tableLayout: 'fixed',
            }}
          >
            <thead className='w-full'>
              <tr className='w-full h-8 sticky top-0 bg-black'>
                <th
                  align='left'
                  className='idx'
                ></th>
                <th align='left'>播放列表</th>
                <th align='left'></th>
                <th align='left'>
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
                            name: 'The Velvet Underground',
                          },
                          album: {
                            id: 1798937,
                            name: 'The Velvet Underground & Nico',
                            picUrl:
                              'https://p1.music.126.net/5CuLry1JQsbXoBvBgL9BmQ==/2535473814614187.jpg?param=130y130',
                          },
                        },
                      ]);
                      setTrackIndex(0);
                      audioRef.current.pause();
                    }}
                    style={{
                      cursor: 'pointer',
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
                    className='w-full audio-playlist'
                    onDoubleClick={playTrack}
                  >
                    <td
                      align='center'
                      className={`idx idx-${idx + 1} px-4`}
                    >
                      {idx + 1}
                    </td>
                    <td align='left'>
                      <Link
                        className='max-w-fit mr-12 text'
                        title={item.song.name}
                        to={`/song/${item.song.id}`}
                      >
                        {item.song.name}
                      </Link>
                    </td>
                    <td align='left'>
                      <Link
                        className='max-w-fit mr-12'
                        title={item.artist.name}
                        to={`/artist/${item.artist.id}`}
                      >
                        {item.artist.name}
                      </Link>
                    </td>
                    <td align='left'>
                      <Link
                        className='max-w-fit mr-4'
                        title={item.album.name}
                        to={`/album/${item.album.id}`}
                      >
                        <svg
                          viewBox='0 0 1024 1024'
                          version='1.1'
                          xmlns='http://www.w3.org/2000/svg'
                          p-id='24379'
                          width='14'
                          height='14'
                        >
                          <path
                            d='M300.813333 936.293333a213.586667 213.586667 0 0 1-80.326666-15.553333 212.34 212.34 0 0 1-117.226667-117.226667 215.186667 215.186667 0 0 1 0-160.666666 210.886667 210.886667 0 0 1 46.7-70.526667l135.766667-135.746667a210.986667 210.986667 0 0 1 70.526666-46.7 215.273333 215.273333 0 0 1 160.666667 0 210.986667 210.986667 0 0 1 70.526667 46.7 21.333333 21.333333 0 0 1-30.173334 30.173334c-32.086667-32.086667-74.94-49.753333-120.666666-49.753334S348 434.666667 315.893333 466.746667L180.133333 602.506667c-32.086667 32.086667-49.76 74.946667-49.76 120.666666s17.673333 88.6 49.76 120.666667 74.94 49.753333 120.666667 49.753333 88.593333-17.666667 120.666667-49.753333l71.766666-71.76a21.333333 21.333333 0 0 1 30.173334 30.166667l-71.746667 71.793333a210.886667 210.886667 0 0 1-70.526667 46.666667 213.58 213.58 0 0 1-80.32 15.586666z m366.933334-302.166666a210.986667 210.986667 0 0 0 70.526666-46.7l135.766667-135.766667a210.886667 210.886667 0 0 0 46.666667-70.526667 215.186667 215.186667 0 0 0 0-160.666666 212.34 212.34 0 0 0-117.226667-117.226667 215.186667 215.186667 0 0 0-160.666667 0 210.886667 210.886667 0 0 0-70.526666 46.7L500.573333 221.726667a21.333333 21.333333 0 0 0 30.173334 30.166666L602.506667 180.133333c32.086667-32.086667 74.946667-49.76 120.666666-49.753333s88.6 17.666667 120.666667 49.753333 49.76 74.94 49.76 120.666667-17.673333 88.593333-49.76 120.666667l-135.733333 135.786666c-32.086667 32.086667-74.946667 49.753333-120.666667 49.753334s-88.593333-17.666667-120.666667-49.753334a21.333333 21.333333 0 0 0-30.173333 30.173334 210.986667 210.986667 0 0 0 70.526667 46.7 215.273333 215.273333 0 0 0 160.666666 0z'
                            fill='#ffffff'
                            p-id='24380'
                          ></path>
                        </svg>
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
