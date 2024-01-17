import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
// import {Swiper, SwiperSlide} from 'swiper/react';
// import SwtiperCore from 'swiper';
// import {Navigation} from 'swiper/modules';
// import 'swiper/css/bundle';
import { TbCurrencyNaira } from "react-icons/tb";
import { FaChair, FaMapMarkerAlt, FaShare } from "react-icons/fa";
import { MdBedroomChild } from "react-icons/md";
import { FaBath } from "react-icons/fa6";
import { FaSquareParking } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import Sidebar from "../components/Sidebar";
// import { list } from "firebase/storage";

 
export default function Listings() {
  // SwtiperCore.use([Navigation]);

  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [image, setImage] = useState(null);
  const [copyUrl, setCopyUrl] = useState(null)

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);

        const res = await fetch(`/api/listing/getListing/${params.listingId}`);
        const data = await res.json();
        if(data.success === false){
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        console.log(listing);
        setLoading(false);
        setError(false)
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    }
    fetchListing();
  }, [params.listingId]);

  const handleImageClick = (e) => {
    setImage(e.target.src);
  }
  const handleCopyUrl = () => {
    const copyUrl = navigator.clipboard.writeText(window.location.href);
    setCopyUrl(copyUrl);
  }

  return (
    <div className="dark:bg-slate-800 md:mx-0">
        <div className="flex justify-between ">
            <Sidebar/>
            <div className={`font-semibold flex-1`}>
                <Header/>
                <main className="">
                  <div className="flex justify-center items-center">
                    <div className="absolute top-80">
                      {loading && (<p className="text-center w-52 h-14 rounded-lg my-10 text-2xl bg-slate-800 text-gray-50 flex justify-center items-center font-semibold">
                        <svg className="animate-spin h-5 w-5 bg-gray-50 mr-3 ... rounded-lg" viewBox="0 0 24 24"></svg>Loading...
                      </p>)}

                      {
                        error && (<p className="text-4xl font-semibold">Something went wrong!</p>)
                      }
                    </div>
                  </div>
                  <div className="dark:bg-slate-800 dark:text-gray-50">
                    {
                      listing && !loading && !error && (
                        <div className="flex justify-between flex-col py-10 md:flex-row  mx-3 md:mx-0">
                          <div className="md:w-[50%] w-full bg-slate-800 dark:bg-slate-700 p-2 rounded md:ml-2 ml-0">
                            <div className="w-full relative">
                              <div className="">
                                <img src={image ? image : listing.imageUrls[0]} alt="" className="rounded w-[100%] h-[100%]"/>
                              </div>
                              <div className="">
                                <p className="absolute top-10 right-10 bg-gray-50 p-4 rounded-full cursor-pointer" onClick={handleCopyUrl}><FaShare className="text-slate-800 "/></p>
                                {
                                  copyUrl && (
                                    <div className="absolute top-6 right-20 bg-gray-50 p-1 rounded-lg rounded-br-none">
                                      <p className="2">Copied</p>
                                    </div>
                                )}
                                {
                                  setTimeout(() => {
                                  setCopyUrl(false);
                                }, 3000)
                                }
                              </div>
                            </div>
                            <div className="flex gap-2 justify-center mt-3">
                              {
                                listing.imageUrls.map((url) => (
                                  <div className="w-[20%]" key={url}>
                                    <img src={url} alt="" className="rounded cursor-pointer object-cover md:h-20" onClick={handleImageClick}/>
                                  </div>
                                ))
                              }
                            </div>
                          </div>
                          {/* <Swiper navigation className="md:w-[50%] w-full bg-slate-800 p-2 rounded ">
                            {
                              listing.imageUrls.map((url) => (
                                <SwiperSlide key={url} className="w-full">
                                  <div className="h-[550px] rounded" style={{background: `url(${url}) center no-repeat`, backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
                                </SwiperSlide>
                              ))
                            }
                          </Swiper> */}
                          <div className="md:w-[45%] w-full mt-8 md:mt-0 p-2">
                            <div className="flex">
                              <h1 className="font-semibold text-xl flex items-center flex-wrap break-words">{listing.name} - <TbCurrencyNaira/> {' '} 
                                { listing.offer ? listing.discountPrice : listing.regularPrice
                                }{listing.type === 'rent' && '/ month'}
                              </h1>
                            </div>
                            <div className="flex items-center my-7">
                              <FaMapMarkerAlt className="text-green-700 mr-2"/>
                              <p className="text-sm font-semibold">{listing.address}</p>
                            </div>
                            <div className="flex items-center gap-x-4">
                              <p className="w-4/12 h-10 justify-center flex items-center rounded-lg text-gray-50 bg-red-900">
                                {
                                  listing.type === 'rent' ? (<span className="flex items-center gap-1"> <GoDotFill className="text-1xl text-gray-100"/> For Rent</span>) : 'For Sale'
                                }
                              </p>
                              {
                                listing.offer && (
                                  <p className="w-4/12 h-10 justify-center flex items-center rounded-lg text-gray-50 bg-green-900">${+listing.regularPrice - +listing.discountPrice}</p>
                                )
                              }
                            </div>
                            <div className=" pt-5">
                              {
                                listing.description && (
                                  <p className="leading-7 text-sm pr-4 text-slate-800 dark:text-gray-50"><span className="font-semibold text-blac text-xl dark:text-gray-50">Descriptions -</span> {listing.description}</p>
                                )
                              }
                            </div>
                            <div className="flex gap-5 flex-wrap my-5 text-1xl font-semibold">
                              {
                                listing.bedRooms === 1 ? (<p className="flex items-center gap-1"><MdBedroomChild className="text-green-700 text-xl"/> {listing.bedRooms}-Bed </p>) 
                                : (<p className="flex items-center gap-1"><MdBedroomChild className="text-green-700 text-xl"/> {listing.bedRooms}-Beds </p>)
                              }
                              {
                                listing.bathRooms === 1 ? (<p className="flex items-center gap-1"><FaBath className="text-green-700 text-xl"/> {listing.bathRooms}-Bath</p>) 
                                : (<p className="flex items-center gap-1"><FaBath className="text-green-700 text-xl"/> {listing.bathRooms}-Baths</p>)
                              }
                              {
                                listing.parking ? (<p className="flex items-center gap-1"><FaSquareParking className="text-green-700 text-xl"/>Parking spot</p>) : (<p>No parking spot</p>)
                              }
                              {
                                listing.furnished ? (<p className="flex items-center gap-1"><FaChair className="text-green-700 text-xl"/>Furnished</p>) 
                                : (<p className="flex items-center gap-1"><FaChair className="text-green-700 text-xl"/>Unfurnished</p>)
                              }
                            </div>
                            <div className="">
                              <button className="uppercase text-center w-full rounded bg-green-700 text-gray-50 font-semibold p-3">Contact lanlord</button>
                            </div>
                          </div>       
                        </div>
                      )
                    }
                  </div>
                </main>
          </div>
        </div>
    </div>
  )
}
