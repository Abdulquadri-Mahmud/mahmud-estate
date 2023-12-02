// import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import GoogleAuth from "../components/GoogleAuth";
import Header2 from "../components/Header2";
import { useState } from "react";

export default function Signup() {
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id] : e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            const res = await fetch('/api/auth/signup', {
                method : 'POST',
                headers : {'Content-Type' : 'application/json'},
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            console.log(data);
            navigate('/signin');
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <>
        <Header2/>
        <div className='m-3'>
            <div className='max-w-6xl mx-auto bg-gray-200 mt-10 p-3 rounded-lg sign_cont'>
                <div className='singin_wrap flex flex-col  gap-4 sm:flex-row'>
                    <div className="signin_img flex justify-center items-center sm: w-full">
                        <h1 className='mt-10 absolute font-semibold text-zinc-100 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 p-4 rounded-lg text-3xl sm: text-xl'>WELCOME TO MAHMUD ESTATE</h1>
                    </div>
                    <div className='w-8/12 flex flex-col sm: w-full'>
                        <h1 className='text-center mb-5 text-2xl font-bold text-zinc-9800'>Sign Up</h1>
                        <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
                            <input type="text" placeholder='Username...' id="username" className='focus:outline-zinc-300 p-3 rounded-lg bg-white' onChange={handleChange}/>
                            <input type="email" placeholder='Example@gmail.com' id="email" className='focus:outline-zinc-300 p-3 rounded-lg bg-white' onChange={handleChange}/>
                            <input type="text" placeholder='Mobile' id="mobile" className='focus:outline-zinc-300 p-3 rounded-lg bg-white' onChange={handleChange}/>
                            <input type="password" placeholder='Password...' id="password" className='focus:outline-zinc-300 p-3 rounded-lg bg-white' onChange={handleChange}/>
                            <button className='bg-zinc-700 rounded-lg p-4 text-gray-100 font-semibold hover:opacity-90'>Sign In</button>
                        </form>
                        <GoogleAuth/>
                        <div className='flex pt-5 gap-2'>
                            <p className='font-semibold'>Already have an account?</p>
                            <Link to='/signin'>
                                <span className='font-semibold text-blue-700'>Sign In</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
