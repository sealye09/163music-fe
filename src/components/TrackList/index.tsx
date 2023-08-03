import { FC, useRef } from "react";
import { Link } from "react-router-dom";
import { BsFillPlayCircleFill } from "react-icons/bs";

import { Track } from "@/types";
import useAudioStore from "@/stores/useAudioStore";

import "./index.css";
interface Props {
  listItems: string[];
  listInfo: Track[];
}

const TrackList: FC<Props> = ({ listItems, listInfo }) => {
  const setTracks = useAudioStore((state) => state.setTracks);
  const setTrackIndex = useAudioStore((state) => state.setTrackIndex);
  const setIsPlaying = useAudioStore((state) => state.setIsPlaying);

  const tableRef = useRef<HTMLTableElement>(null);

  const handlePlayTrack = (idx: number) => {
    const track = listInfo[idx];
    console.log("🚀 ~ file: index.tsx:23 ~ handlePlayTrack ~ track:", track);
    setIsPlaying(true);
    setTracks(listInfo);
    setTrackIndex(idx);
  };

  return (
    <div>
      <table
        className="w-full list-table transition-all transition-300"
        ref={tableRef}
      >
        <thead>
          <tr className="w-full table-head h-10">
            <th
              align="left"
              className="idx"
            />
            <th align="left">歌曲标题</th>
            {listItems[1] == "歌手" ||
            listItems[2] == "歌手" ||
            listItems[1] == "专辑" ||
            listItems[2] == "专辑" ? (
              <th align="left">{listItems[1]}</th>
            ) : null}
            {listItems[1] == "歌手" ||
            listItems[2] == "歌手" ||
            listItems[1] == "专辑" ||
            listItems[2] == "专辑" ? (
              <th align="left">{listItems[2]}</th>
            ) : null}
          </tr>
        </thead>
        <tbody>
          {!!listInfo &&
            listInfo.map((item, idx) => (
              <tr
                key={item.song.id}
                className="tr-info w-full h-10 group"
              >
                <td
                  align="center"
                  className={`idx idx-${idx + 1} cursor-pointer px-4`}
                  onClick={() => handlePlayTrack(idx)}
                >
                  <BsFillPlayCircleFill className="h-full w-full text-red-600/80 hidden group-hover:block" />
                  <span className="group-hover:hidden">{idx + 1}</span>
                </td>
                <td align="left">
                  <Link
                    className="song-link max-w-fit mr-12"
                    title={item.song.name}
                    to={`/song/${item.song.id}`}
                  >
                    {item.song.name}
                  </Link>
                </td>
                {listItems[1] == "歌手" || listItems[2] == "歌手" ? (
                  <td align="left">
                    <Link
                      className="artist-link max-w-fit mr-12"
                      title={item.artist.name}
                      to={`/artist/${item.artist.id}`}
                    >
                      {item.artist.name}
                    </Link>
                  </td>
                ) : null}

                {listItems[1] == "专辑" || listItems[2] == "专辑" ? (
                  <td align="left">
                    <Link
                      className="album-link max-w-fit mr-4"
                      title={item.album.name}
                      to={`/album/${item.album.id}`}
                    >
                      {item.album.name}
                    </Link>
                  </td>
                ) : null}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrackList;
