// import React from 'react';
// import Sidebar from "../components/Sidebar";
// import logo from '../assets/est1.jpg';

import Header from "../components/Header";
import { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosContact, IoIosHome } from "react-icons/io";
import { SiAboutdotme } from "react-icons/si";
// import { MdRoundaboutRight } from "react-icons/md";
import { useSelector } from 'react-redux';
import { FaChevronCircleRight, FaSignInAlt } from 'react-icons/fa';
import { ImProfile } from "react-icons/im";
import { IoSearchSharp } from "react-icons/io5";

export default function Homepage() {
    const { currentUser } = useSelector((state) => state.user);
    const [open, setOpen] = useState(true);

  return (
    <div className="dark:bg-slate-800">
        <div className="flex justify-between">
            <div className={`${open ? 'w-20 sm:w-72' : 'w-20'} bg-slate-800 duration-300 h-screen text-white relative`}>
                <FaChevronCircleRight onClick={() => setOpen(!open)} className={`absolute right-0 top-32 cursor-pointer text-2xl bg-gray-200 rounded-full p-1 text-gray-800 ${!open && 'rotate-180'}`}/>
                <div className={`${!open && 'sm:mx-0 sm:bg-transparent'} mx-0 bg-transparent p-3 sm:mx-4 my-2 w-md sm:p-4 mx-auto sm:bg-slate-700 rounded`}>
                    <div className="flex items-center gap-4">
                        <img src={currentUser.avatar} className={`w-10 h-10 rounded-full object-cover`}/>
                        <p className={`${!open && 'sm:hidden'} hidden sm:inline origin-left duration-200 text-gray-100 font-semibold word-wrap`}>{currentUser.username}</p>
                    </div>
                </div>
                <nav className='flex flex-col gap-7 mt-28 p-4'>
                    <Link to='/' className='font-semibold text-1xl hover:bg-slate-600 duration-300 rounded bg-slate-700'>
                        <p className='flex items-center gap-2 p-2'>
                            <p>
                                <IoIosHome className={`${!open && 'sm:text-2xl '} text-xl`} />
                            </p>
                            <h1 className={`${!open && 'sm:hidden'} hidden sm:inline origin-left duration-200 `}>Home</h1>
                        </p>
                    </Link>
                    <Link to='/about' className='font-semibold text-1xl bg-slate-600 duration-300 rounded hover:bg-slate-700'>
                        <p className="flex items-center gap-2 p-2">
                            <p>
                                <SiAboutdotme  className={`${!open && 'sm:text-2xl '} text-xl`}/>
                            </p>
                            <span className={`${!open && 'sm:hidden'} hidden sm:inline origin-left duration-200`}>About</span>
                        </p>
                    </Link>
                    <Link to='/contact' className='font-semibold text-1xl bg-slate-600 duration-300 rounded hover:bg-slate-700'>
                        <p className="flex items-center gap-2 p-2">
                            <p>                                
                                <IoIosContact  className={`${!open && 'sm:text-2xl '} text-xl`} />
                            </p>
                            <span className={`${!open && 'sm:hidden '} hidden sm:inline origin-left duration-200`}>Contact</span>
                        </p>
                    </Link>
                    <Link to='/profile' className='font-semibold text-1xl bg-slate-600 duration-300 rounded hover:bg-slate-700'>
                        <p className="flex items-center gap-2 p-2">
                            <p>
                                <ImProfile  className={`${!open && 'sm:text-2xl '} text-xl`} />
                            </p>
                            <span className={`${!open && 'sm:hidden'} hidden sm:inline origin-left duration-200`}>Profile</span>
                        </p>
                    </Link>
                    <Link to='/signin' className='font-semibold text-1xl bg-slate-600 duration-300 rounded hover:bg-slate-700'>
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
            <div className="home h-screen font-semibold flex-1">
                <Header/>
                <div className="flex justify-center">
                    <div className="estate_img mx-1 mt-4 flex justify-center items-center relative">
                        <div className="font-semibold text-white text-center p-3 bg-gray-400 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20">
                            <h2 className="text-1xl ">LET US GUIDE YOUR HOME </h2>
                            <h2 className="text-2xl mt-4">Find Your Future Dream Home...</h2>
                        </div>
                    </div>
                </div>
                {/* <DisplayIEstateImg/> */}
                <main className="dark:text-gray-100">
                    <div className="flex justify-center mt-10">
                        <div className="search_wrap bg-zinc-300 w-80 shadow-md rounded-lg">
                            <form className="rounded-lg relative">
                                <input type="text" className="w-full p-2 rounded-lg focus:outline-zinc-200 bg-gray-100 font-semibold" id="search" placeholder="Search..."/>
                                <label htmlFor="search"><IoSearchSharp className="absolute right-5 top-3 font-bold text-1xl cursor-pointer" id="input"/></label>
                            </form>
                        </div>
                    </div>
                    <p className="text-center my-4 text-1xl">Home Page</p>
                </main>
            </div>
        </div>
    </div>
  )
}
