import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AxiosResponse } from "axios";

import { PlaylistInfoDetail, RawSongInfo, Track } from "@/types";
import { playlistApi } from "@/service";
import TrackTable from "@/components/TrackTable";
import useAudioStore from "@/stores/useAudioStore";
import SImage from "@/components/Image";
import Button from "@/components/Button";
import Tag from "@/components/Tag";

const PlaylistDetail: FC = () => {
  const { playlistId } = useParams();
  const navigate = useNavigate();

  const [playlistDetail, setPlaylistDetail] = useState<PlaylistInfoDetail>();
  const [allSongs, setAllSongs] = useState<Track[]>([]);

  const tracks = useAudioStore((state) => state.tracks);
  const setTracks = useAudioStore((state) => state.setTracks);
  const setTrackIndex = useAudioStore((state) => state.setTrackIndex);
  const setIsPlaying = useAudioStore((state) => state.setIsPlaying);

  useEffect(() => {
    playlistApi.getPlaylistDetail(playlistId!).then((res: any) => {
      console.log(res);
      const playlistData: PlaylistInfoDetail = res.playlist ?? {};
      setPlaylistDetail({
        id: playlistData.id,
        name: playlistData.name,
        tags: [...playlistData.tags],
        coverImgUrl: playlistData.coverImgUrl,
        description: playlistData.description,
        trackCount: playlistData.trackCount,
        playCount: playlistData.playCount,
      });
    });
  }, []);

  useEffect(() => {
    playlistApi.getAllTrack(playlistId!).then((res: AxiosResponse) => {
      // @ts-ignore
      const data = res.songs;
      const songs: RawSongInfo[] = Object.keys(data).map((key) => data[key]);
      setAllSongs(() => {
        return songs.map((song) => {
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
      });
    });
  }, []);

  const addAllSong = () => {
    let allNewTracks: Track[] = [];
    allSongs?.map((song) => {
      allNewTracks.push({ ...song });
    });
    setTracks([...tracks, ...allNewTracks]);
  };

  const playAllSong = () => {
    let allNewTracks: Track[] = [];
    allSongs?.map((song) => {
      allNewTracks.push({ ...song });
    });
    setTracks(allNewTracks);
    setTrackIndex(0);
    setIsPlaying(true);
  };

  return (
    <div className="h-full w-full flex felx-row justify-center bg-gray1 border-y border-gray1">
      <div className="flex flex-col w-content content-center bg-white pt-8 mx-auto border-x border-gray1">
        {playlistDetail ? (
          <div className="info-card w-full h-64 flex px-10 gap-8">
            <SImage
              height="h-56"
              width="w-56"
              className="rounded-md"
              src={playlistDetail.coverImgUrl}
              alt="playlist-cover"
            />
            <div className="playlist-info flex flex-1 flex-col gap-4">
              <div className="title text-2xl w-full line-clamp-1">
                <h2>{playlistDetail.name}</h2>
              </div>
              <div className="btns space-x-1">
                <Button
                  className="btn play px-3 py-1 text-gray-100"
                  onClick={playAllSong}
                >
                  播放
                </Button>
                <Button
                  className="btn rounded-md py-1 px-2 text-gray-100"
                  onClick={addAllSong}
                >
                  +
                </Button>
              </div>
              {playlistDetail.tags ? (
                <div className="tags w-full flex items-center">
                  <p>标签：</p>
                  <div className="flex gap-2">
                    {playlistDetail.tags.map((tag: any) => (
                      <Tag
                        key={tag}
                        content={tag}
                        onClick={() => navigate(`/discover/playlist?cat=${tag}`)}
                      />
                    ))}
                  </div>
                </div>
              ) : null}

              {!!playlistDetail.description && (
                <div className="des w-full">
                  <p
                    className="text-sm text-neutral-800 line-clamp-4"
                    title={playlistDetail.description}
                  >
                    介绍：{playlistDetail.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : null}

        <div className="tracks-list px-10 pb-10">
          <div className="list-header bg-white flex justify-between h-8 min-h-fit mt-10 items-end pb-2 border-b-2 border-red-700">
            <div className="flex items-end mx-2">
              <p className="text-xl text-black">歌曲列表</p>
              <p className="track-count text-gray-500 text-sm mx-4">
                {!!playlistDetail ? playlistDetail.trackCount : ""}
                首歌
              </p>
            </div>
            <div className="play-count flex text-sm items-end mx-2">
              <span>播放：</span>
              <span className="text-red-800">
                {!!playlistDetail ? playlistDetail.playCount : null}次
              </span>
            </div>
          </div>
          <TrackTable
            listItems={["歌曲标题", "歌手", "专辑"]}
            listInfo={allSongs}
          />
        </div>
      </div>
    </div>
  );
};

export default PlaylistDetail;
