import { Routes, Route } from "react-router-dom";
import React from 'react'
import Home from "./screens/Home";
import Profile from "./screens/Profile";

const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
    </Routes>
  )
}

export default AllRoutes