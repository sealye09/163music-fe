import { FC, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { PlaylistInfo } from "@/types";
import { playlistApi } from "@/service";
import Grid from "@/components/Grid";
import GridSkeleton from "@/components/Skeleton/GridSkeleton";
import GridHeader from "@/components/GridHeader";
import Pagination from "@/components/Pagination";

const Playlist: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [playlistInfo, setPlaylistInfo] = useState<PlaylistInfo[]>();
  const [total, setTotal] = useState<number>();
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const page = Number(searchParams.get("page") || "1");
  const cat = searchParams.get("cat") || "全部";
  const order = searchParams.get("order") || "hot";

  const pageSize: number = 35;

  useEffect(() => {
    let isUnmounted = false;
    setLoading(true);

    if (isUnmounted) return;

    playlistApi.getPlaylist(order, cat, pageSize, pageSize * (page - 1)).then((res) => {
      console.log("playlist", res);
      if ("total" in res && Boolean(res.total)) {
        setTotal(res.total as number);
      }

      if ("more" in res && Boolean(res.more)) {
        setHasMore(res.more as boolean);
      }

      if ("playlists" in res && Boolean(res.playlists)) {
        setPlaylistInfo(
          // @ts-ignore
          res.playlists.map((item) => {
            return {
              name: item.name,
              id: item.id,
              coverImgUrl: item.coverImgUrl,
            };
          })
        );
      }

      setLoading(false);
    });

    return () => {
      isUnmounted = true;
    };
  }, [page]);

  return (
    <div className="flex justify-center bg-gray1">
      <div className="bg-white min-w-fit w-content border-x border-gray1">
        <div className="py-10">
          <GridHeader
            headline={{
              title: "全部",
              target: "",
            }}
            hasMoreTag={false}
          />
          {playlistInfo && !loading ? (
            <Grid
              type={"playlist"}
              playlists={playlistInfo}
            />
          ) : (
            <GridSkeleton
              rows={7}
              columns={5}
            />
          )}
          {page && total && total > pageSize && (
            <Pagination
              currPage={page}
              totalPage={Math.ceil(total / pageSize)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Playlist;
