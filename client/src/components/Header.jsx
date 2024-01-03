// import React from 'react';
import { useEffect, useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
// import { IoSearchSharp } from "react-icons/io5";
import { MdDarkMode } from "react-icons/md";
import { useSelector } from 'react-redux';
import logo from '../assets/est1.jpg';

import { Link } from "react-router-dom";
// import Sidemenu from "./Sidemenu";

export default function Header() {
    const [theme, setTheme] = useState('light');
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const handleThemeSwitch = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

  return (
    <header className="dark:bg-slate-800 shadow-md bg-zinc-300 p-3 sticky top-0 z-10">
        <div className='text-black flex justify-between items-center max-w-7xl mx-auto'>
             <div className="p-4">
                <Link to='/' className='flex items-center gap-2'>
                    <img src={logo} className={`w-7 h-7 rounded-full object-cover ${!open && 'rotate-360 duration-300'}`} />
                   <h1 className={`font-semibold text-1xl dark:text-gray-100 ${!open && 'scale-0 duration-300'}`}>MAHMUD<span>-ESTATE</span></h1>
                </Link>
            </div>            
            <div className="flex gap-2 items-center">
                <Link to='/profile' className=' flex items-center gap-2'>
                    {currentUser ? (<img src={currentUser.avatar} className="rounded-full w-6 h-6 object-cover" />) : (<FaSignInAlt className="text-slate-700 font-semibold text-1xl hover:underline"/>)}
                </Link>
                <MdDarkMode onClick={handleThemeSwitch} className="text-slate-700 text-2xl cursor-pointer dark:text-gray-100"/>
                {/* <Sidemenu/> */}
            </div>
        </div>
    </header>
  )
}
