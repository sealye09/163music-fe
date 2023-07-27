import { FC } from "react";
import { Link } from "react-router-dom";

import { PlaylistInfo } from "@/types";

import "./index.css";

interface Props {
  type: string;
  playlists: Array<PlaylistInfo>;
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
                  className="playlist-cover rounded-lg"
                  src={`${item.coverImgUrl}`}
                />
              </Link>
              <div className="play-bottom relative -top-6 pl-1 rounded-b-md  rounded-t-sm text-white"></div>
            </div>
            <p className="playlist-dec w-28 pt-2">
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
