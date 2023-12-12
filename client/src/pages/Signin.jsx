// import React from 'react';
// import estate_img from '../assets/estate1.jpg';
import {Link, useNavigate} from 'react-router-dom';
// import GoogleAuth from '../components/GoogleAuth';
import Header2 from '../components/Header2';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice';

export default function Signin() {
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {loading, error} = useSelector((state) => state.user);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.id] : e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(signInStart)
            const res = await fetch('/api/auth/signin', {
                method : 'POST',
                headers : {'Content-Type' : 'application/json'},
                body : JSON.stringify(formData)
            });
            const data = await res.json();
            if (data.success === false) {
                dispatch(signInFailure(data.message));
                return;
            }
            dispatch(signInSuccess(data));
            navigate('/')
        } catch (error) {
            dispatch(signInFailure(error.message));
        }
    }

  return (
    <>
        <Header2/>
        <div className='m-3'>
            <div className='max-w-6xl mx-auto bg-gray-200 mt-10 p-3 rounded-lg sign_cont'>
                <div className='singin_wrap flex flex-col  gap-4 sm:flex-row'>
                    <div className="signin_img img w-8/12  flex justify-center items-center sm: w-full">
                        {/* <img src={estate_img} alt="estate" className='rounded-lg min-h-full opacity-100 filter saturate-100'/> */}
                        <h1 className='mt-10 absolute font-semibold text-zinc-100 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 p-4 rounded-lg text-3xl sm: text-xl'>WELCOME TO MAHMUD ESTATE</h1>
                    </div>
                    <div className='w-8/12 flex flex-col sm: w-full'>
                        <h1 className='text-center mb-5 text-3xl font-bold text-zinc-9800'>Sign In</h1>
                        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                            <input type="email" placeholder='Example@gmail.com' id='email' onChange={handleChange} className='focus:outline-zinc-300 p-3 rounded-lg bg-white'/>
                            <input type="password" placeholder='Password...' id='password' onChange={handleChange} className='focus:outline-zinc-300 p-3 rounded-lg bg-white'/>
                            <button disabled={loading} className='bg-zinc-700 rounded-lg p-3 text-gray-100 font-semibold hover:opacity-90'>
                                {loading ? 'Loading' : 'Sign In'}
                            </button>
                            {/* <GoogleAuth/> */}
                        </form>
                        <div>
                            {error && <p className='text-red-700 pt-4'>{error}</p>}
                        </div>
                        <div className='flex pt-5 gap-2'>
                            <p className='font-semibold'>Not have an account?</p>
                            <Link to='/signup'>
                                <span className='font-semibold text-blue-700'>Sign Up</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
