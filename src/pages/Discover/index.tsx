import { FC, useEffect, useState } from "react";

import { playlistApi, albumApi } from "@/service";
import { Tag, PlaylistInfo } from "@/types";
import GridHeader from "@/components/GridHeader";
import Banners from "@/components/Banners";
import Grid from "@/components/Grid";

interface PlaylistInfoWithType extends PlaylistInfo {
  type: number;
}

type AlbumInfo = PlaylistInfoWithType;

// 推荐页包含组件（轮播图、热门推荐、新碟上架、榜单）

const Discover: FC = () => {
  const [playlistRec, setPlaylistRec] = useState<PlaylistInfoWithType[]>([]);
  const [newAlbums, setNewAlbums] = useState<AlbumInfo[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    let isUnmounted = false;
    if (isUnmounted) return;
    // 获取推荐类别
    playlistApi.getHotCatlist().then((res) => {
      setTags(() => {
        return [
          // @ts-ignore
          ...res.tags.map((item) => {
            return {
              id: item.id,
              name: item.name,
              target: `/discover/playlist/?cat=${item.name}`,
            };
          }),
        ];
      });
    });
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

    return () => {
      isUnmounted = true;
    };
  }, []);

  return (
    <>
      <Banners />
      <div className="h-auto w-full">
        <div
          className="mx-auto w-[864px] bg-[#f5f5f5] border border-[#d5d5d5] border-y-0
          flex flex-col justify-cente items-center h-auto min-w-fit"
        >
          <div className="h-auto w-full py-6 bg-white">
            {!!tags && (
              <GridHeader
                headline={{
                  title: "热门推荐",
                  target: "/discover/playlist/",
                }}
                tags={tags}
                hasMoreTag={true}
              />
            )}
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
