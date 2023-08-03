import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import { NavBarItemConfig } from "@/types";

interface NavBarItemProps extends NavBarItemConfig {}

const NavBarItem: FC<NavBarItemProps> = ({
  itemId,
  className = "",
  activeClass = "",
  linkTo,
  itemText,
  active,
}) => {
  const navigate = useNavigate();

  if (!active) activeClass = "";

  const styles = twMerge(className, activeClass, "cursor-pointer");

  return (
    <div
      className={styles}
      onClick={() => {
        navigate(linkTo);
      }}
    >
      <span>{itemText}</span>
    </div>
  );
};

export default NavBarItem;
