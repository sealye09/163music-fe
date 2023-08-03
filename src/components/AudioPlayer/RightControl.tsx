import { FC, useContext, useRef } from "react";
import { BsList, BsVolumeDown, BsVolumeMute } from "react-icons/bs";

import { AudioPlayerContext, AudioPlayerContextProps } from ".";
import VolumeControl from "./VolumeControl";
import Playlist from "./Playlist";

const RightControl: FC = () => {
  // Context
  const { isMuted, isShowVolumeCtr, setIsShowVolumeCtr, isShowPlaylist, setIsShowPlaylist } =
    useContext<AudioPlayerContextProps>(AudioPlayerContext);

  const volumeBtnRef = useRef<HTMLButtonElement>(null);
  const playlistBtnRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <div className="flex gap-1 min-w-fit">
        <button
          title="音量控制"
          ref={volumeBtnRef}
          onClick={() => setIsShowVolumeCtr(!isShowVolumeCtr)}
        >
          {isMuted ? <BsVolumeMute size={28} /> : <BsVolumeDown size={28} />}
        </button>

        <button
          title="播放列表"
          ref={playlistBtnRef}
          onClick={() => setIsShowPlaylist(!isShowPlaylist)}
        >
          <BsList size={28} />
        </button>
      </div>

      {/* 音量控制条 */}
      <VolumeControl ref={volumeBtnRef} />

      {/* 播放列表 */}
      <Playlist ref={playlistBtnRef} />
    </>
  );
};

export default RightControl;
