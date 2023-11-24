import React from 'react'

const Profile = () => {
    const email = localStorage.getItem('email');
    const username = localStorage.getItem('username');
    const roles = localStorage.getItem('roles');
  return (
    <section className='flex gap-4'>
        <h2>Profile</h2>
        <image src='' alt='profile' />
      
    </section>
  )
}

export default Profile