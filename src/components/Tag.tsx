import { FC } from "react";
import { useNavigate } from "react-router";
import { twMerge } from "tailwind-merge";

interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
  content: string;
  to?: string;
}

const Tag: FC<TagProps> = ({ onClick, children, content, className, ...rest }) => {
  const navigate = useNavigate();

  const handleTo = () => {
    if (rest.to) {
      navigate(rest.to);
    }
  };

  return (
    <div
      className={twMerge(
        `px-2 py-1 rounded-md text-sm cursor-pointer 
        bg-gray-300 text-gray-700
        hover:bg-gray-400/80 hover:text-gray-800`,
        className
      )}
      onClick={() => {
        handleTo();
      }}
      {...rest}
    >
      {content}
      {children}
    </div>
  );
};

export default Tag;
