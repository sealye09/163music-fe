import { FC, useEffect, useState } from "react";

import { PlaylistInfo } from "@/types";
import { playlistApi } from "@/service";
import Grid from "@/components/Grid";
import GridHeader from "@/components/GridHeader";
import Pagination from "@/components/Pagination";
import { useSearchParams } from "react-router-dom";

const Playlist: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [playlistInfo, setPlaylistInfo] = useState<PlaylistInfo[]>([]);
  const [page, setPage] = useState<number>(1);
  const pageSize: number = 35;

  useEffect(() => {
    let isUnmounted = false;
    if (isUnmounted) return;

    const order = searchParams.get("order") || "hot";
    const cat = searchParams.get("cat") || "全部";
    playlistApi.getPlaylist(order, cat, pageSize, pageSize * (page - 1)).then((res) => {
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
      console.log(playlistInfo);
    });

    return () => {
      isUnmounted = true;
    };
  }, [page]);

  return (
    <div
      className="flex justify-center"
      style={{ backgroundColor: "#F5F5F5" }}
    >
      <div
        className="bg-white pt-10 pb-28 min-w-fit"
        style={{
          width: "864px",
        }}
      >
        <GridHeader
          headline={{
            title: "全部",
            target: "",
          }}
          hasMoreTag={false}
        />
        {!!playlistInfo && (
          <Grid
            type={"playlist"}
            playlists={playlistInfo}
          />
        )}
        <Pagination
          currPage={page}
          totalPage={20}
          setPage={setPage}
        />
      </div>
    </div>
  );
};

export default Playlist;
