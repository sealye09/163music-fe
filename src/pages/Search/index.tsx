import { FC, useEffect, useState } from "react";

import { PlaylistInfo, Track } from "@/types";
import { searchApi } from "@/service";
import TrackTable from "@/components/TrackTable";
import Grid from "@/components/Grid";
import Pagination from "@/components/Pagination";

import "./index.css";
import { useSearchParams } from "react-router-dom";

interface AlbumInfo extends PlaylistInfo {}
interface ArtistInfo extends PlaylistInfo {}

// 搜索类型 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单
type SearchType = 1 | 10 | 100 | 1000;

const Search: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const keywords = searchParams.get("keywords") || "";
  const type = (Number(searchParams.get("type")) || 1) as SearchType;
  const page = Number(searchParams.get("page")) || 1;

  const [songResult, setsongResult] = useState<Track[]>([]);
  const [albumResult, setAlbumResult] = useState<AlbumInfo[]>([]);
  const [artistResult, setArtistResult] = useState<ArtistInfo[]>([]);
  const [playlistResult, setPlaylistResult] = useState<PlaylistInfo[]>([]);

  const pageSize: number = 30;

  const searchAction = () => {
    console.log("search", keywords);
    searchApi.getSearchResult(keywords, 30, (page - 1) * pageSize, type).then((res) => {
      switch (type) {
        case 1:
          // @ts-ignore
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
          // @ts-ignore
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
          // @ts-ignore
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
          // @ts-ignore
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
    setSearchParams({ type: type.toString() });
  };

  return (
    <div
      className="w-full flex justify-center"
      style={{
        background: "#f5f5f5",
      }}
    >
      <div
        className="bg-white flex flex-col justify-center px-12"
        style={{
          width: "980px",
        }}
      >
        <div className="search-bar py-12 flex justify-center">
          <input
            className="border w-80 h-9 rounded-l-2xl"
            placeholder="搜索歌曲/歌手"
            onChange={(e) => {
              console.log(e.target.value);
              // setKeywords(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchAction();
              }
            }}
          />
          <button
            className="border w-14 h-9 rounded-r-2xl text-sm"
            onClick={searchAction}
          >
            搜索
          </button>
        </div>

        <div
          className="mb-6 flex items-center w-full h-12"
          style={{
            backgroundColor: "#f7f7f7",
            border: "1px #d5d5d5 solid",
          }}
        >
          <button
            className={`btn-search min-w-fit h-12 pt-3 px-6 hover:bg-white hover:border-t-1 ${
              type == 1 ? "btn-active" : ""
            }`}
            onClick={() => handleTypeChange(1)}
          >
            单曲
          </button>
          <button
            className={`btn-search min-w-fit h-12 pt-3 px-6 hover:bg-white hover:border-t-1 ${
              type == 10 ? "btn-active" : ""
            }`}
            onClick={() => handleTypeChange(10)}
          >
            专辑
          </button>
          <button
            className={`btn-search min-w-fit h-12 pt-3 px-6 hover:bg-white hover:border-t-1 ${
              type == 100 ? "btn-active" : ""
            }`}
            onClick={() => handleTypeChange(100)}
          >
            歌手
          </button>
          <button
            className={`btn-search min-w-fit h-12 pt-3 px-6 hover:bg-white hover:border-t-1 ${
              type == 1000 ? "btn-active" : ""
            }`}
            onClick={() => handleTypeChange(1000)}
          >
            歌单
          </button>
        </div>
        {songResult.length !== 0 && type === 1 ? (
          <div>
            <TrackTable
              listItems={["歌曲标题", "歌手", "专辑"]}
              listInfo={songResult}
            />
          </div>
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
          <div className="h-80"></div>
        )}

        <div className="py-10">
          <Pagination
            currPage={page}
            totalPage={10}
            // setPage={setPage}
            setPage={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
