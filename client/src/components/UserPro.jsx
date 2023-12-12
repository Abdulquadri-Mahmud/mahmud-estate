// import React from 'react'
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';


export default function UserPro() {
    const {currentUser} = useSelector((state) => state.user);

  return (
    <div>
       <div className="user flex flex-col gap-4 p-5 ">
          <Link to='/profile'>
            <img src={currentUser.avatar} className='w-12 rounded-full' alt="" />
          </Link>
          <p>{currentUser.username}</p>
          <p>{currentUser.email}</p>
          <p>{currentUser.mobile}</p>
        </div>
    </div>
  )
}
