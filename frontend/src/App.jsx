import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import RequiredAuth from './features/auth/RequiredAuth'
import Sign_in from './features/auth/Sign_in'
import Welcome from './features/auth/Welcome'
import Sign_up from './features/auth/Sign_up'
import Unathorized from './components/Unauthorized'
import Profile from './features/user/Profile'
import CreateListing from './features/Llisting/CreateListing'
import SingleListing from './features/Llisting/SingleListing'
import Listings from './features/Llisting/Listings'
import EditListing from './features/Llisting/EditListing'


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />} >
        {/* public routes */}
        <Route index element={<Public />} />
        <Route path='/signup' element={<Sign_up />} />
        <Route path='/signin' element={<Sign_in />} />
        <Route path='/unauthorized' element={<Unathorized />} />
        <Route path='/listings' element={<Listings />} />
  
   


        {/* protected routes */}
        <Route element={<RequiredAuth allowedRoles={[201]} />}>
          <Route path='/welcome' element={<Welcome />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/createlisting' element={<CreateListing/>} />
          <Route path='/listing/:id' element={<SingleListing />} />
          <Route path='/edit_listing/:id' element={<EditListing />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
