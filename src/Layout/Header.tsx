import { FC, memo, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

import { NavBarItemConfig } from "@/types";
import NavBarItem from "@/components/NvaBarItem";
import IconImage from "@/assets/images/topbar.png";

const NavBarItems: NavBarItemConfig[] = [
  {
    itemId: 0,
    linkTo: "/discover",
    itemText: "发现音乐",
  },
  {
    itemId: 1,
    linkTo: "/mymusic",
    itemText: "我的音乐",
  },
  {
    itemId: 2,
    linkTo: "/search",
    itemText: "搜索",
  },
];

const DiscoverNavBarItems: NavBarItemConfig[] = [
  {
    itemId: 0,
    linkTo: "/discover",
    itemText: "推荐",
  },
  {
    itemId: 1,
    linkTo: "/discover/playlist",
    itemText: "歌单",
  },
  {
    itemId: 2,
    linkTo: "/discover/artist",
    itemText: "歌手",
  },
  {
    itemId: 3,
    linkTo: "/discover/album",
    itemText: "新碟上架",
  },
];

interface Props {
  items: NavBarItemConfig[];
  activeItem?: string;
}

const SubHeaader: FC<Props> = ({ items, activeItem }) => {
  return (
    <>
      <div className="bg-red-700 w-full text-xs pt-1 pb-2">
        <div className="flex gap-10 min-h-fit w-[610px] mx-auto">
          {items.map((item) => (
            <NavBarItem
              key={item.linkTo}
              className="flex text-gray-100 py-1 px-3 items-center min-w-fit hover:bg-red-900/80 rounded-full"
              activeClass="bg-red-900/80 text-gray-50"
              linkTo={item.linkTo}
              itemText={item.itemText}
              active={item.linkTo === activeItem}
              itemId={item.itemId}
            />
          ))}
        </div>
      </div>
    </>
  );
};

const Header: FC = memo(() => {
  const location = useLocation();
  // 头部导航选择的目标
  console.log(location);

  const activeItem = useMemo(() => {
    for (let i = NavBarItems.length - 1; i >= 0; i--) {
      if (location.pathname.includes(NavBarItems[i].linkTo)) {
        return NavBarItems[i].linkTo;
      }
    }
    return "/discover";
  }, [location.pathname]);

  const discoverActiveItem = useMemo(() => {
    for (let i = DiscoverNavBarItems.length - 1; i >= 0; i--) {
      if (location.pathname.includes(DiscoverNavBarItems[i].linkTo)) {
        return DiscoverNavBarItems[i].linkTo;
      }
    }
    return "/discover";
  }, [location.pathname]);

  return (
    <div className="flex-col">
      <div className="flex flex-row justify-evenly bg-stone-800 text-stone-300 h-[72px]">
        <div className="flex flex-row justify-center items-center h-full mr-36">
          <Link
            to="/discover"
            className="pb-0 pl-0 pr-0 min-w-fit"
          >
            <div
              className="w-44 h-[72px]"
              style={{
                zIndex: 100,
                backgroundImage: `url(${IconImage})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "0px 0px",
              }}
            ></div>
          </Link>
          {NavBarItems.map((item) => (
            <NavBarItem
              key={item.linkTo}
              className="flex items-center px-5 text-base min-w-fit h-[72px] hover:bg-stone-900"
              activeClass="bg-stone-900 text-stone-100"
              linkTo={item.linkTo}
              itemText={item.itemText}
              active={item.linkTo === activeItem}
              newTab={item.newTab}
              itemId={item.itemId}
            />
          ))}
        </div>
        <div className="right-content flex flex-row">
          <div className="avatar flex-col pl-5 pr-5">
            <div className="avatar-img"></div>
          </div>
        </div>
      </div>
      <div className="w-full h-1 bg-red-700"></div>

      {activeItem === "/discover" && (
        <SubHeaader
          items={DiscoverNavBarItems}
          activeItem={discoverActiveItem}
        />
      )}
    </div>
  );
});

export default Header;
