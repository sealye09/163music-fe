import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { setVolume, useAudioStore } from "@/stores/useAudioStore";

import styles from "./index.module.css";

const VolumeControl = forwardRef<
  HTMLDivElement,
  {
    className?: string;
  }
>(({ className }, ref) => {
  const volume = useAudioStore((state) => state.volume);

  const volumeStyling = `-webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${
    volume / 100
  }, #C60C0C), color-stop(${volume / 100}, rgba(19,19,19,0.7)))`;

  return (
    <div
      ref={ref}
      className={twMerge(
        "absolute flex justify-center items-center bottom-16 min-w-fit h-8 bg-black px-3 py-auto translate-x-[756px] translate-y-[-44px] rotate-[-90deg]",
        className
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
