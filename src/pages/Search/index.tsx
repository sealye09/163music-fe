import { FC, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import { PlaylistInfo, Track } from "@/types";
import { searchApi } from "@/service";
import Pagination from "@/components/Pagination";
import TrackTable from "@/components/TrackTable";
import Grid from "@/components/Grid";

interface AlbumInfo extends PlaylistInfo {}
interface ArtistInfo extends PlaylistInfo {}

// 搜索类型 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单
type SearchType = 1 | 10 | 100 | 1000;

type Tab = {
  id: SearchType;
  name: string;
  query: string;
};

const TabsCofig: Tab[] = [
  {
    id: 1,
    name: "单曲",
    query: "1",
  },
  {
    id: 10,
    name: "专辑",
    query: "10",
  },
  {
    id: 100,
    name: "歌手",
    query: "100",
  },
  {
    id: 1000,
    name: "歌单",
    query: "1000",
  },
];

const Search: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [songResult, setsongResult] = useState<Track[]>([]);
  const [albumResult, setAlbumResult] = useState<AlbumInfo[]>([]);
  const [artistResult, setArtistResult] = useState<ArtistInfo[]>([]);
  const [playlistResult, setPlaylistResult] = useState<PlaylistInfo[]>([]);

  const pageSize: number = 30;
  const page = Number(searchParams.get("page")) || 1;
  const type = Number(searchParams.get("type")) || 1;
  const keywords = searchParams.get("keywords") || "";

  const searchAction = () => {
    console.log("search", keywords, "type", type);

    if (searchParams.has("keywords")) {
      searchParams.set("keywords", keywords);
      setSearchParams(searchParams);
    } else {
      searchParams.append("keywords", keywords);
      setSearchParams(searchParams);
    }

    if (keywords === "") {
      setsongResult([]);
      setAlbumResult([]);
      setArtistResult([]);
      return;
    }

    searchApi.getSearchResult(keywords, 30, (page - 1) * pageSize, type).then((res: any) => {
      console.log(res);
      if (
        res.code !== 200 ||
        res.result.songCount === 0 ||
        res.result.albumCount === 0 ||
        res.result.artistCount === 0 ||
        res.result.playlistCount === 0
      ) {
        setsongResult([]);
        setAlbumResult([]);
        setArtistResult([]);
        return;
      }

      switch (type) {
        case 1:
          const songs = res.result.songs;
          setsongResult(() =>
            songs.map((song: any) => {
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
            })
          );
          break;

        case 10:
          const albums = res.result.albums;
          setAlbumResult(() =>
            albums.map((album: any) => {
              return {
                id: album.id,
                name: album.name,
                coverImgUrl: album.picUrl,
              };
            })
          );
          break;

        case 100:
          const artists = res.result.artists;
          setArtistResult(() =>
            artists.map((artist: any) => {
              return {
                id: artist.id,
                name: artist.name,
                coverImgUrl: artist.img1v1Url,
              };
            })
          );
          break;

        default:
          const playlists = res.result.playlists;
          setPlaylistResult(() =>
            playlists.map((playlist: any) => {
              return {
                id: playlist.id,
                name: playlist.name,
                coverImgUrl: playlist.coverImgUrl,
              };
            })
          );
      }
    });
  };

  const handleTypeChange = (type: SearchType) => {
    searchParams.set("type", type.toString());
    searchParams.set("page", "1");
    searchParams.set("keywords", keywords);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    searchAction();
  }, [page, type]);

  return (
    <div className="w-full flex justify-center bg-gray1">
      <div className="bg-white w-content border border-x-gray1 flex flex-col justify-center px-12">
        <div className="py-10 flex flex-col justify-center items-center gap-10">
          <div className="flex justify-center">
            <input
              className="border w-80 h-9 rounded-l-2xl px-4 indent-2 text-sm focus:outline-0"
              placeholder="搜索歌曲/歌手"
              value={keywords}
              onChange={(e) => {
                console.log(e.target.value);
                searchParams.set("keywords", e.target.value);
                setSearchParams(searchParams);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  searchAction();
                }
              }}
            />
            <button
              className="border w-14 h-9 rounded-r-2xl text-sm bg-gray1 hover:bg-white hover:border-t-1"
              onClick={searchAction}
            >
              搜索
            </button>
          </div>

          <div className="flex flex-col justify-center items-center gap-4 w-full">
            <div className="flex items-center w-full h-12 bg-gray1 border border-gray1">
              {
                // @ts-ignore
                TabsCofig.map((tab) => (
                  <button
                    key={tab.id}
                    className={twMerge(
                      "btn-search min-w-fit h-12 pt-3 px-6 hover:bg-white hover:border-t-2 hover:border-red-700",
                      tab.id === type ? "border-t-2 border-red-700" : ""
                    )}
                    onClick={() => handleTypeChange(tab.id)}
                  >
                    {tab.name}
                  </button>
                ))
              }
            </div>
            <div className="w-full">
              {songResult.length !== 0 && type === 1 ? (
                <TrackTable
                  listItems={["歌曲标题", "歌手", "专辑"]}
                  listInfo={songResult}
                />
              ) : albumResult.length !== 0 && type === 10 ? (
                <Grid
                  type={"album"}
                  playlists={albumResult}
                />
              ) : artistResult.length !== 0 && type === 100 ? (
                <Grid
                  type={"artist"}
                  playlists={artistResult}
                />
              ) : playlistResult.length !== 0 && type === 1000 ? (
                <Grid
                  type={"playlist"}
                  playlists={playlistResult}
                />
              ) : (
                <div className="h-80 flex justify-center items-center animate-pulse">
                  <div className="text-2xl">Loading... </div>
                </div>
              )}
            </div>
          </div>
          <Pagination
            currPage={page}
            totalPage={10}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
