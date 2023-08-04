import { FC, useEffect, useState } from "react";

import Grid from "@/components/Grid";
import Pagination from "@/components/Pagination";
import { PlaylistInfo } from "@/types";
import { artistApi } from "@/service";

interface Props {
  artistId: string;
  totalAlbums: number;
}

const Albums: FC<Props> = ({ artistId, totalAlbums }) => {
  const [albums, setAlbums] = useState<PlaylistInfo[]>([]);
  const [page, setPage] = useState<number>(1);

  const pageSize = 30;
  // albums
  useEffect(() => {
    let isUnmounted = false;
    if (isUnmounted) return;
    artistApi.getArtistAlbums(artistId!, pageSize, (page - 1) * pageSize).then((res) => {
      // @ts-ignore
      const data = res.hotAlbums;
      console.log("albums", res);

      setAlbums(() =>
        data.map((album: any) => {
          return {
            id: album.id,
            name: album.name,
            coverImgUrl: album.picUrl,
          };
        })
      );
    });

    return () => {
      isUnmounted = true;
    };
  }, [artistId, page]);
  return (
    <div>
      <Grid
        type={"album"}
        playlists={albums}
      />
      <div className="pt-10">
        {totalAlbums > pageSize && (
          <Pagination
            currPage={page}
            totalPage={Math.floor(totalAlbums / pageSize) + 1}
            setPage={setPage}
          />
        )}
      </div>
    </div>
  );
};

export default Albums;
