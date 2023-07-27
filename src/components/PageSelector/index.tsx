import { FC } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  currPage: number;
  totalPage: number;
  setPage: Function;
}

const PageSelector: FC<Props> = ({ currPage, totalPage, setPage }) => {
  const btnBorder = "border border-gray-200 hover:border-gray-500";
  const btnActive =
    "bg-red-600 text-white border border-red-600 hover:bg-red-700/70 hover:border-red-600";
  const btnDisabled =
    "bg-gray-200 text-gray-500 border border-gray-400 hover:border-gray-400 cursor-not-allowed";

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
          onClick={() => {
            setPage(currPage - 1);
          }}
        >
          上一页
        </button>
      </div>
      <div>
        <button
          className={twMerge("h-6 w-7 mx-1 border", btnBorder, currPage === 1 ? btnActive : "")}
          onClick={() => {
            setPage(1);
          }}
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
                onClick={() => {
                  setPage(idx + 2);
                }}
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
                    onClick={() => {
                      setPage(idx + 2);
                    }}
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
                    onClick={() => {
                      setPage(currPage - 2 + idx);
                    }}
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
                    onClick={() => {
                      setPage(totalPage - 6 + idx);
                    }}
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
          onClick={() => {
            setPage(currPage + 1);
          }}
        >
          下一页
        </button>
      </div>
    </div>
  );
};

export default PageSelector;
