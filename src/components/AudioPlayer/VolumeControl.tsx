import { FC } from "react";

import styles from "./index.module.css";

interface VolumeControlProps {
  volume: number;
  isShowVolumeCtr: boolean;
  isMuted: boolean;
  changeVolume: (e: any) => void;
}

const VolumeControl: FC<VolumeControlProps> = ({
  volume,
  isMuted,
  isShowVolumeCtr,
  changeVolume,
}) => {
  const volumeStyling = `-webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${
    volume / 100
  }, #C60C0C), color-stop(${volume / 100}, rgba(19,19,19,0.7)))`;

  return (
    <div
      tabIndex={0}
      style={{
        display: `${isShowVolumeCtr ? "" : "none"}`,
      }}
      className={`${styles.volume_ctr} absolute bottom-16 min-w-fit h-8 bg-black px-3`}
    >
      <input
        type="range"
        className={`${styles.progress_ctr}`}
        style={{
          background: volumeStyling,
        }}
        onChange={(e) => changeVolume(e)}
        value={isMuted ? 0 : volume}
      />
    </div>
  );
};

export default VolumeControl;
