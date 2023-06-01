import { FC } from "react";
import { BsPause, BsPlay, BsSkipEnd, BsSkipStart } from "react-icons/bs";

interface LeftControlProps {
  handlePrevTrack: () => void;
  handleNextTrack: () => void;
  toggleAudio: () => void;
  isPlaying: boolean;
}

const LeftControl: FC<LeftControlProps> = ({
  handleNextTrack,
  handlePrevTrack,
  toggleAudio,
  isPlaying,
}) => {
  return (
    <div className="flex min-w-fit gap-1">
      <button
        title="上一首"
        onClick={handlePrevTrack}
      >
        <BsSkipStart size={28} />
      </button>
      <button
        title="播放/暂停"
        onClick={toggleAudio}
      >
        {isPlaying ? <BsPause size={28} /> : <BsPlay size={28} />}
      </button>
      <button
        title="下一首"
        onClick={handleNextTrack}
      >
        <BsSkipEnd size={28} />
      </button>
    </div>
  );
};

export default LeftControl;
