import { FC, useEffect, useState } from "react";
import { useParams } from "react-router";

import { RawSongInfo, Track } from "@/types";
import { songApi } from "@/service";
import useAudioStore from "@/stores/useAudioStore";
import InfoCard from "@/pages/SongDetail/InfoCard";

import RollingLyric from "./RollingLyric";
import Lyric from "./Lyric";

interface TLyricWithTime {
  time: string;
  lrc: string;
}

export interface TLyric {
  time: string;
  lyric: string;
  tlyric: string;
}

const SongDetail: FC = () => {
  const { songId } = useParams();

  const currentPlayTrack = useAudioStore((state) => state.getCurrentTrack());

  const [songDetail, setSongDetail] = useState<Track>();
  const [showLyric, setShowLyric] = useState<TLyric[]>();

  const initLyric = (rawLyric: string) => {
    const lrcReg = /\n/;
    const timeReg = /\[.*\]/;
    let res: TLyricWithTime[] = [];

    for (let l of rawLyric.split(lrcReg)) {
      let lrc = l.split(timeReg);
      let times = l.match(timeReg);

      if (!!times) {
        // @ts-ignore
        times = times[0].split("[").join("").split("]");
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
    return res.filter((item) => item.lrc.length !== 0);
  };

  const mergeLyric = (lyric: TLyricWithTime[], translatedLyric: TLyricWithTime[]) => {
    let res: TLyric[] = [];
    let i = 0;
    let j = 0;
    while (i < lyric.length && j < translatedLyric.length) {
      if (lyric[i].time === translatedLyric[j].time) {
        res.push({
          time: lyric[i].time,
          lyric: lyric[i].lrc,
          tlyric: translatedLyric[j].lrc,
        });
        i++;
        j++;
      } else if (lyric[i].time > translatedLyric[j].time) {
        res.push({
          time: translatedLyric[j].time,
          lyric: "",
          tlyric: translatedLyric[j].lrc,
        });
        j++;
      } else {
        res.push({
          time: lyric[i].time,
          lyric: lyric[i].lrc,
          tlyric: "",
        });
        i++;
      }
    }
    while (i < lyric.length) {
      res.push({
        time: lyric[i].time,
        lyric: lyric[i].lrc,
        tlyric: "",
      });
      i++;
    }
    while (j < translatedLyric.length) {
      res.push({
        time: translatedLyric[j].time,
        lyric: "",
        tlyric: translatedLyric[j].lrc,
      });
      j++;
    }
    return res;
  };

  // 获取歌曲信息
  useEffect(() => {
    songApi.getSongDetail(songId!).then((res: any) => {
      const data = ("songs" in res ? res.songs[0] : {}) as RawSongInfo;
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
      setSongDetail({ ...details });
    });
  }, [songId]);

  // 获取歌词
  useEffect(() => {
    songApi.getSongLyric(Number(songId!)).then((res: any) => {
      console.log(res);
      const lyric = initLyric(res.lrc.lyric);
      const translatedLyric = initLyric(res.tlyric.lyric);

      // 按时间排序两个歌词文本，最后展示时一起展示
      setShowLyric(mergeLyric(lyric, translatedLyric));
    });
  }, [songId]);

  if (!showLyric || !songDetail) {
    return null;
  }

  return (
    <div className="flex felx-row justify-center bg-gray1 border-y border-gray1">
      <div className="h-min flex flex-col content-center bg-white pt-8 mx-auto w-content border-x border-gray1">
        <div>
          <InfoCard
            song={songDetail.song}
            artist={songDetail.artist}
            album={songDetail.album}
          />
        </div>
        {songId === currentPlayTrack.song.id.toString() ? (
          <RollingLyric lyric={showLyric} />
        ) : (
          <Lyric lyric={showLyric} />
        )}
      </div>
    </div>
  );
};

export default SongDetail;
