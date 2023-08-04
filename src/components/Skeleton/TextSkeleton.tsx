import { FC, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

const TextSkeleton: FC<HTMLAttributes<HTMLDivElement>> = ({ className, children, ...rest }) => {
  // 扫光特效
  return (
    <div
      className={twMerge("relative w-full h-4 bg-gray-100 rounded-full animate-pulse", className)}
      {...rest}
    >
      {children}
    </div>
  );
};

export default TextSkeleton;
