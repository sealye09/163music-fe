import { FC, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { AlbumInfo } from "@/types";
import { albumApi } from "@/service";
import GridHeader from "@/components/GridHeader";
import Pagination from "@/components/Pagination";
import Grid from "@/components/Grid";
import GridSkeleton from "@/components/Skeleton/GridSkeleton";

const TAGS = [
  {
    id: 0,
    name: "全部",
    query: "ALL",
    target: "?area=ALL",
  },
  {
    id: 1,
    name: "中国",
    query: "ZH",
    target: "?area=ZH",
  },
  {
    id: 2,
    name: "欧美",
    query: "EA",
    target: "?area=EA",
  },
  {
    id: 3,
    name: "韩国",
    query: "KR",
    target: "?area=KR",
  },
  {
    id: 4,
    name: "日本",
    query: "JP",
    target: "?area=JP",
  },
];

const Album: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [newAlbums, setNewAlbums] = useState<AlbumInfo[]>();
  const [allAlbums, setAllAlbums] = useState<AlbumInfo[]>();
  const [totalAlbums, setTotalAlbums] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const page = Number(searchParams.get("page") || "1");
  const area = searchParams.get("area") || "ALL";
  const pageSize: number = 35;

  // 热门新碟
  useEffect(() => {
    let isUnmounted = false;
    if (isUnmounted) return;

    albumApi.getNewAlbums().then((res) => {
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

  // 全部新碟
  useEffect(() => {
    let isUnmounted = false;
    if (isUnmounted) return;

    setLoading(true);
    albumApi.getAllNewAlbum(area, pageSize, (page - 1) * pageSize).then((res) => {
      // @ts-ignore
      setTotalAlbums(res.total);
      setAllAlbums(
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
      setLoading(false);
    });

    return () => {
      isUnmounted = true;
    };
  }, [area, page, pageSize]);

  return (
    <div className="w-full flex justify-center bg-gray1 border-y border-gray1">
      <div className="bg-white w-content border-x border-gray1">
        <div className="py-10">
          <div className="h-auto w-full">
            <GridHeader
              headline={{
                title: "热门新碟",
                target: "",
              }}
              hasMoreTag={false}
            />
            {newAlbums ? (
              <Grid
                playlists={newAlbums!.slice(0, 10)}
                type="album"
              />
            ) : (
              <GridSkeleton />
            )}
          </div>

          <div className="h-auto w-full">
            <GridHeader
              headline={{
                title: "全部新碟",
                target: "",
              }}
              tags={TAGS}
              hasMoreTag={false}
            />
            {allAlbums && !loading ? (
              <Grid
                playlists={allAlbums}
                type="album"
              />
            ) : (
              <GridSkeleton rows={7} />
            )}
          </div>
          {!!page && totalAlbums > pageSize && (
            <Pagination
              currPage={page}
              totalPage={Math.ceil(totalAlbums / pageSize)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Album;
