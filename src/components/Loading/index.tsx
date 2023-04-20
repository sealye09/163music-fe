import React from 'react';
import './index.css';

type Props = {};

const Loading = (props: Props) => {
  return (
    <div className='load-cover flex flex-row justify-center items-center h-full w-full'>
      <div className='loading text-xl'>Loading...</div>
    </div>
  );
};

export default Loading;
