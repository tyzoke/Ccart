import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

//user not fetch directly shipping page without login
const PrivateRoute = () => {
    const {userInfo} = useSelector(state=>state.login)
  return (userInfo?<Outlet/>:<Navigate to='users/login' replace/>)
}

export default PrivateRoute