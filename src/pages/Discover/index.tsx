import { FC, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
// import { createBrowserHistory } from 'history';

import NavBarItem, { NavBarItemConfig } from '../../components/NvaBarItem';
import { setNavItem } from '../../utils/setNavItem';
import './index.css';

const locations: Array<string> = [
  '/',
  '/discover/playlist',
  '/discover/artist',
  '/discover/album',
];

const Discover: FC = () => {
  const location = useLocation();
  // 头部导航选择的目标
  const [activeItem, setActiveItem] = useState(
    setNavItem(locations, location.pathname)
  );

  useEffect(() => {
    setActiveItem(setNavItem(locations, location.pathname));
  }, [activeItem]);

  const itemConfig: Array<NavBarItemConfig> = [
    {
      linkTo: '/',
      classNameStyle: 'dis-item px-3 mx-5 min-w-fit',
      itemId: 0,
      itemText: '推荐',
      active: activeItem === 0,
    },
    {
      linkTo: '/discover/playlist',
      classNameStyle: 'dis-item px-3 mx-5 min-w-fit',
      itemId: 1,
      itemText: '歌单',
      active: activeItem === 1,
    },
    {
      linkTo: '/discover/artist',
      classNameStyle: 'dis-item px-3 mx-5 min-w-fit',
      itemId: 2,
      itemText: '歌手',
      active: activeItem === 2,
    },
    {
      linkTo: '/discover/album',
      classNameStyle: 'dis-item px-3 mx-5 mr-52 min-w-fit',
      itemId: 3,
      itemText: '新碟上架',
      active: activeItem === 3,
    },
  ];

  return (
    <div className='discover'>
      <div className='disc-header flex flex-row justify-center min-h-fit text-white text-xs leading-5 pt-1 pb-2 pr-20'>
        {itemConfig.map((item) => (
          <NavBarItem
            key={item.itemId}
            linkTo={item.linkTo}
            classNameStyle={item.classNameStyle}
            handleClick={() => setActiveItem(item.itemId)}
            itemText={item.itemText}
            active={activeItem === item.itemId}
            activeStyle={{
              textDecoration: 'none',
              backgroundColor: '#9b0909',
              display: 'inline-block',
              borderRadius: '20px',
              color: '#fff',
            }}
            itemId={item.itemId}
          />
        ))}
      </div>
      <div>
        {/* 三级路由出口 */}
        <Outlet />
        {/*  */}
      </div>
    </div>
  );
};

export default Discover;
