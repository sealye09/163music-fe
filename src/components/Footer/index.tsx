import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

interface Props {}

const Footer: FC<Props> = ({}) => {
  return (
    <div className='footer text-xs leading-7 pt-16 pb-24'>
      <div className='flex-col justify-center'></div>
    </div>
  );
};

export default Footer;
