// import React from 'react';
import logo from '../assets/est1.jpg';

import {Link} from 'react-router-dom';
import { FaSignInAlt } from "react-icons/fa";
import { IoIosHome } from "react-icons/io";
import { MdRoundaboutRight } from "react-icons/md";
// import Logout from './Logout';
// import UserPro from './UserPro';
import { useSelector } from 'react-redux';
import { LuMenuSquare } from "react-icons/lu";

export default function Sidebar(setOpen, open) {

  console.log(setOpen, open);
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className=''>
      <div className={`relative`}>
        
        {/* <UserPro/> */}
        <div className="">
          {/* <Logout/> */}
        </div>
      </div>
    </div>
  )
}
