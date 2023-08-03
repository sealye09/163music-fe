import { FC } from "react";
import { Link } from "react-router-dom";

import { PlaylistInfo } from "@/types";

interface Props {
  type: string;
  playlists: PlaylistInfo[];
  handleClick?: Function;
}

const Grid: FC<Props> = ({ playlists, type, handleClick }) => {
  return (
    <div className="hot-grid h-full">
      <div className="grid grid-cols-5 grid-rows-2 pb-2">
        {playlists.map((item) => (
          <div
            key={item.id}
            className="playlist-item grid justify-evenly pt-6 pb-1 h-auto content-start"
          >
            <div className="u-cover u-cover-1 h-32 w-32">
              <Link
                title={`${item.name}`}
                to={`/${type}/${item.id}`}
                data-res-id={`${item.id}`}
                onClick={() => {
                  if (typeof handleClick === "function") {
                    handleClick();
                  }
                }}
              >
                <img
                  className="rounded-lg"
                  src={`${item.coverImgUrl}`}
                />
              </Link>
            </div>
            <p className="w-28 pt-2 text-sm line-clamp-2 hover:text-red-600 hover:underline">
              <Link
                title={`${item.name}`}
                to={`/${type}/${item.id}`}
                data-res-id={`${item.id}`}
              >
                {`${item.name}`}
              </Link>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grid;