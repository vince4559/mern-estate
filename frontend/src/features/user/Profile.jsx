import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { currentEmail, currentUser, current_id } from '../auth/authSlice'
import { useUpdateUserMutation, useDeleteUSerMutation} from './userApiSlice'
import Sign_out from '../../features/auth/Sign_out'
import { useNavigate } from 'react-router-dom'
import { logOut } from '../auth/authSlice'
import { ToastContainer, toast } from 'react-toastify';
import userImg from '/images/userImg.png'
import { useUserListingQuery } from './userApiSlice';




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

  const [updateUSer, {isLoading}] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUSerMutation();



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

  const  {data} = useUserListingQuery({id: newID});
 

  // user listing category

    const handleShowListing = async() => {
       try {
          const listings = await data;
          setListings(listings)
       } catch (error) { 
       }
    };

  

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

         <button onClick={handleShowListing} className='btn btn-sec my-3'>Show Listings</button>

         {listings && listings < 1 ? <p>No listing created</p> 
          :  [...listings].map(listing => (
            <div key={listing._id} className='my-4'>
                <div className='flex gap-5 items-center'>
                    <div className='flex gap-3 items-center'>
                      <img src={listing.photos[0]} alt={listing.name} className='w-10 h-10 rounded-full'/>
                      <p>{listing.name}</p>
                    </div>

                    <div className='flex gap-3 items-center'>
                      <p >Edit</p>
                      <p>delete</p>
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