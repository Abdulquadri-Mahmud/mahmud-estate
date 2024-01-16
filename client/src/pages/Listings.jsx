import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import {Swiper, SwiperSlide} from 'swiper/react';
import SwtiperCore from 'swiper';
import {Navigation} from 'swiper/modules';
import 'swiper/css/bundle';

 
export default function Listings() {
  SwtiperCore.use([Navigation]);

  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
  return (
    <main>
      <Header/>
      <div className="flex justify-center items-center">
        <div className="absolute top-80">
          {loading && (<p className="text-center w-52 h-14 rounded-lg my-10 text-2xl bg-slate-800 text-gray-50 flex justify-center items-center font-semibold"><svg className="animate-spin h-5 w-5 bg-gray-50 mr-3 ... rounded-lg" viewBox="0 0 24 24"></svg>Loading...
          </p>)}

          {
            error && (<p className="text-4xl font-semibold">Something went wrong!</p>)
          }
        </div>
      </div>
      <div className="">
        {
          listing && !loading && !error && (
            <>
              <Swiper navigation>
                {
                  listing.imageUrls.map((url) => (
                    <SwiperSlide key={url} className="w-full">
                      <div className="h-[550px] w-full" style={{background: `url(${url}) center no-repeat`, backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
                    </SwiperSlide>
                  ))
                }
              </Swiper>          
            </>
          )
        }
      </div>
    </main>
  )
}
