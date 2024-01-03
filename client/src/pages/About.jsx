// import React from 'react';
import { MdRoundaboutRight } from "react-icons/md";
import Header from "../components/Header";
import { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosContact, IoIosHome } from "react-icons/io";
import { useSelector } from 'react-redux';
import { FaChevronCircleRight, FaSignInAlt } from "react-icons/fa";
import { ImProfile } from "react-icons/im";


export default function About() {
    const [open, setOpen] = useState(true);
    const { currentUser } = useSelector((state) => state.user);

    return (
        <div className="dark:bg-slate-800">
            <div className="flex justify-between">
                <div className={`${open ? 'w-72' : 'w-20'} bg-slate-800 duration-300 h-screen text-white relative`}>
                <FaChevronCircleRight onClick={() => setOpen(!open)} className={`absolute right-0 top-32 cursor-pointer text-2xl bg-gray-200 rounded-full p-1 text-gray-800 ${!open && 'rotate-180'}`}/>
                <div className="mx-4 my-2 w-md p-4 mx-auto bg-slate-700 rounded">
                    <div className="flex items-center gap-4">
                        <img src={currentUser.avatar} className="w-10 h-10 rounded-full"/>
                        <p className="text-gray-100 font-semibold">{currentUser.username}</p>
                    </div>
                </div>
                <nav className='flex flex-col gap-7 mt-28 p-4'>
                    <Link to='/' className='font-semibold text-1xl hover:bg-slate-600 duration-300 rounded bg-slate-700'>
                        <p className='flex items-center gap-2 p-2'>
                            <p>
                                <IoIosHome className={`${!open && 'text-2xl '}`} />
                            </p>
                            <h1 className={`${!open && 'hidden'} origin-left duration-200 `}>Home</h1>
                        </p>
                    </Link>
                    <Link to='/about' className='font-semibold text-1xl bg-slate-600 duration-300 rounded hover:bg-slate-700'>
                        <p className="flex items-center gap-2 p-2">
                            <p>
                                <MdRoundaboutRight className={`${!open && 'text-2xl '}`}/>
                            </p>
                            <span className={`${!open && 'hidden'} origin-left duration-200`}>About</span>
                        </p>
                    </Link>
                    <Link to='/contact' className='font-semibold text-1xl bg-slate-600 duration-300 rounded hover:bg-slate-700'>
                        <p className="flex items-center gap-2 p-2">
                            <p>                                
                                <IoIosContact  className={`${!open && 'text-2xl '}`} />
                            </p>
                            <span className={`${!open && 'hidden '} origin-left duration-200`}>Contact</span>
                        </p>
                    </Link>
                    <Link to='/profile' className='font-semibold text-1xl bg-slate-600 duration-300 rounded hover:bg-slate-700'>
                        <p className="flex items-center gap-2 p-2">
                            <p>
                                <ImProfile  className={`${!open && 'text-2xl '}`} />
                            </p>
                            <span className={`${!open && 'hidden'} origin-left duration-200`}>Profile</span>
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
                                <h2 className="text-3xl ">About Us</h2>
                            </div>
                        </div>
                    </div>
                    {/* <DisplayIEstateImg/> */}
                    <main>
                        <h1 className="text-center my-4 text-xl">About Page</h1>
                    </main>
                </div>
            </div>
        </div>
    )
}
