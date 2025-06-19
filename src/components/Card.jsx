import React, { useState } from "react";
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { removeUserFromFeed } from '../app/feedSlice'

const Card = ({ user }) => {
  const dispatch = useDispatch();

  const [toastMessage, setToastMessage] = useState("")
  const [isError,setIsError] = useState(false)
  
  const { _id, firstName, lastName, gender, photoURL, age, about } = user
  
  const handleSendRequest = async (e, status, userId) => {
    e.preventDefault();
    setIsError(false);
    try {
      const response = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        dispatch(removeUserFromFeed(userId));
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
      {user && (
        <div className="card bg-base-300 w-96 shadow-sm">
          <figure className="px-5 pt-5">
            <img src={photoURL} alt="Shoes" className="rounded-full w-2/3" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">
              {firstName} {lastName}
            </h2>
            <h3>
              {gender?.toUpperCase()} {age}
            </h3>
            <p>{about}</p>
            <div className="card-actions">
              <button
                className="btn btn-primary"
                onClick={(e) => handleSendRequest(e, "ignore", _id)}
              >
                Ignore
              </button>
              <button
                className="btn btn-secondary"
                onClick={(e) => handleSendRequest(e, "interested", _id)}
              >
                Interested
              </button>
            </div>
          </div>
        </div>
      )}
      
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

export default Card