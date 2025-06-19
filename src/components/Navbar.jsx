import axios from 'axios';
import React, {useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants"
import { removeUser } from '../app/userSlice';

const Navbar = () => {
  const userData = useSelector(state => state.user);
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [toastMessage, setToastMessage] = useState("")
  const [isError,setIsError] = useState(false)

  const handleLogout = async () => {
    setIsError(false);
    try {
      const response = await axios.post(
        BASE_URL + "/logout",
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        dispatch(removeUser());
        navigate("/login");
        setToastMessage(response.data.message);
      }
    } catch (error) {
      setIsError(true);
      setToastMessage(error.response.data.message);
      console.log(error.response.data);
    } finally {
      setTimeout(() => {
        setToastMessage(false);
      }, 3000);
    }
  }
  return (
    <>
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

      {toastMessage && (
        <div className="toast toast-top toast-end">
          <div className={`alert ${isError ? "alert-error" : "alert-success"}`}>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar