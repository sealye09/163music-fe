import { FC, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import NavBarItem, { NavBarItemConfig } from '../NvaBarItem';
import { setNavItem } from '../../utils/setNavItem';
import './index.css';

interface Props {}

const locations: Array<string> = ['/', '/mymusic', '/search'];

const Header: FC<Props> = ({}) => {
  const location = useLocation();
  // 头部导航选择的目标
  console.log(location);

  const [activeItem, setActiveItem] = useState(setNavItem(locations, location.pathname));

  useEffect(() => {
    setActiveItem(setNavItem(locations, location.pathname));
  }, [activeItem]);

  const itemConfig: Array<NavBarItemConfig> = [
    {
      linkTo: '/',
      classNameStyle: 'head-item-1 flex-col px-5 text-base min-w-fit pt-6',
      itemId: 0,
      itemText: '发现音乐',
      newTab: false,
      activeStyle: {
        backgroundColor: 'black',
        color: 'white',
        paddingTop: '1.5rem',
      },
    },
    {
      linkTo: '/mymusic',
      classNameStyle: 'head-item-2 flex-col px-5 text-base min-w-fit pt-6',
      itemId: 1,
      itemText: '我的音乐',
      newTab: false,
      activeStyle: {
        backgroundColor: 'black',
        color: 'white',
        paddingTop: '1.5rem',
      },
    },
    {
      linkTo: '/search',
      classNameStyle: 'head-item-3 flex-col px-5 text-base min-w-fit pt-6',
      itemId: 2,
      itemText: '搜索',
      active: activeItem === 3,
      newTab: false,
      activeStyle: {
        backgroundColor: 'black',
        color: 'white',
        paddingTop: '1.5rem',
      },
    },
  ];

  return (
    <div>
      <div className='layout flex-col'>
        <div className='header flex flex-row justify-evenly'>
          <div className='left-content flex flex-row h-full mr-36'>
            <Link
              to=''
              className='pb-0 pl-0 pr-0 min-w-fit'
              onClick={() => setActiveItem(0)}
            >
              <div className='icon w-44 h-16'></div>
            </Link>
            {itemConfig.map((item) => (
              <NavBarItem
                key={item.itemId}
                classNameStyle={item.classNameStyle}
                linkTo={item.linkTo}
                itemText={item.itemText}
                handleClick={() => setActiveItem(item.itemId)}
                active={item.itemId === activeItem}
                activeStyle={item.activeStyle}
                newTab={item.newTab}
                itemId={item.itemId}
              />
            ))}
          </div>
          <div className='right-content flex flex-row'>
            <div className='avatar flex-col pl-5 pr-5'>
              <div className='avatar-img'></div>
            </div>
          </div>
        </div>
        <div className='redline w-auto bg-red-700'></div>
      </div>
    </div>
  );
};

export default Header;
