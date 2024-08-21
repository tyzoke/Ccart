import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

//user not fetch directly shipping page without login
const AdminRoute = () => {
    const {userInfo} = useSelector(state=>state.login)
  return (userInfo && userInfo.isAdmin ?<Outlet/>:<Navigate to='users/login' replace/>)
}

export default AdminRoute