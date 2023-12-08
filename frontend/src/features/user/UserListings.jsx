import React from 'react'
import { useUserListingQuery } from './userApiSlice'
import { current_id } from '../auth/authSlice';
import { useSelector } from 'react-redux';


const UserListings = () => {
    const id = useSelector(current_id);
    
    const  {data, isLoading, isError} = useUserListingQuery({id});

    const handleShowListing = () => {
        if(isLoading){
            return <p>Loading...</p>
        }else if(data){
           return data.map(listing => (
            <div>
                {/* <p>{listing.name}</p> */}

            </div>
           ))
        }else if(isError){
            return <p>cannot get listings</p>
        }
    };

  return (
   <button onClick={handleShowListing} className='mt-4'>Show Listings</button>
  )
}

export default UserListings