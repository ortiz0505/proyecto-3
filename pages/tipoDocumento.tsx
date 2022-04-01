import React, { useState } from 'react';
import { matchRoles } from 'utils/matchRoles';
// import Navbar from '@components/navBar';

export const getServerSideProps = async (context) => ({
  props: { ...(await matchRoles(context)) },
});

const tipoDocumento = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [showOptions, setShowOptions] = useState(false);
  const handleClick = () => {
    setShowOptions(!showOptions);
  };
  return (
    <div>
      {showOptions && (
        <div className='fixed h-screen bg-[#306D81] w-64'>
          <div
            onClick={handleClick}
            role='button'
            className='p-5 flex flex-row-reverse'
            tabIndex={0}
            aria-hidden='true'
          >
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
      <nav className='flex justify-between py-3 px-14 bg-[#306D81] w-full'>
        <div
          onClick={handleClick}
          role='button'
          className='p-2 place-content-end'
          tabIndex={0}
          aria-hidden='true'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-7 w-7 fill-[#E6F4F1] hover:fill-[#FFF6ED] cursor-pointer'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
              clipRule='evenodd'
            />
          </svg>
        </div>
        <div className='flex items-center'>user</div>
      </nav>
      {/* contenido */}
      <div className='flex-grow py-3 px-14 bg-[#FFF6ED]'>
        <div className='container p-4'>
          <label htmlFor='text' className='block'>
            <span className='block text-sm font-medium text-[#306D81]'>
              Label
            </span>
            <input
              type='text'
              name='text'
              className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#67A1B6] focus:ring-[#67A1B6] block w-full rounded-md sm:text-sm focus:ring-1'
              placeholder='Ingrese texto'
            />
          </label>
          <button
            type='button'
            className='rounded-lg p-2 bg-[#306D81] hover:bg-[#67A1B6] text-sm text-[#E6F4F1] hover:text-[#FFF6ED] font-bold'
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default tipoDocumento;
