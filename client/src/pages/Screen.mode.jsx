// import React from 'react';

import { useEffect, useState } from "react"

export default function ScreenMode() {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark')
        }else{
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);
    const handleThemeSwitch = () => {
        setTheme(theme === "dark" ? "light" : "dark")
    }
  return (
    <div className="h-screen bg-slate-200 dark:bg-slate-800 flex justify-center items-center">
      <button className="bg-slate-300 rounded-3xl p-2" onClick={handleThemeSwitch}>Dark Mode</button>
    </div>
  )
}
