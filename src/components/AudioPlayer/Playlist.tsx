import { forwardRef, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { BsLink45Deg } from "react-icons/bs";

import { AudioPlayerContextProps, AudioPlayerContext } from ".";
import useTrackStore from "@/stores/useTrackStore";
import styles from "./index.module.css";
import { twMerge } from "tailwind-merge";

const Playlist = forwardRef<HTMLButtonElement>(({}, playlistBtnRef) => {
  const tracks = useTrackStore((state) => state.tracks);
  const resetTracks = useTrackStore((state) => state.resetTracks);
  const setTrackIndex = useTrackStore((state) => state.setTrackIndex);

  const modalRef = useRef<HTMLDivElement>(null);

  // Context
  const { isShowPlaylist, setIsShowPlaylist } =
    useContext<AudioPlayerContextProps>(AudioPlayerContext);

  const playTrack = (e: any) => {
    const node = e.target.parentNode;
    const idx = node.querySelector(".idx").textContent;
    setTrackIndex(idx - 1);
  };

  useEffect(() => {
    const handleClickOutside: EventListener = (event: Event) => {
      if (!playlistBtnRef || !modalRef.current) return;

      if ("current" in playlistBtnRef) {
        if (playlistBtnRef.current && playlistBtnRef.current.contains(event.target as Node)) {
          return;
        }
      }

      if (modalRef.current.contains(event.target as Node)) return;

      if (modalRef.current) {
        setIsShowPlaylist(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={modalRef}
      className={twMerge(
        "absolute bottom-12 rounded-t w-[864px] h-[340px] bg-black/90 transition-all",
        isShowPlaylist ? "" : "hidden"
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
                onClick={() => {
                  resetTracks();
                  setTrackIndex(0);
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
});

export default Playlist;
