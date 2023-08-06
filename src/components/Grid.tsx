import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-5 grid-rows-2 pb-6 pt-10">
        {playlists.map((item, idx) => (
          <div
            key={idx}
            className="transition duration-300 grid justify-evenly h-52 content-start hover:opacity-[0.85]"
          >
            <Link
              className="w-32 h-32"
              title={item.name}
              to={`/${type}/${item.id}`}
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
                <span className="w-28 pt-2 text-sm text-stone-800 line-clamp-2 hover:text-red-600 hover:underline">
                  {item.name}
                </span>
              </LazyLoad>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grid;
