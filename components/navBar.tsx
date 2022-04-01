import React, { useState } from 'react';
import { matchRoles } from 'utils/matchRoles';

export const getServerSideProps = async (context) => ({
  props: { ...(await matchRoles(context)) },
});

const navBar = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [showOptions, setShowOptions] = useState(false);
  const handleClick = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div>
      {showOptions && (
        <div className='fixed h-screen bg-[#306D81] w-64'>
          <div className='p-5 flex flex-row-reverse'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-7 w-7 fill-[#E6F4F1] hover:fill-[#FFF6ED] cursor-pointer'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                clipRule='evenodd'
              />
            </svg>
          </div>
          <ul>
            <li className='w-full p-3 text-base font-bold hover:bg-[#67A1B6] text-[#E6F4F1] hover:text-[#FFF6ED] border-2 border-x-[#306D81] border-y-[#306D81] border-t-[#E6F4F1] hover:border-[#67A1B6] cursor-pointer'>
              Link 1
            </li>
            <li className='w-full p-3 text-base font-bold hover:bg-[#67A1B6] text-[#E6F4F1] hover:text-[#FFF6ED] border-2 border-x-[#306D81] border-y-[#306D81] border-t-[#E6F4F1] hover:border-[#67A1B6] cursor-pointer'>
              Link 2
            </li>
            <li className='w-full p-3 text-base font-bold hover:bg-[#67A1B6] text-[#E6F4F1] hover:text-[#FFF6ED] border-2 border-x-[#306D81] border-y-[#306D81] border-t-[#E6F4F1] hover:border-[#67A1B6] cursor-pointer'>
              Link 3
            </li>
          </ul>
        </div>
      )}
      <div className='pl-16 h-screen w-full flex flex-col sm:pl-64 '>
        <header className='p-3 bg-[#306D81]'>
          <button
            onClick={handleClick}
            type='button'
            className='w-full buttonsppl'
          >
            Realizar un seguimiento
          </button>
        </header>
      </div>
    </div>
  );
};

export default navBar;
