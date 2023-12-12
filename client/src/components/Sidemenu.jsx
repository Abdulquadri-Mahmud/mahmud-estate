// import React from 'react'
import { LuMenuSquare } from "react-icons/lu";

export default function Sidemenu() {
    const sideBar = document.getElementsByClassName('sidebar');
    const handleMenu = () => {
        console.log(sideBar.classList);
        // sideBar.style.width = '50%'
    }
  return (
    <div>
        <div className="menu_icon" onClick={handleMenu}>
            <LuMenuSquare className='text-3xl sm:hidden cursor-pointer'/>
        </div>
    </div>
  )
}
