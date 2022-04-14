import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useState } from 'react';

const Nav = () => {
  const { data: session } = useSession();
  const [showOptions, setShowOptions] = useState(false);
  const handleClick = () => {
    setShowOptions(!showOptions);
  };
  return (
    <div>
      {showOptions && (
        <div className='sideBar'>
          <div
            onClick={handleClick}
            role='button'
            className='p-5 ml-11 flex'
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
            <li className='liSideBar'>
              <Link href='/document'>Plantillas</Link>
            </li>
            <li className='liSideBar'>
              <Link href='/comment'>Comentarios</Link>
            </li>
          </ul>
        </div>
      )}
      <nav className='navBar'>
        <div
          onClick={handleClick}
          role='button'
          className='p-2 md:hidden'
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
        <div className='hidden md:flex'>
          <ul className='flex flex-row items-center'>
            <li className='liNavBar'>
              <Link href='/'>Inicio</Link>
            </li>
            <li className='liNavBar'>
              <Link href='/document'>Plantillas</Link>
            </li>
            <li className='liNavBar'>
              <Link href='/comment'>Comentarios</Link>
            </li>
          </ul>
        </div>
        <button
          type='button'
          onClick={() => {
            signOut();
          }}
          className='flex items-center'
        >
          Cerrar sesión
        </button>
      </nav>
    </div>
  );
};

export default Nav;
