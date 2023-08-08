import { FC, useEffect, useMemo, useRef } from "react";
import { twMerge } from "tailwind-merge";

import useAudioStore from "@/stores/useAudioStore";

import { TLyric } from ".";

interface RollingLyricProps {
  lyric: TLyric[];
}

const RollingLyric: FC<RollingLyricProps> = ({ lyric }) => {
  const timer = useAudioStore((state) => state.timer);
  const ulRef = useRef<HTMLUListElement>(null);

  // 当前展示的歌词
  const currentLyric = useMemo(() => {
    for (let i = 0; i < lyric.length; i++) {
      const current = lyric[i];
      const seconds = Number(current.time.split(":")[0]) * 60 + Number(current.time.split(":")[1]);
      if (seconds > timer) {
        return {
          ...current,
          idx: i,
        };
      }
    }

    return {
      ...lyric[lyric.length - 1],
      idx: lyric.length - 1,
    };
  }, [lyric, timer]);

  // 滚动到当前歌词
  useEffect(() => {
    if (!currentLyric || !ulRef.current) return;
    const scrollELe = ulRef.current.parentElement;
    const currentLi = ulRef.current.children[currentLyric.idx + 1] as HTMLLIElement;
    if (!currentLi || !scrollELe) return;

    const offsetTop = currentLi.offsetTop;
    const scrollHeight = scrollELe.getBoundingClientRect().height;

    scrollELe.scrollTo({
      behavior: "smooth",
      top: offsetTop - scrollHeight,
    });
  }, [currentLyric.idx]);

  return (
    <div className="min-h-[500px] overflow-y-auto border-t-4 flex flex-col justify-center items-center py-10">
      <ul
        ref={ulRef}
        className="min-h-[500px] h-[500px] w-full py-12"
      >
        <li className="h-1/5"></li>

        {!!lyric &&
          lyric.length !== 0 &&
          lyric.map((item, idx) => {
            return (
              <li
                key={idx}
                className={twMerge(
                  `w-full py-2 px-16 
                flex flex-col justify-center items-center
                text-gray-800 opacity-80 text-center
                transition-all duration-500`,
                  currentLyric.idx === idx
                    ? "text-2xl py-4 text-red-700 bg-gray-300/50 font-bold"
                    : currentLyric.idx === idx - 2 ||
                      currentLyric.idx === idx - 1 ||
                      currentLyric.idx === idx + 1
                    ? "text-lg py-3 font-bold opacity-90 bg-gray-300/10"
                    : "text-gray-400 blur-[1px]"
                )}
              >
                <span>{item.lyric}</span>
                {item.tlyric && <span> {item.tlyric}</span>}
              </li>
            );
          })}
        <li className="h-4/5"></li>
      </ul>
    </div>
  );
};

export default RollingLyric;
