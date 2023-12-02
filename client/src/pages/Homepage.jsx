// import React from 'react';
// import { IoSearchSharp } from "react-icons/io5";
import { FaArrowDownLong } from "react-icons/fa6";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function Homepage() {
  return (
    <div className="h-full dark:bg-slate-700">
        <Header/>
        <div className="flex justify-between">
            <div className="sidebar">
                <Sidebar/>
            </div>
            <div className="home mt-12">
                <div className="flex justify-center">
                    <div className="estate_img m-2 flex justify-center items-center relative">
                    <svg className="motion-safe:animate-spin h-5 w-5 mr-3 bg-gray-200 absolute bottom-0 left-0 m-4" viewBox="0 0 24 24"></svg>
                    <svg className="motion-safe:animate-spin h-5 w-5 mr-3 bg-gray-200 absolute bottom-0 right-0 m-4" viewBox="0 0 24 24"></svg>
                        <div className="font-semibold text-white text-center p-3 bg-gray-400 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 sm:m-2">
                            <h2 className="text-1xl ">LET US GUIDE YOUR HOME </h2>
                            <h2 className="text-3xl mt-4">Find Your Future Dream Home...</h2>
                        </div>
                    </div>
                </div>
                <div className="svg2 flex justify-center m-6 w-full">
                    <svg className="animate-bounce w-12 h-12 bg-zinc-900 rounded-full p-3"><FaArrowDownLong className="text-white font-semibold text-2xl"/></svg>
                </div>
            </div>
            {/* <div className="home_main p-2">
                <h1>Home Page</h1>
            </div> */}
        </div>
    </div>
  )
}
