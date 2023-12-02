// import React from 'react';
import {Link} from 'react-router-dom';

export default function Header2() {
  return (
    <div>
      <header className="shadow-md bg-zinc-300 p-5 sticky top-0 z-10">
        <div className='text-black flex justify-between items-center max-w-7xl mx-auto'>
            <div className="logo">
                <h1 className="font-bold text-xl">MAHMUD<span className='text-zinc-700'>-ESTATE</span></h1>
            </div>
            <nav className='flex gap-5'>
            <Link to='/' className='hidden sm:inline font-semibold text-1xl hover:underline '>Home</Link>
            <Link to='/about' className='hidden sm:inline font-semibold text-1xl hover:underline'>About</Link>
            <Link to='/signin' className='font-semibold text-1xl hover:underline'>Signin</Link>
        </nav>
        </div>
    </header>
    </div>
  )
}
