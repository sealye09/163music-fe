import { FC, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AxiosResponse } from "axios";

import { PlaylistInfoDetail, RawSongInfo, Track } from "@/types";
import { playlistApi } from "@/service";
import TrackList from "@/components/TrackList";
import useTrackStore from "@/stores/useTrackStore";

import "./index.css";

interface Props {}

const PlaylistDetail: FC<Props> = ({}) => {
  const { playlistId } = useParams();
  const [playlistDetail, setPlaylistDetail] = useState<PlaylistInfoDetail>();
  const [allSongs, setAllSongs] = useState<Track[]>([]);

  const tracks = useTrackStore((state) => state.tracks);
  const setTracks = useTrackStore((state) => state.setTracks);
  const setTrackIndex = useTrackStore((state) => state.setTrackIndex);

  useEffect(() => {
    playlistApi.getPlaylistDetail(playlistId!).then((res: AxiosResponse) => {
      const playlistData: PlaylistInfoDetail = (
        "playlist" in res ? res.playlist : {}
      ) as PlaylistInfoDetail;
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
      console.log(allSongs);
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
  };

  return (
    <div className="playlist-detail flex felx-row justify-center">
      <div className="info flex flex-col content-center bg-white pt-8">
        {!!playlistDetail && (
          <div className="info-card flex px-10 pb-4 justify-around">
            <div className="img">
              <img
                className="rounded-md w-56 h-56"
                src={`${playlistDetail.coverImgUrl}`}
              />
            </div>
            <div className="playlist-info w-2/3 flex-col justify-end">
              <div className="title text-xl pb-4 w-full">
                <p>{playlistDetail!.name}</p>
              </div>
              <div className="btns text-sm pb-4">
                <button
                  style={{
                    backgroundColor: "#2B659E",
                  }}
                  className="btn play text-white px-3 py-1 rounded-md"
                  onClick={playAllSong}
                >
                  播放
                </button>
                <button
                  style={{
                    backgroundColor: "#2B659E",
                  }}
                  className="btn rounded-md py-1 px-2 text-white"
                  onClick={addAllSong}
                >
                  +
                </button>
              </div>
              <div className="tags pb-3 flex w-full">
                {!!playlistDetail.tags && <p>标签：</p>}
                {!!playlistDetail.tags &&
                  playlistDetail.tags.map((tag: any) => (
                    <div
                      key={tag}
                      className="tag-btn rounded-lg bg-gray-300 min-w-fit w-14 mr-3 flex justify-center px-2"
                    >
                      {tag}
                    </div>
                  ))}
              </div>
              {!!playlistDetail.description && (
                <div className="des pb-3 w-full">
                  <p className="ply-description">介绍：{playlistDetail!.description}</p>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="tracks-list px-10 pb-10">
          <div
            className="list-header bg-white flex justify-between h-8 min-h-fit mt-10 items-end pb-2"
            style={{
              borderBottom: "2px solid #c20c0c",
            }}
          >
            <div className="flex items-end mx-2">
              <p className="text-xl text-black">歌曲列表</p>
              <p className="track-count text-gray-500 text-sm mx-4">
                {!!playlistDetail ? playlistDetail.trackCount : ""}
                首歌
              </p>
            </div>
            <div className="play-count flex text-sm items-end mx-2">
              播放：
              <p className="text-red-800">{!!playlistDetail ? playlistDetail.playCount : ""}次</p>
            </div>
          </div>
          <TrackList
            listItems={["歌曲标题", "歌手", "专辑"]}
            listInfo={allSongs!}
          />
        </div>
      </div>
    </div>
  );
};

export default PlaylistDetail;
