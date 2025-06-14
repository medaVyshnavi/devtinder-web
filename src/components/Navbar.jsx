import axios from 'axios';
import React from 'react'
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants"

 
const Navbar = () => {
  const userData = useSelector(state => state.user);
  const navigate = useNavigate();

  const handleLogout = async() => {
    try {
      const response= await axios.post(BASE_URL + "/logout", {},{ withCredentials: true })
      if (response.status === 200) {
        navigate("/login")
      }
      
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">👩‍💻DevTinder</a>
      </div>
      <div className="flex gap-2 justify-between items-center">
        <p>Welcome, {userData?.firstName} !</p>
        <div className="dropdown dropdown-end mx-6">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={userData?.photoURL}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="profile">Profile</Link>
            </li>
            <li>
              <a onClick={() => handleLogout()}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar