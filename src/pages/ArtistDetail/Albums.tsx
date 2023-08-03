import { FC } from "react";

import Grid from "@/components/Grid";
import Pagination from "@/components/Pagination";
import { PlaylistInfo } from "@/types";

interface Props {
  albums: PlaylistInfo[];
  page: number;
  pageSize: number;
  setPage: Function;
  albumSize: number;
}

const Albums: FC<Props> = ({ albums, page, pageSize, setPage, albumSize }) => {
  return (
    <div>
      <Grid
        type={"album"}
        playlists={albums}
      />
      <div className="pt-10">
        {albumSize !== 0 && (
          <Pagination
            currPage={page}
            totalPage={Math.floor(albumSize / pageSize) + 1}
            setPage={setPage}
          />
        )}
      </div>
    </div>
  );
};

export default Albums;
