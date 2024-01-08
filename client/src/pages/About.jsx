import Header from "../components/Header";
import Sidebar from "../components/Sidebar";


export default function About() {
    
    return (
        <div className="dark:bg-slate-800">
            <div className="flex justify-between">
                <Sidebar/>
                <div className="home h-screen font-semibold flex-1">
                    <Header/>
                    <div className="flex justify-center">
                        <div className="estate_img mx-1 mt-4 flex justify-center items-center relative">
                            <div className="font-semibold text-white text-center p-3 bg-gray-400 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20">
                                <h2 className="text-3xl ">About Us</h2>
                            </div>
                        </div>
                    </div>
                    {/* <DisplayIEstateImg/> */}
                    <main>
                        <h1 className="text-center my-4 text-xl">About Page</h1>
                    </main>
                </div>
            </div>
        </div>
    )
}
