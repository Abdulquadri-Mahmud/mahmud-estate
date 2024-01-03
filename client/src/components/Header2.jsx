// import React from 'react';
import {useSelector} from 'react-redux';
import logo from '../assets/est1.jpg';
import {Link} from 'react-router-dom';

export default function Header2() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div>
      <header className="shadow-md bg-zinc-300 p-5 sticky top-0 z-10">
        <div className='text-black flex justify-between items-center max-w-7xl mx-auto'>
          <div className="p-1">
                <Link to='/' className='flex items-center gap-2'>
                    <img src={logo} className={`w-7 h-7 rounded-full object-cover ${!open && 'rotate-360 duration-300'}`} />
                   <h1 className={`font-semibold text-1xl dark:text-slate-800 ${!open && 'scale-0 duration-300'}`}>MAHMUD<span>-ESTATE</span></h1>
                </Link>
            </div>
            <nav className='flex gap-5'>
              <Link to='/' className='hidden sm:inline font-semibold text-1xl hover:underline '>Home</Link>
              <Link to='/about' className='hidden sm:inline font-semibold text-1xl hover:underline'>About</Link>
              <Link to='/signin' className='font-semibold text-1xl hover:underline'>
                {currentUser ? (<img src='' />) : (<span className=''>Signin</span>)}
              </Link>
          </nav>
        </div>
      </header>
    </div>
  )
}
