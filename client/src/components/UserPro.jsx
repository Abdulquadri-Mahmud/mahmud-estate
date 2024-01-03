// import React from 'react'
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';


export default function UserPro() {
    const {currentUser} = useSelector((state) => state.user);

  return (
    <div>
       <div className="user flex flex-col gap-3 p-5 ">
        <div className="flex justify-center">
          <Link to='/profile'>
            <img src={currentUser ? currentUser.avatar :''} className='w-20 h-20 object-cover rounded-full'/>
          </Link>
        </div>
          <p>{currentUser ? currentUser.username : 'Username'}</p>
          <p>{currentUser ? currentUser.email : 'Email'}</p>
          <p>{currentUser ? currentUser.mobile : 'Mobile'}</p>
        </div>
    </div>
  )
}
