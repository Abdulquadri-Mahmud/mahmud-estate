// import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { deleteUserFailure, deleteUserStart, deleteUserSuccess,
   signOutFailure, signOutStart, signOutSuccess, updateUserFailure,
    updateUserStart, updateUserSuccess } 
from '../redux/user/userSlice';
import { useEffect, useRef, useState } from 'react';
import { app } from '../firebase';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { FaChevronCircleRight, FaSignInAlt } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';
import { IoIosContact, IoIosHome } from 'react-icons/io';
import { SiAboutdotme } from 'react-icons/si';
import Sidebar from '../components/Sidebar';

export default function Profile() {
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const {currentUser, loading, error} = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [formData, setFormData] = useState({});
  const [uploadPerc, setUploadPerc] = useState(0);
  const [fileError, setFileError] = useState(false);

  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (file) {
      handleUploadFile(file);
    }
  }, [file])
  
  const handleUploadFile = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    
    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setUploadPerc(Math.round(progress))
    },
    (error) => {
      setFileError(true);
      console.log(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setFormData({...formData, avatar : downloadURL});
      })
    }
    )
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id] : e.target.value
    });
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart())
      
      const response = await fetch(`/api/user/update/${currentUser._id}`, {
        method : 'POST',
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));


    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  }

  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart())
      const response = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE'
      });
  
      const data = await response.json();

      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  }

  const handleSignOut = async () => {
    try {
      dispatch(signOutStart());

      const res = await fetch('api/auth/signout');
      const data = await res.json();
  
      if (data.success === false) {
        dispatch(signOutFailure(data.message));
        return;
      }
      dispatch(signOutSuccess(data));
    } catch (error) {
      dispatch(signOutFailure(error.message));
    }
  }


  return (
    <>
      {/* <Header2/> */}
      <div className="dark:bg-slate-800">
        <div className="flex justify-between">
            <Sidebar/>
            <div className="home h-screen font-semibold flex-1">
                <Header/>
                <div className='m-3'>
                  <div className='my-6 p-3 rounded bg-slate-800 sm:w-2/4  mx-auto'>
                    <h1 className='text-gray-100 text-xl text-center'>Profile</h1>
                    <form onSubmit={handleSubmit} className='flex items-center flex-col gap-3 mt-4' accept='image/*'>
                      <input type="file" onChange={(e) => setFile(e.target.files[0])} ref={fileRef} className='hidden'/>
                      <img onClick={() => fileRef.current.click()} src={formData.avatar || currentUser.avatar} className='cursor-pointer object-cover rounded-full w-24 h-24'/>
                      {
                        fileError ? (<span className='text-red-700'>Error while uploading image</span>) :
                        uploadPerc > 0 && uploadPerc < 100 ? (<span>{ `Uploading is ${uploadPerc}% done` }</span>)
                        : uploadPerc === 100 ? (
                          <span className='text-gray-100'>Image successfully uploded!</span>
                        ) : (
                          ''
                        )
                      }
                      <input type="text" className='p-2 w-full rounded' onChange={handleChange} placeholder='Username' id='username' defaultValue={currentUser.username}/>
                      <input type="text" className='p-2 w-full rounded' onChange={handleChange} placeholder='Example@gmail.com' id='email' defaultValue={currentUser.email}/>
                      <input type="number" className='p-2 w-full rounded' onChange={handleChange} placeholder='Phone Number' id='mobile' defaultValue={currentUser.mobile}/>
                      <input type="text" className='p-2 w-full rounded' onChange={handleChange} placeholder='Password' id='password'/>
                      <button className='uppercase bg-gray-100 sm:w-40 p-2 w-52 bg-slate- rounded-lg font-semibold text-1xl'>
                        {loading ? 'Loading...' : 'Update'}
                      </button>
                      <button type='button' className='w-full bg-gray-100 rounded-lg p-2 uppercase font-semibold'>
                        <Link to='/estate-listing'>
                          create a listing
                        </Link>
                      </button>
                    </form>
                    <div>{error ? (<p className='text-red-600 py-1'>{error}</p>) : ''}</div>
                    <div className='flex justify-between py-2 text-gray-100 font-semibold'>
                      <span className='cursor-pointer text-red-600' onClick={handleDelete}>Delete Account</span>
                      <span className='cursor-pointer' onClick={handleSignOut}>Sign Out</span>
                    </div>
                  </div>
              </div>
            </div>
        </div>
    </div>
    </>
  )
}
