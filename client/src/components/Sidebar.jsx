// import React from 'react';
import {Link} from 'react-router-dom';
import { LuMenuSquare } from "react-icons/lu";
import { FaSignInAlt } from "react-icons/fa";
import { IoIosHome } from "react-icons/io";
import { MdRoundaboutRight } from "react-icons/md";

export default function Sidebar() {
  return (
    <div className="fixed bg-slate-700 w-56 h-full text-gray-100 sidebar">
        <div className="menu_icon fixed mt-5 left-5">
            <LuMenuSquare className='text-3xl sm:hidden'/>
        </div>
        <nav className='flex flex-col gap-5 p-5 mt-20'>
            <Link to='/' className='font-semibold text-1xl hover:underline flex items-center gap-2'>
              <IoIosHome />
              <span>Home</span>
            </Link>
            <Link to='/about' className='font-semibold text-1xl hover:underline flex items-center gap-2'>
              <MdRoundaboutRight />
              <span>About</span>
            </Link>
            <Link to='/signin' className='font-semibold text-1xl hover:underline flex items-center gap-2'>
              <FaSignInAlt />
              <span>Signin</span>
            </Link>
        </nav>
    </div>
  )
}
