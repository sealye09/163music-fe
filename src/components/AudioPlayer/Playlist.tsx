import { FC, useContext } from "react";
import { TracksContext } from "../../pages/Layout";
import { Link } from "react-router-dom";
import { BsLink45Deg } from "react-icons/bs";

import styles from "./index.module.css";

interface PlaylistProps {
  isShowPlaylist: boolean;
  audioRef: any;
}

const Playlist: FC<PlaylistProps> = ({ isShowPlaylist, audioRef }) => {
  const { tracks, setTracks, trackIndex, setTrackIndex } = useContext<any>(TracksContext);

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
                    className='w-fit'
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
                    className='w-fit'
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
                    className='w-fit'
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
  );
};

export default Playlist;
