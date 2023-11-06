import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { BsLink45Deg } from "react-icons/bs";
import { twMerge } from "tailwind-merge";

import { resetTracks, setTrackIndex, useAudioStore } from "@/stores/useAudioStore";

import styles from "./index.module.css";

const Playlist = forwardRef<HTMLDivElement, { className?: string }>(({ className }, ref) => {
  const tracks = useAudioStore((state) => state.tracks);

  const playTrack = (e: any) => {
    const node = e.target.parentNode;
    const idx = node.querySelector(".idx").textContent;
    setTrackIndex(idx - 1);
  };

  return (
    <div
      ref={ref}
      className={twMerge(
        "absolute bottom-12 rounded-t w-content h-[340px] bg-black/90 transition-all",
        className
      )}
    >
      <table className={styles.table}>
        <thead className="w-full whitespace-nowrap">
          <tr className="w-full sticky h-8 top-0 bg-black">
            <th
              align="left"
              className="idx"
            ></th>
            <th align="left">播放列表</th>
            <th align="left"></th>
            <th align="left">
              <a
                className="cursor-pointer"
                onClick={() => resetTracks()}
              >
                清除全部
              </a>
            </th>
          </tr>
        </thead>
        <tbody>
          {!!tracks &&
            tracks.map((item: any, idx: number) => (
              <tr
                key={idx}
                className={styles.audio_playlist}
                onDoubleClick={playTrack}
              >
                <td
                  align="center"
                  className={`idx idx-${idx + 1} px-4 w-[80px]`}
                >
                  {idx + 1}
                </td>
                <td
                  align="left"
                  className="max-w-fit mr-12 text w-[420px]"
                >
                  <Link
                    className="w-fit"
                    title={item.song.name}
                    to={`/song/${item.song.id}`}
                  >
                    {item.song.name}
                  </Link>
                </td>
                <td
                  align="left"
                  className="max-w-fit mr-12 w-[280px]"
                >
                  <Link
                    className="w-fit"
                    title={item.artist.name}
                    to={`/artist/${item.artist.id}`}
                  >
                    {item.artist.name}
                  </Link>
                </td>
                <td
                  align="left"
                  className="max-w-fit mr-4 w-[80px]"
                >
                  <Link
                    className="w-fit"
                    title={item.album.name}
                    to={`/album/${item.album.id}`}
                  >
                    <BsLink45Deg size={14} />
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
});

export default Playlist;
