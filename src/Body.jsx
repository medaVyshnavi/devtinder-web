import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from "./components/Footer";
import {Outlet, useNavigate } from 'react-router-dom'
import { BASE_URL } from './utils/constants';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from './app/userSlice';

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector(state => state.user)
  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(BASE_URL + "/profile/view", { withCredentials: true });
      dispatch(addUser(response.data))
    } catch (err) {
      if (err.status === 401) {
        alert(err.response.statusText)
      }
      navigate("/login")
      console.log(err)
    }
  }

  useEffect(() => {
    if (!data) {
      fetchUserDetails();
    }
  }, [])
  
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Body