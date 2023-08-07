import { FC, HTMLAttributes, memo } from "react";
import { useNavigate } from "react-router";
import { twMerge } from "tailwind-merge";

import Tag from "@/components/Tag";

import { Category, SubCategory } from ".";

interface DroupDownProps extends HTMLAttributes<HTMLDivElement> {
  setIsShowDroupDown?: (isShowDroupDown: boolean) => void;
  categeories: Category[];
  subCategories: SubCategory[];
}

const DroupDown: FC<DroupDownProps> = memo(
  ({ categeories, subCategories, className, setIsShowDroupDown, children, ...rest }) => {
    const navigate = useNavigate();
    // 根据类别对subCategories进行分类
    const filteredSubCategories = categeories.map((category) => {
      return {
        ...category,
        subCategories: subCategories.filter((subCategory) => subCategory.category === category.id),
      };
    });

    const handleClick = (to: string) => {
      if (setIsShowDroupDown) setIsShowDroupDown(false);
      navigate(to);
    };

    return (
      <div className="bg-white border border-gray1 h-min w-min rounded-md shadow-2xl">
        <div className="p-6 space-y-4 w-fit">
          <Tag
            className="w-fit flex-shrink-0 bg-blue-500 text-white hover:bg-blue-700 hover:text-white"
            content={"全部"}
            onClick={() => handleClick("/discover/playlist/?cat=全部")}
          />
          <div className="line w-full border-b border-gray1"></div>
          {filteredSubCategories.map((category, idx) => {
            return (
              <div
                key={category.id}
                className={twMerge(
                  "flex w-full gap-4 pb-4",
                  idx === filteredSubCategories.length - 1 ? null : "border-b border-gray1"
                )}
              >
                <span className="text-gray-700 flex-shrink-0">{category.name}</span>
                <div className="flex flex-wrap w-[480px] gap-3 justify-start items-center">
                  {category.subCategories.map((subCategory) => {
                    return (
                      <Tag
                        key={subCategory.id}
                        content={subCategory.name}
                        className="text-xs text-center shrink-0"
                        onClick={() => handleClick(`/discover/playlist/?cat=${subCategory.name}`)}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.categeories === nextProps.categeories;
  }
);

export default DroupDown;
