import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants"
import { removeUser } from '../app/userSlice';

const Navbar = () => {
  const userData = useSelector(state => state.user);
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleLogout = async() => {
    try {
      const response = await axios.post(BASE_URL + "/logout", {}, { withCredentials: true })
      if (response.status === 200) {
        dispatch(removeUser());
        navigate("/login")
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <Link to={"/feed"} className="btn btn-ghost text-xl">
          👩‍💻DevTinder
        </Link>
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
              <Link to="connections">Connections</Link>
            </li>
            <li>
              <Link to="requests">Requests</Link>
            </li>
            <li>
              <Link onClick={() => handleLogout()}>Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar