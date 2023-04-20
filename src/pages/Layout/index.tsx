import { createContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
import AudioPlayer from '../../components/AudioPlayer';
import Footer from '../../components/Footer';
import Header from '../../components/Heder';

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
  return (
    <div>
      <Header />
      {/* 二级路由出口 */}
      <Outlet />
      <AudioPlayer />
      <Footer />
    </div>
  );
};

export default Layout;
