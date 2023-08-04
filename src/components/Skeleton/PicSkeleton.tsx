import { FC, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

const PicSkeleton: FC<HTMLAttributes<HTMLDivElement>> = ({ className, children, ...rest }) => {
  return (
    <div
      className={twMerge("w-32 h-32 bg-gray-100 rounded-lg animate-pulse", className)}
      {...rest}
    >
      {children}
    </div>
  );
};

export default PicSkeleton;
