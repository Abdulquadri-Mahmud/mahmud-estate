// import React from 'react';
// import est1 from '../assets/est1.jpg';
import est2 from '../assets/est2.jpg';
import est3 from '../assets/est3.jpeg';
import est4 from '../assets/estate1.jpg';
import est5 from '../assets/estate2.jpg';


export default function DisplayIEstateImg() {
  return (
    <div className='flex flex-wrap justify-center gap-3 mt-10'>
        <div className="image rounded-lg ">
            <img src={est2} alt="estate" className='object-cover rounded-lg'/>
        </div>
        <div className="image rounded-lg ">
            <img src={est3} alt="estate" className='object-cover rounded-lg'/>
        </div>
        <div className="image rounded-lg ">
            <img src={est4} alt="estate" className='object-cover rounded-lg'/>
        </div>
        <div className="image rounded-lg ">
            <img src={est5} alt="estate" className='object-cover rounded-lg'/>
        </div>
        </div>
  )
}
