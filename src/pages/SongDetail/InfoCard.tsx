import { FC, memo } from "react";
import { Link } from "react-router-dom";

import { Track } from "@/types";
import useAudioStore from "@/stores/useAudioStore";
import SImage from "@/components/Image";
import Button from "@/components/Button";

interface InfoCardProps extends Track {}

const InfoCard: FC<InfoCardProps> = memo(
  ({ song, artist, album }) => {
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
      <div className="info-card w-full h-64 flex px-10 gap-8">
        <SImage
          height="h-56"
          width="w-56"
          className="rounded-md"
          src={album.picUrl}
        />

        <div className="playlist-info flex flex-1 flex-col gap-4 text-gray-700">
          <div className="title text-xl w-full">
            <p>{song.name}</p>
          </div>

          {!!artist && (
            <div className="artist-info w-full flex">
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
            <div className="album-info w-full flex">
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

          <div className="btns flex gap-1">
            <Button
              className="py-1 px-3"
              onClick={playTrack}
            >
              播放
            </Button>
            <Button
              className="py-1 px-3"
              onClick={addTrack}
            >
              +
            </Button>
          </div>
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.song.id === nextProps.song.id;
  }
);

export default InfoCard;
