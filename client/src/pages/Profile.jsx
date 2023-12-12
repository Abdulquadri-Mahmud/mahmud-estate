// import React from 'react';
import {useSelector} from 'react-redux';

import Header from "../components/Header";
import { useRef, useState } from 'react';

export default function Profile() {
  const fileRef = useRef(null);
  const {currentUser} = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id] : e.target.value
    });
  }
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();

  }


  return (
    <>
      <Header/>
      <div className='m-3'>
      <div style={{height: '80vh'}} className='my-10 p-3 rounded bg-slate-700 max-w-md mx-auto'>
        <h1 className='text-gray-100 text-2xl text-center pt-6'>Profile</h1>
        <form onSubmit={handleSubmit} className='flex items-center flex-col gap-4 mt-6' accept='image/*'>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} ref={fileRef} className='hidden'/>
          <img onClick={() => fileRef.current.click()} src={currentUser.avatar} className='cursor-pointer rounded-full w-24'/>
          <input type="text" className='p-2 w-full rounded-lg' onChange={handleChange} placeholder='Username' id='username' defaultValue={currentUser.username}/>
          <input type="text" className='p-2 w-full rounded-lg' onChange={handleChange} placeholder='Example@gmail.com' id='email' defaultValue={currentUser.email}/>
          <input type="text" className='p-2 w-full rounded-lg' onChange={handleChange} placeholder='Password' id='password'/>
          <button className='uppercase bg-gray-100 p-2 w-52 bg-slate-600 rounded-lg text-gray-100 font-semibold text-1xl'>
            Update
          </button>
        </form>
        <div className='flex justify-between py-3 text-gray-100 font-semibold'>
          <span className='cursor-pointer'>Delete Account</span>
          <span className='cursor-pointer'>Sign Out</span>
        </div>
      </div>
    </div>
    </>
  )
}
