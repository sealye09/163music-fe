import { FC } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

export type HeadLine = {
  title: string;
  target: string;
};

export type Tag = {
  id: number;
  title: string;
  target: string;
};

interface Props {
  headline: HeadLine;
  tags?: Array<Tag>;
  hasMoreTag: boolean;
}

const GridHeader: FC<Props> = ({ headline, tags, hasMoreTag }) => {
  return (
    <div className='cat-header w-full h-auto flex px-6 min-w-fit'>
      <div className='icon-font top-1 relative'>
        <svg
          viewBox='0 0 1024 1024'
          version='1.1'
          xmlns='http://www.w3.org/2000/svg'
          p-id='4662'
          width='20'
          height='20'
        >
          <path
            d='M875.008 295.424a34.133333 34.133333 0 1 0-58.197333 35.669333c35.328 57.514667 53.930667 123.562667 53.930666 191.488 0 201.898667-164.352 366.250667-366.250666 366.250667S138.24 724.48 138.24 522.581333 302.592 156.330667 504.490667 156.330667c18.773333 0 34.133333-15.36 34.133333-34.133334s-15.36-34.133333-34.133333-34.133333C264.874667 88.064 69.973333 282.965333 69.973333 522.581333s194.901333 434.517333 434.517334 434.517334 434.517333-194.901333 434.517333-434.517334c0.170667-80.384-22.016-159.061333-64-227.157333z'
            fill='#E60026'
            p-id='4663'
          ></path>
          <path
            d='M501.248 389.973333c-77.653333 0-140.8 63.146667-140.8 140.8s63.146667 140.8 140.8 140.8 140.8-63.146667 140.8-140.8V224.256c0-19.456 15.872-35.328 35.328-35.328 19.456 0 35.328 15.872 35.328 35.328 0 18.773333 15.36 34.133333 34.133333 34.133333s34.133333-15.36 34.133334-34.133333c0-57.173333-46.421333-103.594667-103.594667-103.594667s-103.594667 46.421333-103.594667 103.594667v186.026667a140.526933 140.526933 0 0 0-72.533333-20.309334z m0 213.333334a72.704 72.704 0 0 1-72.533333-72.533334 72.704 72.704 0 0 1 72.533333-72.533333 72.704 72.704 0 0 1 72.533333 72.533333 72.704 72.704 0 0 1-72.533333 72.533334z'
            fill='#E60026'
            p-id='4664'
          ></path>
        </svg>
      </div>
      <Link
        className='px-3 text-xl min-w-fit'
        to={`${headline.target}`}
      >
        {headline.title}
      </Link>
      <div className='tag-cat px-3 text-xs flex items-center text-gray-500 min-w-fit'>
        {tags ? (
          tags.map((tag) => (
            <div key={tag.target}>
              <Link
                className='px-2 cat-item'
                to={`${tag.target}`}
              >
                {tag.title}
              </Link>
              {tag.id === tags.length - 1 ? <></> : <span className='line'>|</span>}
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
      {hasMoreTag ? (
        <span className='cat-more text-xs text-gray-500 flex items-center justify-end w-full'>
          <Link
            className='cat-item px-0.5'
            to={`${headline.target}`}
          >
            更多
          </Link>

          <div className='icon-more'>
            <svg
              viewBox='0 0 1024 1024'
              version='1.1'
              xmlns='http://www.w3.org/2000/svg'
              p-id='6180'
              width='8'
              height='8'
            >
              <path
                d='M749.6 466.4l-384-384-91.2 91.2L613.6 512l-339.2 338.4 91.2 91.2 384-384 44.8-45.6z'
                p-id='6181'
                fill='#E60026'
              ></path>
            </svg>
          </div>
        </span>
      ) : (
        <></>
      )}
    </div>
  );
};

export default GridHeader;
