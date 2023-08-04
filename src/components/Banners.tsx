import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Loading from "@/components/Loading";
import { recommendApi } from "@/service";
import BannerImg from "@/assets/images/banner.png";

interface BannerInfo {
  imageUrl: string;
  // 1.歌曲 10.专辑 1000.歌单
  targetType: number;
  targetId: number;
  targetUrl: string;
}

interface Props {}

const Banners: FC<Props> = ({}) => {
  const [activeItem, setActiveItem] = useState<number>(0);
  const [banners, setBanners] = useState<BannerInfo[]>();
  const [leftArrowHover, setLeftArrowHover] = useState<boolean>(false);
  const [rightArrowHover, setRightArrowHover] = useState<boolean>(false);

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

  if (!banners)
    return (
      <div className="flex flex-row justify-center items-center h-80">
        <Loading />
      </div>
    );

  return (
    <div className="banner">
      <div
        className="ban f-pr flex justify-center items-center w-full h-80 transition-all"
        style={{
          background: `url('${banners[activeItem].imageUrl}?imageView&blur=40x20') center center/6000px`,
        }}
      >
        <button
          className="w-[38px] h-[64px] mr-4 cursor-pointer"
          onMouseEnter={() => setLeftArrowHover(true)}
          onMouseLeave={() => setLeftArrowHover(false)}
          style={{
            background: `url('${BannerImg}') repeat`,
            backgroundPositionX: "0px",
            backgroundPositionY: leftArrowHover ? "230px" : "300px",
          }}
          onClick={() => {
            if (activeItem === 0) setActiveItem(banners.length - 1);
            else setActiveItem(activeItem - 1);
          }}
        />
        <div className="h-full transition-all w-[864px]">
          <Link to={banners[activeItem].targetUrl}>
            <img
              className="w-[864px] cursor-pointer img-active h-full z-10"
              src={`${banners[activeItem].imageUrl}`}
            />
          </Link>
        </div>
        <button
          className="w-[38px] h-[64px] ml-4 cursor-pointer"
          onMouseEnter={() => setRightArrowHover(true)}
          onMouseLeave={() => setRightArrowHover(false)}
          style={{
            background: `url('${BannerImg}') repeat`,
            backgroundPositionX: "0px",
            backgroundPositionY: rightArrowHover ? "82px" : "152px",
          }}
          onClick={() => {
            if (activeItem === banners.length - 1) setActiveItem(0);
            else setActiveItem(activeItem + 1);
          }}
        />
      </div>
    </div>
  );
};

export default Banners;
