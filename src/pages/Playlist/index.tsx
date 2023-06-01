import { FC, useEffect, useState } from "react";
import Grid, { PlaylistInfo } from "../../components/Grid";
import GridHeader from "../../components/GridHeader";
import PageSelector from "../../components/PageSelector";

import { getPlaylist } from "../../service";

import "./index.css";

interface Props {}

const Playlist: FC<Props> = ({}) => {
  const [playlistInfo, setPlaylistInfo] = useState<Array<PlaylistInfo>>();
  const [page, setPage] = useState<number>(1);
  const [cat, setCat] = useState("all");
  const [order, setorder] = useState<string>("hot");
  const pageSize: number = 35;

  useEffect(() => {
    getPlaylist(order, cat, pageSize, pageSize * (page - 1)).then((res) => {
      setPlaylistInfo(
        // @ts-ignore
        res.playlists.map((item) => {
          return {
            name: item.name,
            id: item.id,
            picUrl: item.coverImgUrl,
          };
        }),
      );
      console.log(playlistInfo);
    });
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
        {!!playlistInfo ? (
          <Grid
            type={"playlist"}
            playlists={playlistInfo}
          />
        ) : (
          <></>
        )}
        <PageSelector
          currPage={page}
          totalPage={20}
          setPage={setPage}
        />
      </div>
    </div>
  );
};

export default Playlist;
