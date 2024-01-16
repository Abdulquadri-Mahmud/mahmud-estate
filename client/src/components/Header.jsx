// import React from 'react';
import { useEffect, useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
// import { IoSearchSharp } from "react-icons/io5";
import { MdDarkMode } from "react-icons/md";
import { useSelector } from 'react-redux';
import logo from '../assets/est1.jpg';

import { Link } from "react-router-dom";
import { ImProfile } from "react-icons/im";
import { IoIosContact, IoIosHome } from "react-icons/io";
import { SiAboutdotme } from "react-icons/si";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
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
    <header className="dark:bg-slate-800 shadow-md bg-zinc-300 p-2 sticky top-0 z-10 ">
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
                <div className="sidebar inline md:hidden">
                    <div className="menu">
                        <HiOutlineMenuAlt1 className="text-2xl"/>
                    </div>
                    <div className="sidemenu fixed right-0 top-0 h-screen bg-slate-800 text-gray-50 overflow-hidden z-10 duration-200 w-0">
                        <div className="menus">
                            <div className={`mx-0 bg-transparent p-3 sm:mx-4 my-2 w-md sm:p-4 flex justify-center sm:bg-slate-700 rounded`}>
                                <div className="flex items-center flex-col gap-4">
                                    <img src={currentUser.avatar} className={`w-20 h-20 rounded-full object-cover`}/>
                                    <p className={`${!open && 'sm:hidden'} hidden sm:inline origin-left duration-200 text-gray-100 font-semibold word-wrap`}>{}</p>
                                </div>
                            </div>
                            <nav className='flex flex-col gap-7 mt-24 p-4'>
                                <Link to='/' className='font-semibold text-1xl hover:bg-slate-600 duration-300 rounded bg-slate-700'>
                                    <div className='flex p-2'>
                                        <p>
                                            <IoIosHome className={`text-xl`} />
                                        </p>
                                        <h1 className={``}>Home</h1>
                                    </div>
                                </Link>
                                <Link to='/about' className='font-semibold text-1xl bg-slate-700 duration-300 rounded hover:bg-slate-600'>
                                            <SiAboutdotme  className={`text-xl`}/>
                                    <div className="flex p-2">
                                        <p>
                                        </p>
                                        <p className={``}>About</p>
                                    </div>
                                </Link>
                                <Link to='/contact' className='font-semibold text-1xl bg-slate-700 duration-300 rounded hover:bg-slate-600'>
                                    <p className="flex items-center gap-2 p-2">
                                        <p>                                
                                            <IoIosContact  className={`${!open && 'sm:text-2xl '} text-xl`}/>
                                        </p>
                                        <span className={``}>Contact</span>
                                    </p>
                                </Link>
                                <Link to='/profile' className='font-semibold text-1xl bg-slate-700 duration-300 rounded hover:bg-slate-600'>
                                    <p className="flex items-center gap-2 p-2">
                                        <p>
                                            <ImProfile  className={`${!open && 'sm:text-2xl '} text-xl`} />
                                        </p>
                                        <span className={`${!open && 'sm:hidden'} hidden sm:inline origin-left duration-200`}>Profile</span>
                                    </p>
                                </Link>
                                <Link to='/signin' className='font-semibold text-1xl bg-slate-700 duration-300 rounded hover:bg-slate-600'>
                                    {currentUser ? '' : 
                                    <>
                                        <p className="flex items-center gap-2 p-2">
                                            <FaSignInAlt />
                                            <span>Signin</span>
                                        </p>
                                    </>
                                    }
                                </Link>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
  )
}
