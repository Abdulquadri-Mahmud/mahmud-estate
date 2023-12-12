// import React from 'react';
import { useEffect, useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { MdDarkMode } from "react-icons/md";
import { useSelector } from 'react-redux';

import { Link } from "react-router-dom";
import Sidemenu from "./Sidemenu";

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
    <header className="shadow-md bg-zinc-300 p-5 sticky top-0 z-10">
        <div className='text-black flex justify-between items-center max-w-7xl mx-auto'>
            <div className="logo">
                <h1 className="font-bold text-xl">MAHMUD<span className='text-zinc-700'>-ESTATE</span></h1>
            </div>
            <div className='flex justify-center'>
                <div className="flex justify-center items-center absolute search_wrap bg-zinc-300 shadow-md rounded-lg">
                    <form className="rounded-lg w-60 relative">
                        <input type="text" className="w-full p-2 rounded-lg focus:outline-zinc-200 bg-gray-100 font-semibold" id="search" placeholder="Search..."/>
                        <label htmlFor="search"><IoSearchSharp className="absolute right-5 top-3 font-bold text-1xl cursor-pointer" id="input"/></label>
                    </form>
                </div>
            </div>
            <div className="flex gap-2 items-center">
                <Link to='/signin' className=' flex items-center gap-2'>
                    {currentUser ? (<img src={currentUser.avatar} className="rounded-full w-8" />) : (<FaSignInAlt className="text-slate-700 font-semibold text-1xl hover:underline"/>)}
                </Link>
                <MdDarkMode onClick={handleThemeSwitch} className="text-slate-700 text-2xl cursor-pointer"/>
                <Sidemenu/>
            </div>
        </div>
    </header>
  )
}
