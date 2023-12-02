// import React from 'react';
import { MdOutlineRoundaboutRight } from "react-icons/md";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function About() {
  return (
    <>
        <Header/>
        <div className="flex justify-between">
            <div className="sidebar">
                <Sidebar/>
            </div>
            <div className="home mt-12">
                <div className="flex m-2 justify-center">
                    <div className="estate_img estate_img2 flex justify-center items-center relative">
                        <svg className="motion-safe:animate-spin h-5 w-5 mr-3 bg-gray-200 absolute bottom-0 left-0 m-4" viewBox="0 0 24 24"></svg>
                        <svg className="motion-safe:animate-spin h-5 w-5 mr-3 bg-gray-200 absolute bottom-0 right-0 m-4" viewBox="0 0 24 24"></svg>
                        <div className="font-semibold text-white text-center flex items-center gap-4 p-6 bg-gray-400 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20">
                            <h2 className="text-4xl ">About Us</h2>
                            <MdOutlineRoundaboutRight  className="font-bold text-4xl"/>
                        </div>
                    </div>
                </div>
                <div className="home_main p-2">
                    <h1>About Page</h1>
                </div>
            </div>
        </div>
    </>
  )
}
