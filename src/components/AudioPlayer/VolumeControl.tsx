import { forwardRef, useContext, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

import useAudioStore from "@/stores/useAudioStore";
import { AudioPlayerContextProps, AudioPlayerContext } from ".";
import styles from "./index.module.css";

const VolumeControl = forwardRef<HTMLButtonElement>(({}, volumeBtnRef) => {
  const volume = useAudioStore((state) => state.volume);
  const setVolume = useAudioStore((state) => state.setVolume);

  // Context
  const { isShowVolumeCtr, setIsShowVolumeCtr } =
    useContext<AudioPlayerContextProps>(AudioPlayerContext);

  const modalRef = useRef<HTMLDivElement>(null);

  const volumeStyling = `-webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${
    volume / 100
  }, #C60C0C), color-stop(${volume / 100}, rgba(19,19,19,0.7)))`;

  useEffect(() => {
    const handleClickOutside: EventListener = (event: Event) => {
      if (!volumeBtnRef || !modalRef.current) return;

      if ("current" in volumeBtnRef) {
        if (volumeBtnRef.current && volumeBtnRef.current.contains(event.target as Node)) {
          return;
        }
      }

      if (modalRef.current.contains(event.target as Node)) return;

      if (modalRef.current) {
        setIsShowVolumeCtr(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={modalRef}
      className={twMerge(
        "absolute flex justify-center items-center bottom-16 min-w-fit h-8 bg-black px-3 py-auto translate-x-[740px] translate-y-[-44px] rotate-[-90deg]",
        isShowVolumeCtr ? "" : "hidden"
      )}
    >
      <input
        type="range"
        className={styles.progress_ctr}
        style={{
          background: volumeStyling,
        }}
        onChange={(event) => {
          setVolume(parseInt(event.target.value));
        }}
        value={volume}
      />
    </div>
  );
});

export default VolumeControl;
