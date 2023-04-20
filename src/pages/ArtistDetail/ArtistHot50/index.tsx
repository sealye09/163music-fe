import React, { FC } from 'react';
import TrackList from '../../../components/TrackList';
import { Track } from '../../Layout';

interface Props {
  playAllSong: Function;
  addAllSong: Function;
  hot50: Array<Track>;
}

const ArtistHot50: FC<Props> = ({ addAllSong, playAllSong, hot50 }) => {
  return (
    <div>
      <div className='tracks-list px-4'>
        <div
          className='bg-white flex justify-between h-8 min-h-fit mt-10 items-end pb-2'
          style={{
            borderBottom: '2px solid #c20c0c',
          }}
        >
          <div className='flex items-end justify-between mx-2 w-full min-h-fit'>
            <p className='text-xl text-black'>Hot 50</p>
            <div className='btns text-sm'>
              <button
                style={{
                  backgroundColor: '#2B659E',
                }}
                className='btn play text-white px-3 py-1 rounded-md'
                onClick={() => playAllSong()}
              >
                播放
              </button>
              <button
                style={{
                  backgroundColor: '#2B659E',
                }}
                className='btn rounded-md py-1 px-2 text-white'
                onClick={() => addAllSong()}
              >
                +
              </button>
            </div>
          </div>
          <div className='play-btns flex text-sm items-end mx-2'></div>
        </div>
        <TrackList
          listItems={['歌曲标题', '专辑']}
          listInfo={hot50}
        />
      </div>
    </div>
  );
};
export default ArtistHot50;
