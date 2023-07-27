import { FC } from "react";

import Grid from "@/components/Grid";
import PageSelector from "@/components/PageSelector";
import { PlaylistInfo } from "@/types";

interface Props {
  albums: PlaylistInfo[];
  page: number;
  pageSize: number;
  setPage: Function;
  albumSize: number;
}

const ArtistAlbum: FC<Props> = ({ albums, page, pageSize, setPage, albumSize }) => {
  return (
    <div>
      <Grid
        type={"album"}
        playlists={albums}
      />
      <div className="pt-10">
        {albumSize !== 0 && (
          <PageSelector
            currPage={page}
            totalPage={Math.floor(albumSize / pageSize) + 1}
            setPage={setPage}
          />
        )}
      </div>
    </div>
  );
};

export default ArtistAlbum;
