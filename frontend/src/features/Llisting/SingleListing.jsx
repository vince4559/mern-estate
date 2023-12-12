import React from 'react'
import { useLocation } from 'react-router-dom'
import ImageCarosel from '../../components/ImageCarosel';
import { IoLocationSharp } from "react-icons/io5";
import { FaBed, FaBath, FaParking, FaChair   } from "react-icons/fa";



const SingleListing = () => {
  const location = useLocation();
 const listing = location.state;
 const photo = listing.photos;

  return (
   <section>
      <ImageCarosel photo={photo} />
      <div className='px-10 my-5 w-[70%] mx-auto'>
        <h2 className='uppercase'>{listing.name}</h2>

        <h3 className='bold'>
          {listing.type === 'Rent'? `$${listing.regularPrice} / Month` : `$${listing.regularPrice}`}
        </h3>
        
        <p className='flex items-center gap-1'>
          <span><IoLocationSharp size={18} color='green' /></span>
          {listing.address}
        </p>

        <div className='flex gap-5'>
            <p className='py-1 px-2 bg-red-800 w-fit rounded my-3 text-white'>For {listing.type}</p>
            <p className='py-1 px-2 text-green-500 w-fit rounded my-3'>
             {listing.discountPrice === 0 ? '' : ` Discount Price: $${listing.discountPrice}`}
            </p>
        </div>
        <p>Description:
            <span>{listing.desc}</span>
        </p>

        <div className='flex gap-5 my-4'>
          <p className='flex gap-1 items-center'>
            <FaBed size={18} color='green' />
            {listing.bedroom} {listing.bedroom > 1 ? 'Beds' : 'Bed'}
          </p> 

          <p className='flex gap-1 items-center'>
            <FaBath size={18} color='green' />
            {listing.bathroom} {listing.bathroom > 1 ? 'Baths' : 'Bath'}
          </p> 
          
          <p className='flex gap-1 items-center'>
            <FaParking  size={18} color='green' />
            {listing.parkingLot == true? 'Parking Slot' : 'No Parking' }
          </p> 

          <p className='flex gap-1 items-center'>
            <FaChair   size={18} color='green' />
            {listing.furnished == true? 'Furnished' : 'Not Furnished' }
          </p> 
       
        </div>

        <button className='btn btn-sec w-full'>Contact landlord</button>
      </div>
   </section>
  )
}

export default SingleListing