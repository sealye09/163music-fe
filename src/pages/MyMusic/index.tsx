import { FC } from "react";

import LoginImg from "@/assets/images/mymusic.png";

const MyMusic: FC = () => {
  const handleLogin = () => {
    console.log("login");
  };

  return (
    <div className="w-full h-full bg-gray1">
      <div className="w-content mx-auto border-x min-h-[70vh] border-gray1 bg-white">
        <div
          className=""
          style={{
            backgroundImage: `url(${LoginImg})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "85%",
          }}
        >
          <h2 className="h-80 mb-9 indent-[-9999px]">登录网易云音乐</h2>
          <div className="bg-white w-full h-[100px]"></div>
          <button
            className="btn-login z-10 relative cursor-pointer block w-[157px] h-[41px]
           indent-[-9999px] rounded-md left-[510px] bottom-[170px] 
           hover:animate-pulse hover:shadow-lg hover:shadow-blue-300/60 hover:bg-blue-300/20
           "
            onClick={handleLogin}
          >
            立即登录
          </button>
        </div>
      </div>
    </div>
  );
};
export default MyMusic;
