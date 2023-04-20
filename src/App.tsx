import Router from './router';
import { FC, useState } from 'react';

import '../index.css';
import { Track, TracksContext } from './pages/Layout';

type Props = {};

export const App: FC<Props> = ({}) => {
  const [tracks, setTracks] = useState<Track[]>([
    {
      song: {
        id: 19537524,
        name: "I'll Be Your Mirror",
      },
      artist: {
        id: 101996,
        name: 'The Velvet Underground',
      },
      album: {
        id: 1798937,
        name: 'The Velvet Underground & Nico',
        picUrl: 'https://p1.music.126.net/5CuLry1JQsbXoBvBgL9BmQ==/2535473814614187.jpg?param=130y130',
      },
    },
  ]);
  const [trackIndex, setTrackIndex] = useState<number>(0);

  return (
    <div className='App'>
      <TracksContext.Provider
        value={{
          tracks,
          setTracks,
          trackIndex,
          setTrackIndex,
        }}
      >
        <Router />
      </TracksContext.Provider>
    </div>
  );
};

export default App;
