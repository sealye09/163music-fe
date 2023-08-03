import { FC, useRef } from "react";
import { Link } from "react-router-dom";
import { BsFillPlayCircleFill } from "react-icons/bs";

import { Track } from "@/types";
import useAudioStore from "@/stores/useAudioStore";

interface Props {
  listItems: string[];
  listInfo: Track[];
}

const TrackTable: FC<Props> = ({ listItems, listInfo }) => {
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
        className="w-full border border-[#d5d5d5] transition-all transition-300"
        ref={tableRef}
      >
        <thead>
          <tr className="w-full h-10 bg-[#f3f3f3]">
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
                className="w-full h-10 group hover:bg-gray-300/80 odd:bg-gray-100 transition-all transition-300"
              >
                <td
                  align="center"
                  className={`idx idx-${idx + 1} h-full cursor-pointer px-4`}
                  onClick={() => handlePlayTrack(idx)}
                >
                  <BsFillPlayCircleFill className="text-red-600/80 h-6 w-6 hidden group-hover:block" />
                  <span className="group-hover:hidden">{idx + 1}</span>
                </td>
                <td align="left">
                  <Link
                    className="max-w-fit mr-12 line-clamp-1 hover:text-red-700/80 hover:underline"
                    title={item.song.name}
                    to={`/song/${item.song.id}`}
                  >
                    {item.song.name}
                  </Link>
                </td>
                {listItems[1] == "歌手" || listItems[2] == "歌手" ? (
                  <td align="left">
                    <Link
                      className="max-w-fit mr-12 line-clamp-1 hover:text-red-700/80 hover:underline"
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
                      className="max-w-fit mr-4 line-clamp-1 hover:text-red-700/80 hover:underline"
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

export default TrackTable;
