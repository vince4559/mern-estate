import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
    <Header />
    <Outlet />
    {/* footer */}
    </>
  )
}

export default Layout
