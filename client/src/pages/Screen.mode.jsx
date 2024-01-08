// import React from 'react';
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";

export default function ScreenMode() {
    const [theme, setTheme] = useState('light');

    const { currentUser } = useSelector((state) => state.user)

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark')
        }else{
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);
    const handleThemeSwitch = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    }

  return (
    <>
      <Sidebar/>
      <div className="h-screen bg-slate-200 dark:bg-slate-800 flex flex-col gap-4 justify-center items-center">
        <div className="w:w-0 p-3 bg-slate-700"></div>
        <button className="bg-slate-300 rounded-3xl p-2" onClick={handleThemeSwitch}>Dark Mode</button>
        <p className="dark:text-slate-100">{currentUser._id}</p>
        <p className="dark:text-slate-100"><img src={currentUser.avatar} className="w-10 rounded-full" alt="" /></p>
        <p className="dark:text-slate-100">{currentUser.email}</p>
        <p className="dark:text-slate-100">{currentUser.mobile}</p>

        {/* <div className="" key={currentUser._id}>
          {currentUser.map((user) => (
            <p>{user}</p>
          ))}
        </div> */}
      </div>
    </>
  )
}
