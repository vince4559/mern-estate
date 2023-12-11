import React from 'react'
import { useLocation } from 'react-router-dom'


const SingleListing = () => {
  const location = useLocation();
 const listing = location.state;
//  console.log(listing)
  return (
   <section>
      <h2>Single listings choke here</h2>
      <img src={listing.photos[2]} alt={listing.name} />

      <h1>{listing.name}</h1>
      <h1>{listing.desc}</h1>
   </section>
  )
}

export default SingleListing