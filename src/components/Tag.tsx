import { FC } from "react";
import { twMerge } from "tailwind-merge";

interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
  content: string;
}

const Tag: FC<TagProps> = ({ content, className, ...rest }) => {
  return (
    <div
      className={twMerge(
        `px-2 py-1 w-fit h-fit rounded-md text-sm cursor-pointer 
        bg-gray-300 text-gray-700
        hover:bg-gray-400/80 hover:text-gray-800`,
        className
      )}
      {...rest}
    >
      {content}
    </div>
  );
};

export default Tag;
