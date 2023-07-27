import { FC } from "react";
import { Link } from "react-router-dom";

import { Track } from "@/types";
import useTrackStore from "@/stores/useTrackStore";

import "./index.css";

interface InfoCardProps extends Track {
  tags?: string[];
  description?: string;
}

const InfoCard: FC<InfoCardProps> = ({ song, artist, album, tags, description }) => {
  const tracks = useTrackStore((state) => state.tracks);
  const setTracks = useTrackStore((state) => state.setTracks);
  const setTrackIndex = useTrackStore((state) => state.setTrackIndex);

  const playTrack = (e: any) => {
    setTracks([{ song: song, artist: artist, album: album }]);
    setTrackIndex(0);
  };

  const addTrack = (e: any) => {
    setTracks([...tracks, { song: song, artist: artist, album: album }]);
  };

  return (
    <div className="info-card flex px-10 pb-4 justify-around">
      <div className="img">
        <img
          className="rounded-md w-56 h-56"
          src={`${album?.picUrl}`}
        />
      </div>
      <div className="playlist-info w-2/3 flex-col justify-end">
        <div className="title text-xl pb-4 w-full">
          <p>{song?.name}</p>
        </div>
        {!!artist && (
          <div className="artist-info text-sm pb-4 w-full flex">
            <p>歌手：</p>
            <Link
              className="artist-link"
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
              className="artist-link"
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
        <div className="tags pb-3 flex w-full">
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
              className="ply-description"
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
