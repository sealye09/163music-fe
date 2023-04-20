import { FC } from 'react';
import './index.css';

interface Props {
  currPage: number;
  totalPage: number;
  setPage: Function;
}

const PageSelector: FC<Props> = ({ currPage, totalPage, setPage }) => {
  return (
    <div className='flex justify-center h-6 pages-select text-sm gap-1'>
      <div className='order-first'>
        <button
          className={`prev px-2 mx-4 h-6 w-20 ${currPage === 1 ? 'button-disabled' : ''}`}
          type='button'
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
          className={`'pages-select-item h-6 w-7 mx-1' ${1 === currPage ? 'btn-active' : ''}`}
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
                className={`'pages-select-item h-6 w-7 mx-1' ${idx + 2 === currPage ? 'btn-active' : ''}`}
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
          {currPage >= 6 ? (
            <div className='order-0 h-6 w-7'>
              <p className='text-center w-full'>...</p>
            </div>
          ) : (
            <></>
          )}
          {currPage < 6
            ? new Array(6).fill(0).map((item, idx) => (
                <div key={idx + 2}>
                  <button
                    className={`'pages-select-item h-6 w-7 mx-1' ${idx + 2 === currPage ? 'btn-active' : ''}`}
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
                    className={`'pages-select-item h-6 w-7 mx-1' ${
                      currPage - 2 + idx === currPage ? 'btn-active' : ''
                    }`}
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
                  className='w-7'
                >
                  <button
                    className={`'pages-select-item h-6 w-full mx-1' ${
                      totalPage - 6 + idx === currPage ? 'btn-active' : ''
                    }`}
                    onClick={() => {
                      setPage(totalPage - 6 + idx);
                    }}
                  >
                    {totalPage - 6 + idx}
                  </button>
                </div>
              ))}
          {totalPage - currPage >= 5 ? (
            <div className='order-0 h-6 w-7'>
              <p className='text-center w-full'>...</p>
            </div>
          ) : (
            <></>
          )}
        </>
      )}

      <div>
        <button
          className={`'pages-select-item h-6 w-7 mx-1' ${totalPage === currPage ? 'btn-active' : ''}`}
          onClick={() => {
            setPage(totalPage);
          }}
        >
          {totalPage}
        </button>
      </div>
      <div className='order-last'>
        <button
          className={`next px-2 mx-4 h-6 w-20 ${currPage === totalPage ? 'button-disabled' : ''}`}
          type='button'
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
