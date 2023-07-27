import { FC, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import NavBarItem, { NavBarItemConfig } from "../NvaBarItem";

import "./index.css";

const NavBarItems: Array<NavBarItemConfig> = [
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

const DiscoverNavBarItems: Array<NavBarItemConfig> = [
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
  items: Array<NavBarItemConfig>;
  activeItem?: string;
}
const SubHeaader: FC<Props> = ({ items, activeItem }) => {
  return (
    <>
      <div className="flex gap-10 justify-center min-h-fit bg-[#c20c0c] text-white text-xs pt-1 pb-2 pr-72">
        {items.map((item) => (
          <NavBarItem
            key={item.linkTo}
            className="flex py-1 px-2 items-center min-w-fit"
            activeClass="bg-[#9b0909] text-white inline-block py-1 px-2 rounded-full"
            linkTo={item.linkTo}
            itemText={item.itemText}
            active={item.linkTo === activeItem}
            itemId={item.itemId}
          />
        ))}
      </div>
    </>
  );
};

const Header: FC = ({}) => {
  const location = useLocation();
  // 头部导航选择的目标
  console.log(location);

  const activeItem = useMemo(() => {
    for (let i = 0; i < NavBarItems.length; i++) {
      if (location.pathname === NavBarItems[i].linkTo) {
        return NavBarItems[i].linkTo;
      }
    }
    return "/discover";
  }, [location.pathname]);

  const discoverActiveItem = useMemo(() => {
    for (let i = 0; i < DiscoverNavBarItems.length; i++) {
      if (location.pathname === DiscoverNavBarItems[i].linkTo) {
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
            <div className="icon w-44 h-[72px]"></div>
          </Link>
          {NavBarItems.map((item) => (
            <NavBarItem
              key={item.linkTo}
              className="flex items-center px-5 text-base min-w-fit h-[72px] "
              activeClass="bg-black text-white"
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
};

export default Header;
