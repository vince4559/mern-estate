import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currentEmail, currentUser, current_id } from '../auth/authSlice';
import Sign_out from '../../features/auth/Sign_out';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../auth/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import userImg from '/images/userImg.png';
import { 
  useUpdateUserMutation, 
  useDeleteUSerMutation, 
  useUserListingQuery,
} from './userApiSlice';
import { useDeleteListingMutation } from '../Llisting/listingApiSlice';






const Profile = () => {
  const user = useSelector(currentUser);
  const mail = useSelector(currentEmail);
  const newID = useSelector(current_id);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const[username, setUsername] = useState(user);
  const[email, setEmail] = useState(mail);
  const[password, setPassword] = useState('');
  const [listings, setListings] = useState([]);
  const [show, setShow] = useState(false);



  const [updateUSer, {isLoading}] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUSerMutation();  
  const  {data, isFetching} = useUserListingQuery({id: newID});
  const [deleteListing] = useDeleteListingMutation();


  const handleUpdateUSer = async (e) => {
    e.preventDefault();
    const data = {
      email,
      username:user,
      password
    }
    try {
      if(window.confirm("Are you sure?") === true){
        toast.success("User Updated Succesfully");
        await updateUSer({id:newID, data}).unwrap();
      }
    
    } catch (error) {
      console.log(error)
      toast.error('Error occured...')
    }
  };

  const handleDeleteUSer = async() => {
    try {
      if(window.confirm('Account Deleted Cannot be Recovered') === true){
        await deleteUser(newID).unwrap();
        dispatch(logOut())
        toast.success('User deleted successfully')
        navigate("/")
      }
      
      
    } catch (error) {
      console.log(error)
      toast.error("An Error Occured")
    }
  };


  // show user listing
    const handleShowListing = async() => {
      const dat = await data
      setShow(!show);
     setListings(dat)
    };

    // edit user listing
    const handleUpdateListing = async(listing) => {
      try {
        navigate(`/edit_listing/${listing._id}`, {state: listing})
      } catch (error) {
        console.log(error)
      }
    };

    // navigate to single user listing
    const handleNav = (listing) => {
      navigate(`/listing/${listing._id}`, {state:listing})
    }

  return (
    <section className='flex gap-4 justify-center mt-4 p-4'>
      <div> 
        <img src={userImg} alt='profile img' loading='lazy' className='w-20 rounded-full mx-auto'  />
          <form onSubmit={handleUpdateUSer}  > 
            <label htmlFor='username'>Username: <br/>
                <input type='text' value={username}  onChange={(e) => {setUsername(e.target.value)}}/>
            </label>

            <label htmlFor='email'>Email: <br/>
                <input type='text' value={email} onChange={(e) => {setEmail(e.target.value)}} />
            </label>

            <label htmlFor='password'>password: <br/>
                <input type='password' value={password} onChange={(e) => {setPassword(e.target.value)}} />
            </label>
            <button className='btn btn-sec w-full' disabled={isLoading}>Update</button>
          </form>

        <button onClick={() => {
          navigate('/createlisting')
        }}  className='btn btn-prim mt-5 w-full'>Create Listing</button>

          <div className='flex  gap-8 mt-4'>
          <button onClick={handleDeleteUSer} disabled={isLoading} className='text-red-600'>
            {isLoading ? 'Loading' : 'Delete Account'}
            </button>
          <Sign_out />
         </div>

         <button onClick={handleShowListing} className='btn btn-sec my-3'>{show? "Hide Listing" : isFetching? 'Loading': "Show Listing"}</button>

         {isFetching ? <p>loading</p> : show == true &&
          listings.map(listing => (
            <div key={listing._id} className='my-4'>
                <div className='flex gap-5 items-center'>
                    <div onClick={() => handleNav(listing)} className='flex gap-3 items-center cursor-pointer'>
                      <img src={listing.photos[0]} alt={listing.name} className='w-10 h-10 rounded-full'/>
                      <p>{listing.name}</p>
                    </div>

                    <div className='flex gap-3 items-center'>
                      <button onClick={() => handleUpdateListing(listing)}>
                        Edit
                      </button>
                      {/* delete listing */}
                      <button onClick={ async() => {
                            try {
                              await deleteListing(listing._id);
                              toast.success("listing deleted")
                              navigate('/profile')
                            } catch (error) {
                              console.log(error)
                              toast.error('Error occured')
                            }
                          }}>
                        delete
                      </button>
                    </div>
                </div>
            </div>
          )) 
         }
      </div>
      <ToastContainer 
            autoClose={1000}
            draggable
            theme='dark'
        />

  </section>
  )
}

export default Profile