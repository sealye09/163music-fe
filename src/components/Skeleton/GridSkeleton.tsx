import { FC, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

import PicSkeleton from "./PicSkeleton";
import TextSkeleton from "./TextSkeleton";

interface GridSkeletonProps extends HTMLAttributes<HTMLDivElement> {
  titleLines?: number;
  columns?: number;
  rows?: number;
}

const GridSkeleton: FC<GridSkeletonProps> = ({
  titleLines = 2,
  columns = 5,
  rows = 2,
  className,
  ...rest
}) => {
  const Row = () => {
    return (
      <div
        className={twMerge("grid grid-cols-5 w-full", className)}
        {...rest}
      >
        {Array(columns)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="grid justify-evenly h-52 content-start"
            >
              <PicSkeleton className="mt-2" />

              {Array(titleLines)
                .fill(0)
                .map((_, k) => (
                  <TextSkeleton
                    key={k}
                    className="mt-2"
                  />
                ))}
            </div>
          ))}
      </div>
    );
  };

  return (
    <div className="py-10">
      {Array(rows)
        .fill(0)
        .map((_, j) => (
          <Row key={j} />
        ))}
    </div>
  );
};

export default GridSkeleton;
