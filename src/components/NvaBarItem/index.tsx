import { FC } from 'react';
import { Link } from 'react-router-dom';

export type NavBarItemConfig = {
  itemId: number;
  itemText: string;
  linkTo: string;
  newTab?: boolean;
  handleClick?: Function;
  classNameStyle: string;
  active?: boolean;
  activeStyle?: object;
};

type Props = NavBarItemConfig;

const NavBarItem: FC<Props> = ({
  itemId,
  classNameStyle,
  linkTo,
  itemText,
  handleClick,
  active,
  activeStyle,
  newTab,
}) => {
  let target = '';

  if (active) classNameStyle += 'navbar-item-active';
  else activeStyle = {};

  if (newTab) if (newTab) target = '_blank';

  if (typeof handleClick == 'undefined')
    handleClick = () => {
      console.log('handleClick is undefined.');
    };

  return (
    <Link
      target={target}
      style={{ ...activeStyle }}
      to={linkTo}
      className={classNameStyle}
      onClick={() => {
        if (!!handleClick) {
          handleClick();
        }
      }}
    >
      {itemText}
    </Link>
  );
};

export default NavBarItem;
