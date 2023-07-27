import { FC } from "react";
import { Link } from "react-router-dom";
import { BsLink45Deg } from "react-icons/bs";

import styles from "./index.module.css";
import useTrackStore from "@/stores/useTrackStore";

interface PlaylistProps {
  isShowPlaylist: boolean;
}

const Playlist: FC<PlaylistProps> = ({ isShowPlaylist }) => {
  const tracks = useTrackStore((state) => state.tracks);
  const resetTracks = useTrackStore((state) => state.resetTracks);
  const setTrackIndex = useTrackStore((state) => state.setTrackIndex);

  const playTrack = (e: any) => {
    const node = e.target.parentNode;
    const idx = node.querySelector(".idx").textContent;
    setTrackIndex(idx - 1);
  };

  return (
    <div
      tabIndex={0}
      style={{
        width: "864px",
        height: "340px",
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        display: `${isShowPlaylist ? "" : "none"}`,
      }}
      className="absolute bottom-12 rounded-t"
    >
      <table className={styles.table}>
        <thead>
          <tr className="w-full sticky h-8 top-0 bg-black">
            <th
              align="left"
              className="idx"
            ></th>
            <th align="left">播放列表</th>
            <th align="left"></th>
            <th align="left">
              <a
                onClick={() => {
                  resetTracks();
                  setTrackIndex(0);
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
          {!!tracks &&
            tracks.map((item: any, idx: number) => (
              <tr
                key={item.song.id}
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
};

export default Playlist;
