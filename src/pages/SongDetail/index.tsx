import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import InfoCard from '../../components/Loading/InfoCard';
import { getSongDetail, getSongLyric } from '../../service';
import { Track } from '../Layout';
import './index.css';
import { RawSongInfo } from '../ArtistDetail';

interface Props {}

const SongDetail: FC<Props> = ({}) => {
  const { songId } = useParams();
  const [songDetail, setSongDetail] = useState<Track>();
  const [lyric, setLyric] = useState<
    Array<{
      time: string;
      lrc: string;
    }>
  >([]);

  const initLyric = (rawLyric: string) => {
    const lrcReg = /\n/;
    const timeReg = /\[.*\]/;
    let res: Array<{ time: string; lrc: string }> = [];

    for (let l of rawLyric.split(lrcReg)) {
      let lrc = l.split(timeReg);
      let times = l.match(timeReg);

      if (!!times) {
        // @ts-ignore
        times = times[0].split('[').join('').split(']');
        // @ts-ignore
        for (let t of times) {
          if (t.length !== 0) {
            res.push({
              time: t,
              lrc: lrc[1],
            });
          }
        }
      }
    }

    return res;
  };

  // 获取歌曲信息
  useEffect(() => {
    getSongDetail(songId!).then((res) => {
      // @ts-ignore
      const data = ('songs' in res ? res.songs[0] : {}) as RawSongInfo;
      const details: Track = {
        song: {
          id: data.id,
          name: data.name,
        },
        artist: {
          id: data.ar[0].id,
          name: data.ar[0].name,
        },
        album: {
          id: data.al.id,
          name: data.al.name,
          picUrl: data.al.picUrl,
        },
      };
      console.log(details);
      setSongDetail({ ...details });
    });
  }, [songId]);

  // 获取歌词
  useEffect(() => {
    getSongLyric(Number(songId!)).then((res) => {
      // @ts-ignore
      setLyric(initLyric(res.lrc.lyric));
    });
  }, [songId]);

  return (
    <div className='song-detail flex felx-row justify-center'>
      <div className='info flex flex-col content-center bg-white pt-8'>
        <div>
          {!!songDetail ? (
            <InfoCard
              song={songDetail.song}
              artist={songDetail.artist}
              album={songDetail.album}
            />
          ) : (
            <></>
          )}
          <></>
        </div>
        <div className='h-auto border-t-4 flex flex-col justify-center items-center py-10'>
          {lyric.length !== 0 ? lyric.map((item) => <p className='py-2'>{item.lrc}</p>) : <></>}
        </div>
      </div>
    </div>
  );
};

export default SongDetail;
