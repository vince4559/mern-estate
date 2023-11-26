import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { currentEmail, currentUser, current_id } from '../auth/authSlice'
import { useUpdateUserMutation, useDeleteUSerMutation} from './userApiSlice'
import Sign_out from '../../features/auth/Sign_out'
import { useNavigate } from 'react-router-dom'
import { logOut } from '../auth/authSlice'
import { ToastContainer, toast } from 'react-toastify';
import userImg from '/images/userImg.png'




const Profile = () => {
  const user = useSelector(currentUser);
  const mail = useSelector(currentEmail);
  const newID = useSelector(current_id);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

console.log(newID)
  const[username, setUsername] = useState(user);
  const[email, setEmail] = useState(mail);
  const[password, setPassword] = useState('');

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
        navigate("/")
        toast.success('User deleted successfully')
      }
      
      
    } catch (error) {
      console.log(error)
      toast.error("An Error Occured")
    }
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

          <div className='flex  gap-8 mt-4'>
          <button onClick={handleDeleteUSer} disabled={isLoading} className='text-red-600'>
            {isLoading ? 'Loading' : 'Delete Account'}
            </button>
          <Sign_out />
      </div>
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