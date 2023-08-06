import { FC, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import { AlbumInfo, Track } from "@/types";
import useAudioStore from "@/stores/useAudioStore";
import { albumApi } from "@/service";
import TrackTable from "@/components/TrackTable";

import SImage from "@/components/Image";
import Button from "@/components/Button";

const AlbumDetail: FC = () => {
  const { albumId } = useParams();
  const tracks = useAudioStore((state) => state.tracks);
  const setTracks = useAudioStore((state) => state.setTracks);
  const setTrackIndex = useAudioStore((state) => state.setTrackIndex);
  const setIsPlaying = useAudioStore((state) => state.setIsPlaying);

  const [albumInfo, serAlbumInfo] = useState<AlbumInfo>();
  const [songDetail, setSongDetail] = useState<Track[]>([]);

  const addAllSong = () => {
    let allNewTracks: Track[] = [];
    songDetail.map((song) => {
      allNewTracks.push({ ...song });
    });
    setTracks([...tracks, ...allNewTracks]);
  };

  const playAllSong = () => {
    let allNewTracks: Track[] = [];
    songDetail.map((song) => {
      allNewTracks.push({ ...song });
    });
    setTracks(allNewTracks);
    setTrackIndex(0);
    setIsPlaying(true);
  };

  useEffect(() => {
    albumApi.getAlbum(albumId!).then((res) => {
      // @ts-ignore
      const { songs, album } = res;
      const albumSongs = songs.map((song: any) => {
        return {
          song: {
            id: song.id,
            name: song.name,
          },
          artist: {
            id: song.ar[0].id,
            name: song.ar[0].name,
          },
          album: {
            id: song.al.id,
            name: song.al.name,
            picUrl: song.al.picUrl,
          },
        };
      });

      setSongDetail(albumSongs);
      serAlbumInfo({
        id: album.id as number,
        name: album.name,
        coverImgUrl: album.picUrl,
        description: album.description,
        artist: {
          id: album.artists[0].id,
          name: album.artists[0].name,
        },
      });
    });
  }, [albumId]);

  return (
    <div className="w-full h-full bg-gray1 border-y border-gray1">
      <div className="w-content mx-auto border-x border-gray1 bg-white">
        <div className="flex flex-col pt-8 mx-auto">
          {albumInfo ? (
            <>
              <div className="info-card w-full h-64 flex px-10 gap-8">
                <SImage
                  height="h-56"
                  width="w-56"
                  className="rounded-md"
                  src={albumInfo.coverImgUrl}
                  alt="album-cover"
                />

                <div className="playlist-info flex flex-1 flex-col gap-4 text-gray-700">
                  <div className="artist-info w-full flex">
                    <p>歌手：</p>
                    <Link
                      className="hover:text-red-700 hover:underline"
                      artist-id={albumInfo.artist.id}
                      title={albumInfo.artist.name}
                      to={`/artist/${albumInfo.artist.id}`}
                    >
                      {albumInfo.artist.name}
                    </Link>
                  </div>
                  <div className="album-info w-full flex">
                    <p>专辑：</p>
                    <Link
                      className="hover:text-red-700 hover:underline"
                      artist-id={albumInfo.id}
                      title={albumInfo.name}
                      to={`/album/${albumInfo.id}`}
                    >
                      {albumInfo.name}
                    </Link>
                  </div>

                  <div className="des w-full">
                    <div
                      className="text-sm text-gray-700 overflow-hidden line-clamp-6"
                      title={albumInfo.description}
                    >
                      介绍：{albumInfo.description}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </div>
        <div className="tracks-list px-10 pb-10">
          <div className="list-header bg-white flex justify-between h-8 min-h-fit mt-10 items-end pb-2 border-b-2 border-red-700">
            <div className="flex items-end justify-between mx-2 w-full min-h-fit">
              <div className="flex items-end">
                <p className="text-xl text-black">歌曲列表</p>
                <p className="track-count text-gray-500 text-sm mx-4">
                  {!!songDetail ? songDetail.length : "1"}
                  首歌
                </p>
              </div>
              <div className="btns text-sm items-end space-x-2">
                <Button
                  className="btn-play text-white px-3 py-1 rounded-md"
                  onClick={playAllSong}
                >
                  播放
                </Button>
                <Button
                  className="btn-add rounded-md py-1 px-2 text-white"
                  onClick={addAllSong}
                >
                  +
                </Button>
              </div>
            </div>
          </div>
          <TrackTable
            listItems={["歌曲标题", "专辑"]}
            listInfo={songDetail}
          />
        </div>
      </div>
    </div>
  );
};

export default AlbumDetail;
