import { FC } from "react";

import NotFoundImg from "../../assets/images/logo.png";

const NotFound: FC = () => {
  return (
    <div className="w-full h-full bg-gray1">
      <div className="w-content bg-white border-x border-gray1 mx-auto min-h-[70vh]">
        <div>
          <div className="notfound inner h-auto">
            <div className="h-72 w-2/3 ml-36 pt-40"></div>
            <div className="notfound-text text-center text-lg text-gray-700">
              很抱歉，你要查找的网页找不到
            </div>
            <div
              className="relative left-[290px] top-[-166px] h-[116px] w-full"
              style={{
                backgroundImage: `url(${NotFoundImg})`,
                backgroundRepeat: "no-repeat",
                backgroundPositionX: "12px",
                backgroundPositionY: "-405px",
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
