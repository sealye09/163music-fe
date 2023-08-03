import { FC } from "react";
import { Link } from "react-router-dom";
import { BsArrowRightShort, BsMusicNoteBeamed } from "react-icons/bs";

import { HeadLine, Tag } from "@/types";

interface Props {
  headline: HeadLine;
  tags?: Tag[];
  hasMoreTag: boolean;
}

const GridHeader: FC<Props> = ({ headline, tags, hasMoreTag }) => {
  return (
    <div className="w-full h-auto flex px-6 min-w-fit border-b-2 border-red-700">
      <div className="flex min-w-fit justify-start items-center">
        <div>
          <BsMusicNoteBeamed
            size={20}
            className="text-red-600"
          />
        </div>
        <Link
          className="px-3 text-xl min-w-fit"
          to={`${headline.target}`}
        >
          {headline.title}
        </Link>
      </div>

      <div className="tag-cat px-3 text-xs flex items-center text-gray-500 min-w-fit">
        {!!tags &&
          tags.map((tag) => (
            <div key={tag.target}>
              <Link
                className="px-2 hover:text-red-600"
                to={`${tag.target}`}
              >
                {tag.title}
              </Link>
              {tag.id === tags.length - 1 ? null : <span className="line">|</span>}
            </div>
          ))}
      </div>
      {hasMoreTag && (
        <span className="cat-more text-xs text-gray-500 flex items-center justify-end w-full">
          <Link
            className="px-0.5 hover:text-red-600"
            to={`${headline.target}`}
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
