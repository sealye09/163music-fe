import { FC } from "react";
import "./index.css";

const MyMusic: FC = () => {
  return (
    <div className="my-music h-full min-h-[70vh] flex flex-row justify-center">
      <div className="not-login bg-white">
        <div className="my_music inner flex flex-col justify-end h-full">
          <h2 className="h-80 mb-9">登录网易云音乐</h2>
          <div className="mymusic-blank h-20  pt-12 bg-white"></div>
          <div className="my_music btn-login">立即登录</div>
        </div>
      </div>
    </div>
  );
};
export default MyMusic;
