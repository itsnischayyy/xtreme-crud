import React from "react";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {

    const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      <header className="bg-gray-800 p-4">
        <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
          <h1 className="text-white text-2xl font-bold">
            <Link to="/">
                XtremeThoughts
            </Link>
            </h1>
            <ul className='flex gap-4'>
          <Link to='/'>
            <li className='hidden sm:inline text-slate-200 hover:underline'>
              Home
            </li>
          </Link>
          <Link to='/profile'>
            {currentUser ? (
              <li className=' text-slate-200 hover:underline'> Profile</li>
            ) : (
              <li className=' text-slate-200 hover:underline'> Sign in</li>
            )}
          </Link>
          <Link to='/search'>
            {currentUser ? (
              <li className=' text-slate-200 hover:underline'> Search</li>
            ) : (
              <></>
            )}
          </Link>
        </ul>
        </div>
      </header>
    </>
  );
};

export default Header;
