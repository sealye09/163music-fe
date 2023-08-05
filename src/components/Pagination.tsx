import { FC } from "react";
import { useSearchParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";

interface Props {
  currPage: number;
  totalPage: number;
  setPage?: Function;
}

const Pagination: FC<Props> = ({ currPage, totalPage, setPage }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const btnBorder = "border border-gray-300 hover:bg-gray-100/80";
  const btnActive =
    "bg-red-600 text-white border border-red-600 hover:bg-red-600/80 hoover:text-white hover:border-red-600/80";
  const btnDisabled = "bg-gray-200 hover:bg-gray-200 text-gray-500 cursor-not-allowed";

  const handlePageClick = (page: number) => {
    if (setPage) setPage(page);
    // 判断page是否存在，存在则替换，不存在则添加
    // parama参数添加page
    if (searchParams.has("page")) {
      searchParams.set("page", page.toString());
      setSearchParams(searchParams);
    } else {
      searchParams.append("page", page.toString());
      setSearchParams(searchParams);
    }
  };

  return (
    <div className="flex justify-center h-6 text-sm gap-1">
      <div className="order-first">
        <button
          className={twMerge(
            "prev px-2 mx-4 h-6 w-20",
            btnBorder,
            currPage === 1 ? btnDisabled : ""
          )}
          type="button"
          disabled={currPage === 1}
          onClick={() => handlePageClick(currPage - 1)}
        >
          上一页
        </button>
      </div>
      <div>
        <button
          className={twMerge("h-6 w-7 mx-1 border", btnBorder, currPage === 1 ? btnActive : "")}
          onClick={() => handlePageClick(1)}
        >
          1
        </button>
      </div>

      {totalPage <= 9 ? (
        <>
          {new Array(totalPage - 2).fill(0).map((item, idx) => (
            <div key={idx + 2}>
              <button
                className={twMerge(
                  "h-6 w-7 mx-1",
                  btnBorder,
                  idx + 2 === currPage ? btnActive : ""
                )}
                onClick={() => handlePageClick(idx + 2)}
              >
                {idx + 2}
              </button>
            </div>
          ))}
        </>
      ) : (
        <>
          {currPage >= 6 && (
            <div className="order-0 h-6 w-7">
              <p className="text-center w-full">...</p>
            </div>
          )}
          {currPage < 6
            ? new Array(6).fill(0).map((item, idx) => (
                <div key={idx + 2}>
                  <button
                    className={twMerge(
                      "h-6 w-7 mx-1",
                      btnBorder,
                      idx + 2 === currPage ? btnActive : ""
                    )}
                    onClick={() => handlePageClick(idx + 2)}
                  >
                    {idx + 2}
                  </button>
                </div>
              ))
            : currPage >= 6 && totalPage - currPage >= 5
            ? new Array(5).fill(0).map((item, idx) => (
                <div key={currPage - 2 + idx}>
                  <button
                    className={twMerge(
                      "h-6 w-7 mx-1",
                      btnBorder,
                      currPage - 2 + idx === currPage ? btnActive : ""
                    )}
                    onClick={() => handlePageClick(currPage - 2 + idx)}
                  >
                    {currPage - 2 + idx}
                  </button>
                </div>
              ))
            : new Array(6).fill(0).map((item, idx) => (
                <div
                  key={totalPage - 6 + idx}
                  className="w-7"
                >
                  <button
                    className={twMerge(
                      "h-6 w-7 mx-1",
                      btnBorder,
                      totalPage - 6 + idx === currPage ? btnActive : ""
                    )}
                    onClick={() => handlePageClick(totalPage - 6 + idx)}
                  >
                    {totalPage - 6 + idx}
                  </button>
                </div>
              ))}
          {totalPage - currPage >= 5 && (
            <div className="order-0 h-6 w-7">
              <p className="text-center w-full">...</p>
            </div>
          )}
        </>
      )}

      <div>
        <button
          className={twMerge("h-6 w-7 mx-1", btnBorder, totalPage === currPage ? btnActive : "")}
          onClick={() => handlePageClick(totalPage)}
        >
          {totalPage}
        </button>
      </div>
      <div className="order-last">
        <button
          className={twMerge(
            "next px-2 mx-4 h-6 w-20",
            btnBorder,
            currPage === totalPage ? btnDisabled : ""
          )}
          type="button"
          disabled={currPage === totalPage}
          onClick={() => handlePageClick(currPage + 1)}
        >
          下一页
        </button>
      </div>
    </div>
  );
};

export default Pagination;
