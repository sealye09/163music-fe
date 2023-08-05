import { FC } from "react";
import { Link } from "react-router-dom";

import { Track } from "@/types";
import useAudioStore from "@/stores/useAudioStore";
import SImage from "@/components/Image";

interface InfoCardProps extends Track {
  tags?: string[];
  description?: string;
}

const InfoCard: FC<InfoCardProps> = ({ song, artist, album, tags, description }) => {
  const tracks = useAudioStore((state) => state.tracks);
  const setTracks = useAudioStore((state) => state.setTracks);
  const setTrackIndex = useAudioStore((state) => state.setTrackIndex);

  const playTrack = () => {
    setTracks([{ song: song, artist: artist, album: album }]);
    setTrackIndex(0);
  };

  const addTrack = () => {
    setTracks([...tracks, { song: song, artist: artist, album: album }]);
  };

  return (
    <div className="info-card flex px-10 pb-4 justify-around">
      <SImage
        height="h-56"
        width="w-56"
        className="rounded-md"
        src={album.picUrl}
      />
      <div className="playlist-info w-2/3 flex-col justify-end">
        <div className="title text-xl pb-4 w-full">
          <p>{song.name}</p>
        </div>
        {!!artist && (
          <div className="artist-info text-sm pb-4 w-full flex">
            <p>歌手：</p>
            <Link
              className="hover:underline hover:text-red-600"
              artist-id={artist.id}
              title={artist.name}
              to={`/artist/${artist.id}`}
            >
              {artist.name}
            </Link>
          </div>
        )}
        {!!album && (
          <div className="album-info text-sm pb-4 w-full flex">
            <p>专辑：</p>
            <Link
              className="hover:underline hover:text-red-600"
              artist-id={album.id}
              title={album.name}
              to={`/album/${album.id}`}
            >
              {album.name}
            </Link>
          </div>
        )}

        <div className="btns text-sm pb-4">
          <button
            style={{
              backgroundColor: "#2B659E",
            }}
            className="btn play text-white px-3 py-1 rounded-md"
            onClick={playTrack}
          >
            播放
          </button>
          <button
            style={{
              backgroundColor: "#2B659E",
            }}
            className="btn rounded-md py-1 px-2 text-white"
            onClick={addTrack}
          >
            +
          </button>
        </div>
        <div className="text-sm pb-2 flex w-full">
          {!!tags && (
            <>
              <p>标签：</p>
              {tags.map((tag) => (
                <button
                  key={tag}
                  className="tag-btn rounded-full bg-gray-300 w-14 mr-2"
                >
                  {tag}
                </button>
              ))}
            </>
          )}
        </div>
        {!!description && (
          <div className="des pb-3 w-full">
            <p
              className="text-sm line-clamp-4"
              title={description}
            >
              介绍：{description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoCard;
