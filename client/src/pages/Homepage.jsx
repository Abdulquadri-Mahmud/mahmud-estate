import Header from "../components/Header";
import { IoSearchSharp } from "react-icons/io5";
import Sidebar from "../components/Sidebar";
import DisplayIEstateImg from "../components/DisplayIEstateImg";

export default function Homepage() {

  return (
    <div className="dark:bg-slate-800">
        <div className="flex justify-between ">
            <Sidebar/>
            <div className={`h-scfont-semibold flex-1`}>
                <Header/>
                <div className="flex justify-center">
                    <div className="estate_img mx-1 flex justify-center items-center relative">
                        <div className="font-semibold text-white text-center w-4/5 sm:w-2/4  py-3 bg-gray-700 rounded-full bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20">
                            <h2 className="text-1xl ">LET US GUIDE YOUR HOME </h2>
                            <h2 className="text-2xl mt-4">Find Your Future Dream Home...</h2>
                        </div>
                    </div>
                </div>
                <DisplayIEstateImg/>
                <main className="dark:text-gray-100 dark:bg-slate-800">
                    <div className="flex justify-center">
                        <div className="search_wrap bg-slate-500 w-2/4 shadow-lg rounded-full">
                            <form className="rounded-lg relative">
                                <input type="text" className="w-full p-2 rounded-full text-gray-100 focus:outline-zinc-200 bg-slate-700 font-semibold" id="search" placeholder="Search..."/>
                                <label htmlFor="search"><IoSearchSharp className="absolute right-5 top-3 font-bold text-1xl cursor-pointer text-gray-100 " id="input"/></label>
                            </form>
                        </div>
                    </div>
                    <div className="flex justify-around flex-wrap">
                        <div className="text-center my-4 text-1xl w-4/12 p-3 m-2 bg-slate-400">Home page</div>
                        <div className="text-center my-4 text-1xl w-4/12 p-3 m-2 bg-slate-400">Home page</div>
                        <div className="text-center my-4 text-1xl w-4/12 p-3 m-2 bg-slate-400">Home page</div>
                        <div className="text-center my-4 text-1xl w-4/12 p-3 m-2 bg-slate-400">Home page</div>
                        <div className="text-center my-4 text-1xl w-4/12 p-3 m-2 bg-slate-400">Home page</div>
                        <div className="text-center my-4 text-1xl w-4/12 p-3 m-2 bg-slate-400">Home page</div>
                        <div className="text-center my-4 text-1xl w-4/12 p-3 m-2 bg-slate-400">Home page</div>
                        <div className="text-center my-4 text-1xl w-4/12 p-3 m-2 bg-slate-400">Home page</div>
                        <div className="text-center my-4 text-1xl w-4/12 p-3 m-2 bg-slate-400">Home page</div>
                    </div>
                </main>
            </div>
        </div>
    </div>
  )
}
