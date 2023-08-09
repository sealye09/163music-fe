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
  const currentLyricIdx = useMemo(() => {
    for (let i = 0; i < lyric.length; i++) {
      const current = lyric[i];
      const seconds = Number(current.time.split(":")[0]) * 60 + Number(current.time.split(":")[1]);
      const nextSeconds =
        Number(lyric[i + 1]?.time.split(":")[0]) * 60 + Number(lyric[i + 1]?.time.split(":")[1]);

      // 中间歌词
      if (timer >= seconds && timer < nextSeconds) {
        return i;
      }

      // 最后一句歌词
      if (i === lyric.length - 1 && timer >= seconds) {
        return i;
      }

      // 第一句歌词
      if (i === 0 && timer < seconds) {
        return 0;
      }
    }

    // 歌词为空
    return lyric.length - 1;
  }, [lyric, timer]);

  // 滚动到当前歌词
  useEffect(() => {
    if (!currentLyricIdx || !ulRef.current) return;
    const scrollELe = ulRef.current.parentElement;
    const currentLi = ulRef.current.children[currentLyricIdx] as HTMLLIElement;
    if (!currentLi || !scrollELe) return;
    console.log(currentLi.textContent);

    const offsetTop = currentLi.offsetTop;
    const scrollHeight = scrollELe.getBoundingClientRect().height;

    scrollELe.scrollTo({
      behavior: "smooth",
      top: offsetTop - scrollHeight,
    });
  }, [currentLyricIdx]);

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
                  currentLyricIdx === idx
                    ? "text-2xl py-4 text-red-700 bg-gray-300/50 font-bold"
                    : currentLyricIdx === idx - 2 ||
                      currentLyricIdx === idx - 1 ||
                      currentLyricIdx === idx + 1
                    ? "text-lg py-3 font-bold opacity-90 bg-gray-300/10"
                    : "text-gray-400 blur-[1px]"
                )}
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

export default RollingLyric;
