import { FC } from "react";
import { Link } from "react-router-dom";
import { BsLink45Deg } from "react-icons/bs";

import { BasisInfo } from "@/types";
import styles from "./index.module.css";
import SImage from "../Image";

interface CenterBarProps {
  duration: number;
  trackProgress: number;
  song: BasisInfo;
  album: BasisInfo & { picUrl: string };
  artist: BasisInfo;
  onScrub: (value: string) => void;
  onScrubEnd: () => void;
}

const CenterBar: FC<CenterBarProps> = ({
  song,
  album,
  artist,
  duration,
  trackProgress,
  onScrubEnd,
  onScrub,
}) => {
  const currentPercentage = duration ? `${(trackProgress / duration) * 100}%` : "0%";

  const trackStyling = `-webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #C60C0C), color-stop(${currentPercentage}, rgba(19,19,19,0.85)))`;

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

  return (
    <div className="flex min-w-fit w-full gap-6">
      <div className="flex justify-start min-w-fit">
        <Link
          to={`/song/${song.id}`}
          className="mask"
        >
          <SImage
            width="w-10"
            height="h-10"
            src={album.picUrl}
            alt="album-pic"
          />
        </Link>
      </div>
      <div className="w-min-fit py-1 w-full">
        <div className="text-xs center-play flex gap-4 w-full">
          <Link
            to={`/song/${song.id}`}
            className="text-white"
            title={song.name}
          >
            {song.name}
          </Link>
          <Link
            className="text-gray-400"
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
        <div className="flex w-min-fit justify-start items-center gap-2 w-full">
          <input
            className={`${styles.progress_ctr} min-w-fit w-full`}
            style={{ background: trackStyling }}
            type="range"
            value={trackProgress}
            step="1"
            min="0"
            max={duration}
            onChange={(e) => onScrub(e.target.value)}
            onMouseUp={onScrubEnd}
            onKeyUp={onScrubEnd}
          />
          <div className="text-gray-400 text-xs">
            {toMinutes(trackProgress)}/<em>{isNaN(duration) ? "00:00" : toMinutes(duration)}</em>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CenterBar;
