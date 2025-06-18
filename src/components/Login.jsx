import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux"
import { addUser } from "../app/userSlice"
import { BASE_URL } from "../utils/constants"
import { Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentPath = useLocation().pathname;

  const pageType = currentPath.includes("login") ? "Login" : "Signup"

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        BASE_URL + "/login",
        { email: email, password: password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        dispatch(addUser(response.data.data));
        navigate("/feed");
        
      }
    } catch (error) {
      // alert(error.response.data);
      console.log(error.response.data);
    } 
  } 

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(BASE_URL + "/signup", { firstName: firstName, lastName: lastName, email: email, password: password }, { withCredentials: true })
      if (response.status === 200) {
        dispatch(addUser(response.data.data));
        navigate("/feed/profile")
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="card bg-base-300 w-96 shadow-sm flex justify-center m-auto my-56">
      <div className="card-body">
        <h2 className="card-title">{pageType}</h2>
        {pageType === "Signup" && (
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">First Name </legend>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                className="input"
                placeholder="John"
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Last Name </legend>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                className="input"
                placeholder="Doe"
              />
            </fieldset>
          </div>
        )}
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Email </legend>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="input"
            placeholder="example@gmail.com"
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Password </legend>
          <input
            type="password"
            className="input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </fieldset>
        <div className="card-actions justify-center mt-5 mr-4">
          <button
            className="btn btn-primary w-full"
            onClick={
              pageType == "Login"
                ? (e) => handleSubmit(e)
                : (e) => handleRegister(e)
            }
          >
            {pageType}
          </button>
        </div>
      </div>
      {pageType === "Login" ? (
        <Link to="/signup" className="text-center pb-5">
          Dont have an account?{" "}
          <span className="underline text-[#5956ed]">Sign up</span>
        </Link>
      ) : (
        <Link to="/login" className="text-center pb-5">
          Already have an account?{" "}
          <span className="underline text-[#5956ed]">Login</span>
        </Link>
      )}
    </div>
  );
}

export default Login