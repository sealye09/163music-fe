import { FC, HTMLAttributes } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowRightShort, BsMusicNoteBeamed } from "react-icons/bs";

import { HeadLine, Tag } from "@/types";

interface GridHeaderProps extends HTMLAttributes<HTMLDivElement> {
  headline: HeadLine;
  tags?: Tag[];
  hasMoreTag: boolean;
}

const GridHeader: FC<GridHeaderProps> = ({
  headline,
  tags,
  hasMoreTag,
  className,
  children,
  ...rest
}) => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-auto flex px-6 min-w-fit border-b-2 border-red-700">
      <div className="flex min-w-fit justify-start items-center">
        <div className="icon">
          <BsMusicNoteBeamed
            size={20}
            className="text-red-600"
          />
        </div>
        <span
          className="px-3 text-xl min-w-fit cursor-pointer"
          onClick={() => {
            if (headline.target === "" || headline.target === "#") return;
            navigate(headline.target);
          }}
        >
          {headline.title}
        </span>
      </div>

      {tags ? (
        <div className="tag-cat px-3 text-xs flex items-center text-gray-500 min-w-fit">
          {tags.map((tag, idx) => (
            <div key={idx}>
              <Link
                className="px-2 hover:text-red-600"
                to={tag.target}
              >
                {tag.name}
              </Link>
              {idx === tags.length - 1 ? null : <span className="line">|</span>}
            </div>
          ))}
        </div>
      ) : null}

      {hasMoreTag && (
        <span className="cat-more text-xs text-gray-500 flex items-center justify-end w-full">
          <Link
            className="px-0.5 hover:text-red-600"
            to={headline.target}
          >
            更多
          </Link>

          <div className="icon-more">
            <BsArrowRightShort
              size={16}
              className="text-red-600"
            />
          </div>
        </span>
      )}
    </div>
  );
};

export default GridHeader;
