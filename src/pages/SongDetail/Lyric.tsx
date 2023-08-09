import { FC } from "react";

import { TLyric } from ".";

interface LyricProps {
  lyric: TLyric[];
}

const Lyric: FC<LyricProps> = ({ lyric }) => {
  return (
    <div className="min-h-[500px] overflow-y-auto border-t-4 flex flex-col justify-center items-center py-10">
      <ul className="min-h-[500px] h-[500px] w-full py-12">
        <li className="h-1/5"></li>

        {!!lyric &&
          lyric.length !== 0 &&
          lyric.map((item, idx) => {
            return (
              <li
                key={idx}
                className="w-full py-2 px-16 flex flex-col justify-center items-center text-gray-800 opacity-80 text-center"
              >
                <span>{item.lyric}</span>
                {item.tlyric === "" ? null : <span> {item.tlyric}</span>}
              </li>
            );
          })}
        <li className="h-4/5"></li>
      </ul>
    </div>
  );
};

export default Lyric;
