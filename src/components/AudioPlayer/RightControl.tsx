import { FC } from "react";
import { BsList, BsVolumeDown, BsVolumeMute } from "react-icons/bs";

interface RightControlProps {
  isMuted: boolean;
  handleShowVolumeCtr: () => void;
  handleShowPlaylist: () => void;
}

const RightControl: FC<RightControlProps> = ({
  handleShowPlaylist,
  handleShowVolumeCtr,
  isMuted,
}) => {
  return (
    <div className="flex gap-1 min-w-fit">
      <button
        title="音量控制"
        onClick={handleShowVolumeCtr}
      >
        {isMuted ? <BsVolumeMute size={28} /> : <BsVolumeDown size={28} />}
      </button>

      <button
        title="播放列表"
        onClick={handleShowPlaylist}
      >
        <BsList size={28} />
      </button>
    </div>
  );
};

export default RightControl;
