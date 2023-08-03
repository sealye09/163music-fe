import { Outlet } from "react-router";

import Header from "@/Layout/Header";
import Footer from "@/Layout/Footer";
import AudioPlayer from "@/components/AudioPlayer";

const Layout = () => {
  return (
    <>
      <Header />
      {/* 二级路由出口 */}
      <Outlet />
      <AudioPlayer />
      <Footer />
    </>
  );
};

export default Layout;
