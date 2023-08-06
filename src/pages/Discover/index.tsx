import { FC, useEffect, useState } from "react";

import { playlistApi, albumApi } from "@/service";
import { Tag, PlaylistInfo } from "@/types";
import GridHeader from "@/components/GridHeader";
import Banners from "@/components/Banners";
import Grid from "@/components/Grid";
import GridSkeleton from "@/components/Skeleton/GridSkeleton";

type PlaylistInfoWithType = PlaylistInfo & {
  type: number;
};

type AlbumInfo = PlaylistInfoWithType & {
  blurPicUrl: string;
};

// 推荐页包含组件（轮播图、热门推荐、新碟上架、榜单）

const Discover: FC = () => {
  const [recommend, setRecommend] = useState<PlaylistInfoWithType[]>();
  const [newAlbums, setNewAlbums] = useState<AlbumInfo[]>();
  const [tags, setTags] = useState<Tag[]>();

  useEffect(() => {
    let isUnmounted = false;
    if (isUnmounted) return;
    // 获取推荐类别
    playlistApi.getHotCatlist().then((res) => {
      setTags(
        // @ts-ignore
        res.tags.map((item) => {
          return {
            id: item.id,
            name: item.name,
            target: `/discover/playlist/?cat=${item.name}`,
          };
        })
      );
    });

    // 获取推荐
    playlistApi.getRecommendPlaylist(10).then((res) => {
      setRecommend(
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
      console.log("🚀 ~ file: index.tsx:42 ~ playlistApi.getRecommendPlaylist ~ res:", res);

      setNewAlbums(
        // @ts-ignore
        res.albums.map((item) => {
          return {
            id: item.id,
            name: item.name,
            coverImgUrl: item.picUrl,
            blurPicUrl: item.blurPicUrl,
          };
        })
      );
    });

    return () => {
      isUnmounted = true;
    };
  }, []);

  return (
    <>
      <Banners />
      <div className="h-auto w-full bg-gray1 border-y border-gray1">
        <div className="mx-auto w-content pt-10 bg-white border-x border-gray1 flex flex-col justify-cente items-center h-auto min-w-fit">
          <div className="h-auto w-full">
            {tags ? (
              <GridHeader
                headline={{
                  title: "热门推荐",
                  target: "/discover/playlist/",
                }}
                tags={tags}
                hasMoreTag={true}
              />
            ) : (
              <GridHeader
                headline={{
                  title: "热门推荐",
                  target: "/discover/playlist/",
                }}
                hasMoreTag={true}
              />
            )}
            {recommend ? (
              <Grid
                playlists={recommend}
                type="playlist"
              />
            ) : (
              <GridSkeleton
                rows={2}
                columns={5}
              />
            )}
          </div>
          <div className="h-auto w-full">
            <GridHeader
              headline={{
                title: "新碟上架",
                target: "/discover/album/",
              }}
              hasMoreTag={true}
            />
            {newAlbums ? (
              <Grid
                playlists={newAlbums.slice(0, 10)}
                type="album"
              />
            ) : (
              <GridSkeleton
                rows={2}
                columns={5}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Discover;
