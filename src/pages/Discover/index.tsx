import { FC, lazy, useEffect, useState } from "react";

import { playlistApi, albumApi } from "@/service";
import { Tag, PlaylistInfo } from "@/types";
import GridHeader from "@/components/GridHeader";
import Banner from "@/components/Banner";
import Grid from "@/components/Grid";

interface PlaylistInfoWithType extends PlaylistInfo {
  type: number;
}

type AlbumInfo = PlaylistInfoWithType;

// 推荐页包含组件（轮播图、热门推荐、新碟上架、榜单）

const Discover: FC = () => {
  const playlistTags: Tag[] = [
    {
      id: 0,
      title: "华语",
      target: "/discover/playlist/?cat=%E5%8D%8E%E8%AF%AD",
    },
    {
      id: 1,
      title: "流行",
      target: "/discover/playlist/?cat=%E6%B5%81%E8%A1%8C",
    },
    {
      id: 2,
      title: "摇滚",
      target: "/discover/playlist/?cat=%E6%91%87%E6%BB%9A",
    },
    {
      id: 3,
      title: "民谣",
      target: "/discover/playlist/?cat=%E6%B0%91%E8%B0%A3",
    },
    {
      id: 4,
      title: "电子",
      target: "/discover/playlist/?cat=%E7%94%B5%E5%AD%90",
    },
    {
      id: 5,
      title: "古典",
      target: "/discover/playlist/?cat=%E5%8F%A4%E5%85%B8",
    },
    {
      id: 6,
      title: "金属",
      target: "/discover/playlist/?cat=%E9%87%91%E5%B1%9E",
    },
    {
      id: 7,
      title: "说唱",
      target: "/discover/playlist/?cat=%E8%AF%B4%E5%94%B1",
    },
  ];

  const [playlistRec, setPlaylistRec] = useState<PlaylistInfoWithType[]>([]);
  const [newAlbums, setNewAlbums] = useState<AlbumInfo[]>([]);

  useEffect(() => {
    // 获取推荐
    playlistApi.getRecommendPlaylist(10).then((res) => {
      setPlaylistRec(
        // @ts-ignore
        res.result.map((item) => {
          return {
            id: item.id,
            name: item.name,
            coverImgUrl: item.picUrl,
          };
        })
      );
    });
    // 获取新碟
    albumApi.getNewAlbums().then((res) => {
      if ("albums" in res) {
        setNewAlbums(
          // @ts-ignore
          res.albums.map((item) => {
            return {
              id: item.id,
              name: item.name,
              coverImgUrl: item.picUrl,
            };
          })
        );
      }
    });
  }, []);

  return (
    <>
      <Banner />
      <div className="h-auto w-full">
        <div
          className="mx-auto w-[864px] bg-[#f5f5f5] border border-[#d5d5d5] border-y-0
          flex flex-col justify-cente items-center h-auto min-w-fit"
        >
          <div className="h-auto w-full py-6 bg-white">
            <GridHeader
              headline={{
                title: "热门推荐",
                target: "/discover/playlist/",
              }}
              tags={playlistTags}
              hasMoreTag={true}
            />
            {!!playlistRec && (
              <Grid
                playlists={playlistRec}
                type="playlist"
              />
            )}
          </div>
          <div className="h-auto w-full py-6 bg-white">
            <GridHeader
              headline={{
                title: "新碟上架",
                target: "/discover/album/",
              }}
              hasMoreTag={true}
            />
            {!!newAlbums && (
              <Grid
                playlists={newAlbums.slice(0, 10)}
                type="album"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Discover;
