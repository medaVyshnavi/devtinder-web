import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux"
import { addUser } from "../app/userSlice"
import {BASE_URL} from "../utils/constants"

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("surya@gmail.com");
  const [password, setPassword] = useState("Surya16()");
  
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(BASE_URL+"/login",
        { email: email, password: password },
        { withCredentials : true }
      );
      
      if (response.status === 200) {
        dispatch(addUser(response.data.data));
        navigate("/feed")
      }
    } catch (error) {
      // alert(error.response.data);
      console.log(error.response.data)
    }
  } 
  return (
    <div className="card bg-base-300 w-96 shadow-sm flex justify-center m-auto my-56">
      <div className="card-body">
        <h2 className="card-title">Login</h2>
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
          <button className="btn btn-primary w-full" onClick={(e)=>handleSubmit(e)}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default Login