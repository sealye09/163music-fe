import { FC } from "react";
import { Link } from "react-router-dom";

import SImage from "./Image";
import LazyLoad from "./LazyLoad";

type AlbumInfo = {
  id: number | string;
  name: string;
  coverImgUrl: string;
  blurPicUrl?: string;
};

interface Props {
  type: string;
  playlists: AlbumInfo[];
  handleClick?: Function;
}

const Grid: FC<Props> = ({ playlists, type, handleClick }) => {
  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-5 grid-rows-2 pb-6 pt-10">
        {playlists.map((item) => (
          <div
            key={item.id}
            className="transition duration-500 hover:scale-105 playlist-item grid justify-evenly h-52 content-start"
          >
            <div className="h-32 w-32">
              <Link
                title={item.name}
                to={`/${type}/${item.id}`}
                data-res-id={item.id}
                onClick={() => {
                  if (typeof handleClick === "function") {
                    handleClick();
                  }
                }}
              >
                <LazyLoad>
                  <SImage
                    height="h-32"
                    width="w-32"
                    className="rounded-lg"
                    src={item.coverImgUrl}
                    alt={item.name}
                  />
                </LazyLoad>
              </Link>
            </div>
            <p className="w-28 pt-2 text-sm line-clamp-2 hover:text-red-600 hover:underline">
              <Link
                title={item.name}
                to={`/${type}/${item.id}`}
                data-res-id={item.id}
              >
                {item.name}
              </Link>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grid;
