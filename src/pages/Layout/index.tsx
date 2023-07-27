import { createContext, useState } from "react";

import Header from "../../components/Heder";
import Footer from "../../components/Footer";
import AudioPlayer from "../../components/AudioPlayer";

export type Track = {
  song: {
    id: number;
    name: string;
  };
  artist: {
    id: number;
    name: string;
  };
  album: {
    id: number;
    name: string;
    picUrl: string;
  };
};

export const TracksContext = createContext<any>([]);

const Layout = () => {
  const [tracks, setTracks] = useState<Track[]>([
    {
      song: {
        id: 19537524,
        name: "I'll Be Your Mirror",
      },
      artist: {
        id: 101996,
        name: "The Velvet Underground",
      },
      album: {
        id: 1798937,
        name: "The Velvet Underground & Nico",
        picUrl:
          "https://p1.music.126.net/5CuLry1JQsbXoBvBgL9BmQ==/2535473814614187.jpg?param=130y130",
      },
    },
  ]);
  const [trackIndex, setTrackIndex] = useState<number>(0);

  return (
    <>
      <Header />
      <TracksContext.Provider
        value={{
          tracks,
          setTracks,
          trackIndex,
          setTrackIndex,
        }}
      >
        {/* 二级路由出口 */}
        {/* <Outlet /> */}
        <AudioPlayer />
      </TracksContext.Provider>
      <Footer />
    </>
  );
};

export default Layout;
