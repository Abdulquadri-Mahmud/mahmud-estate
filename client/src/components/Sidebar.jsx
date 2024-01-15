// import React from 'react';

import {Link} from 'react-router-dom';
import { FaChevronCircleRight, FaSignInAlt } from "react-icons/fa";
import { IoIosContact, IoIosHome } from "react-icons/io";
import { useSelector } from 'react-redux';
import { SiAboutdotme } from 'react-icons/si';
import { useState } from 'react';
import { ImProfile } from 'react-icons/im';

export default function Sidebar() {
  const { currentUser } = useSelector((state) => state.user);
  const [open, setOpen] = useState(true);
  return (
    <div className='hidden md:inline'>
      <div className={`${open ? 'w-20 sm:w-72' : 'w-20'} duration-300 text-white bg-gray-600`}>
                <div className={`${open ? 'w-20 sm:w-72' : 'w-20'} duration-300 fixed left-0 dark:shadow-2xl top-0 h-screen bg-slate-800`}>
                    <FaChevronCircleRight onClick={() => setOpen(!open)} className={`absolute right-0 top-32 cursor-pointer text-2xl bg-gray-200 rounded-full p-1 text-gray-800 ${!open && 'rotate-180'}`}/>
                    <div className={`${!open && 'sm:mx-0 sm:bg-transparent sm:px-0'} mx-0 bg-transparent p-3 sm:mx-4 my-2 w-md sm:p-4 mx-auto sm:bg-slate-700 rounded`}>
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
                        <Link to='/about' className='font-semibold text-1xl bg-slate-700 duration-300 rounded hover:bg-slate-600'>
                            <p className="flex items-center gap-2 p-2">
                                <p>
                                    <SiAboutdotme  className={`${!open && 'sm:text-2xl '} text-xl`}/>
                                </p>
                                <span className={`${!open && 'sm:hidden'} hidden sm:inline origin-left duration-200`}>About</span>
                            </p>
                        </Link>
                        <Link to='/contact' className='font-semibold text-1xl bg-slate-700 duration-300 rounded hover:bg-slate-600'>
                            <p className="flex items-center gap-2 p-2">
                                <p>                                
                                    <IoIosContact  className={`${!open && 'sm:text-2xl '} text-xl`}/>
                                </p>
                                <span className={`${!open && 'sm:hidden '} hidden sm:inline origin-left duration-200`}>Contact</span>
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
  )
}
