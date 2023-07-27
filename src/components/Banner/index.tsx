import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Loading from "@/components/Loading";
import { recommendApi } from "@/service";

import "./index.css";

interface BannerInfo {
  imageUrl: string;
  // 1.歌曲 10.专辑 1000.歌单
  targetType: number;
  targetId: number;
  targetUrl: string;
}

interface Props {}

const Banner: FC<Props> = ({}) => {
  const [activeItem, setActiveItem] = useState<number>(0);
  const [banners, setBanners] = useState<Array<BannerInfo>>();

  useEffect(() => {
    recommendApi.getBanner().then((res) => {
      setBanners(
        // @ts-ignore
        res.banners.map((b: any) => {
          return {
            imageUrl: b.imageUrl,
            targetId: b.targetId,
            targetType: b.targetType,
            targetUrl:
              b.targetType == 1
                ? `/song/${b.targetId}`
                : b.targetType == 10
                ? `/album/${b.targetId}`
                : `/playlist/${b.targetId}`,
          };
        })
      );
    });
  }, []);

  return (
    <div className="banners">
      <div className="banner-wrap">
        {!!banners ? (
          <div
            className="ban f-pr flex justify-center items-center w-full h-80 transition-all"
            style={{
              background: `url('${banners[activeItem].imageUrl}?imageView&blur=40x20') center center/6000px`,
            }}
          >
            <div
              className="left-arrow mr-4"
              onClick={() => {
                if (activeItem === 0) setActiveItem(banners.length - 1);
                else setActiveItem(activeItem - 1);
              }}
            ></div>
            <div className="ban-imgs h-full transition-all">
              <Link to={banners[activeItem].targetUrl}>
                <img
                  className="ban-img img-active h-full z-10"
                  src={`${banners[activeItem].imageUrl}`}
                />
              </Link>
            </div>
            <div
              className="right-arrow ml-4"
              onClick={() => {
                if (activeItem === banners.length - 1) setActiveItem(0);
                else setActiveItem(activeItem + 1);
              }}
            ></div>
          </div>
        ) : (
          <div className="flex flex-row justify-center items-center h-80">
            <Loading />
          </div>
        )}
      </div>
    </div>
  );
};

export default Banner;
