// import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { deleteUserFailure, deleteUserStart, deleteUserSuccess,
   signOutFailure, signOutStart, signOutSuccess, updateUserFailure,
    updateUserStart, updateUserSuccess } 
from '../redux/user/userSlice';
import { useEffect, useRef, useState } from 'react';
import { app } from '../firebase';
import { getDownloadURL, getStorage, list, ref, uploadBytesResumable } from 'firebase/storage';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { TbCurrencyNaira } from "react-icons/tb";
// import { FaChevronCircleRight, FaSignInAlt } from 'react-icons/fa';
// import { ImProfile } from 'react-icons/im';
// import { IoIosContact, IoIosHome } from 'react-icons/io';
// import { SiAboutdotme } from 'react-icons/si';
import Sidebar from '../components/Sidebar';

export default function Profile() {
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const {currentUser, loading, error} = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [formData, setFormData] = useState({});
  const [uploadPerc, setUploadPerc] = useState(0);
  const [fileError, setFileError] = useState(false);
  const [showListingError, setShowListingError] = useState(false);
  const [listingDeleteError, setListingDeleteError] = useState();
  const [userListing, setUserListing] = useState([]);

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
  const handleListing = async () => {
    try {
      setShowListingError(false);

      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();

      if (data.success === false) {
        setShowListingError(true);
         return;
      }
      setUserListing(data);
    } catch (error) {
      setShowListingError(error.message);
    }
  }
  
  const handleListingDelete = async (listingId) =>{
    try {
      setListingDeleteError(false);
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success === false) {
        setListingDeleteError(false);
      }
      setUserListing((prevData) => 
        prevData.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      setListingDeleteError('Error while deleting listing!',error)
    }

  }
  return (
    <>
      {/* <Header2/> */}
      <div className="dark:bg-slate-800">
        <div className="flex justify-between">
            <Sidebar/>
            <div className="home font-semibold flex-1">
                <Header/>
                <div className='m-2'>
                  <div className='my-6 p-3 shadow-2xl rounded bg-slate-800 md:w-2/4  mx-auto'>
                    <h1 className='text-gray-100 text-xl text-center'>My Profile</h1>
                    <form onSubmit={handleSubmit} className='flex items-center flex-col gap-4 mt-4' accept='image/*'>
                    <div className="flex justify-center">
                      <div className="bg-slate-700 p-2 rounded-full">
                        <input type="file" onChange={(e) => setFile(e.target.files[0])} ref={fileRef} className='hidden'/>
                        <img onClick={() => fileRef.current.click()} src={formData.avatar || currentUser.avatar} className='cursor-pointer object-cover rounded-full w-24 h-24'/>
                        </div>
                    </div>
                      {
                        fileError ? (<span className='text-red-700'>Error while uploading image</span>) :
                        uploadPerc > 0 && uploadPerc < 100 ? (<span>{ `Uploading is ${uploadPerc}% done` }</span>)
                        : uploadPerc === 100 ? (
                          <span className='text-gray-100'>Image successfully uploded!</span>
                        ) : (
                          ''
                        )
                      }
                      <input type="text" className='p-3 w-full rounded' onChange={handleChange} placeholder='Username' id='username' defaultValue={currentUser.username}/>
                      <input type="text" className='p-3 w-full rounded' onChange={handleChange} placeholder='Example@gmail.com' id='email' defaultValue={currentUser.email}/>
                      <input type="number" className='p-3 w-full rounded' onChange={handleChange} placeholder='Phone Number' id='mobile' defaultValue={currentUser.mobile}/>
                      <input type="text" className='p-3 w-full rounded' onChange={handleChange} placeholder='Password' id='password'/>
                      <button className='uppercase bg-gray-100 sm:w-40 p-3 w-52 bg-slate- rounded-full font-semibold text-1xl'>
                        {loading ? 'Loading...' : 'Update'}
                      </button>
                      <button type='button' className='w-full bg-gray-100 rounded-lg p-3 uppercase font-semibold'>
                        <Link to='/estate-listing'>
                          create a listing
                        </Link>
                      </button>
                      {
                        showListingError && (<p className='text-red-600 py-1'>{showListingError}</p>)
                      }
                    </form>
                    <div>{error ? (<p className='text-red-600 py-1'>{error}</p>) : ''}</div>
                    <div className="flex justify-center py-3">
                      <button className='uppercase text-center bg-green-600 text-gray-100 w-full rounded py-3' onClick={handleListing}>show listing</button>
                    </div>
                    <div className='flex justify-between py-2 text-gray-100 font-semibold'>
                      <span className='cursor-pointer text-red-600' onClick={handleDelete}>Delete Account</span>
                      <span className='cursor-pointer' onClick={handleSignOut}>Sign Out</span>
                    </div>
                  </div>
              </div>
              <div className="my-5 bg-slate-800 mx-2 rounded text-gray-100 p-3">
                <div className="flex justify-center py-3">
                  <p className='uppercase text-center bg-slate-700 md:w-3/12 w-5/12 rounded py-3'>Your Listings</p>
                </div>
                <div className="flex flex-wrap justify-center items-center gap-3 relative">
                  {
                    userListing && userListing.length > 0 &&
                      userListing.map((listing) => (
                        <div className="md:w-5/12 w-full flex flex-col p-2 bg-slate-700 rounded shadow-xl" key={listing._id}>
                            <img className='rounded object-contain shadow-2xl w-full' src={listing.imageUrls[0]} alt="" />
                            <div className="bg-slate-800 mt-3 rounded p-2">
                              <Link className='pt-2 truncate' to={`/listing/${listing._id}`}>
                                <span className='underline'>{listing.name}</span>
                              </Link>
                              <div className='py-2'>
                                {listing.regularPrice ? (<p className='flex items-center'><TbCurrencyNaira className='text-xl'/>{listing.regularPrice} &nbsp;
                                 <span className='w-10 h-7 text-center bg-slate-700 rounded'>{listing.type}</span></p>) : 
                                 (<p className='flex items-center'><TbCurrencyNaira className='text-xl'/>{listing.discountPrice}</p>)}
                              </div>
                              <div className="">
                                <p>{listing.bedRooms} beds | {listing.bathRooms} baths {listing.parking ? '| parking spot' : ''} {listing.furnished ? '| furnished' : ''}</p>
                                <p className='truncate py-2'>{listing.address}</p>
                              </div>
                              <div className="flex justify-between py-1">
                                <button className='bg-green-600 w-20 h-8 rounded shadow-md'>Edit</button>
                                <button className='bg-red-500 w-20 h-8 rounded shadow-md' onClick={()=> handleListingDelete(listing._id)}>Delete</button>
                              </div>
                            </div>
                        </div>
                      ))
                    }
                </div>
              </div>
            </div>
        </div>
    </div>
    </>
  )
}
