// import React from 'react';
import {Link} from 'react-router-dom';
import { FaSignInAlt } from "react-icons/fa";
import { IoIosHome } from "react-icons/io";
import { MdRoundaboutRight } from "react-icons/md";
import Logout from './Logout';
import UserPro from './UserPro';
import { useSelector } from 'react-redux';

export default function Sidebar() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="fixed bg-slate-700 w-56 h-full text-gray-100 sidebar">
        <nav className='flex flex-col gap-5 p-5 mt-20'>
            <Link to='/' className='font-semibold text-1xl hover:underline'>
              <p className='flex items-center gap-2'>
                <IoIosHome />
                <span>Home</span>
              </p>
            </Link>
            <Link to='/about' className='font-semibold text-1xl hover:underline'>
              <p className="flex items-center gap-2">
                <MdRoundaboutRight />
                <span>About</span>
              </p>
            </Link>
            <Link to='/signin' className='font-semibold text-1xl hover:underline'>
              {currentUser ? '' : <>
              <p className="flex items-center gap-2">
                <FaSignInAlt />
                <span>Signin</span>
              </p>
              </>}
            </Link>
        </nav>
        <UserPro/>
        <div className="logout">
          <Logout/>
        </div>
    </div>
  )
}
