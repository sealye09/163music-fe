import { FC, useRef, useState } from "react";
import { BsList, BsVolumeDown, BsVolumeMute } from "react-icons/bs";

import { useAudioStore } from "@/stores/useAudioStore";
import { useClickOutside } from "@/hooks/useClickOutside";

import VolumeControl from "./VolumeControl";
import Playlist from "./Playlist";

const RightControl: FC = () => {
  const volume = useAudioStore((state) => state.volume);

  const volumeCtrRef = useRef<HTMLDivElement>(null);
  const playlistRef = useRef<HTMLDivElement>(null);

  const [isShowVolumeCtr, setIsShowVolumeCtr] = useState(false);
  const [isShowPlaylist, setIsShowPlaylist] = useState(false);

  const toggleVolumeCtr = () => {
    console.log("click btn volume", isShowVolumeCtr);
    setIsShowVolumeCtr(!isShowVolumeCtr);
  };

  const togglePlaylist = () => {
    console.log("click btn playlist", isShowPlaylist);
    setIsShowPlaylist(!isShowPlaylist);
  };

  useClickOutside(volumeCtrRef, () => setIsShowVolumeCtr(false));

  useClickOutside(playlistRef, () => setIsShowPlaylist(false));

  return (
    <>
      <div className="flex gap-1 min-w-fit">
        <button
          title="音量控制"
          onClick={toggleVolumeCtr}
        >
          {volume <= 0 ? <BsVolumeMute size={28} /> : <BsVolumeDown size={28} />}
        </button>

        <button
          title="播放列表"
          onClick={togglePlaylist}
        >
          <BsList size={28} />
        </button>
      </div>

      {/* 音量控制条 */}
      <VolumeControl
        className={`${isShowVolumeCtr ? "block" : "hidden"}`}
        ref={volumeCtrRef}
      />

      {/* 播放列表 */}
      <Playlist
        className={`${isShowPlaylist ? "block" : "hidden"}`}
        ref={playlistRef}
      />
    </>
  );
};

export default RightControl;
