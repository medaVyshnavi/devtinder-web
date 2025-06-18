import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../app/requestSlice";
import axios from "axios";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.requests);
  
  const fetchRequests = async () => {
    try {
      const response = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(response.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleReviewRequest = async (e, status, requestId) => {
    try {
      e.preventDefault();
      const response = await axios.post(BASE_URL + "/request/review/" + status + "/" + requestId, {},{withCredentials:true});
      alert(response.data.message);
      // either refetch the requests api call or remove the user from the store. 
      // fetchRequests();
      dispatch(removeRequest(requestId))
    } catch (err) {
      console.log(err)
    }
  }

   useEffect(() => {
      fetchRequests();
   }, [])
  
  if (!requests) return;

  if (requests.length === 0) return <h1>You dont have any connections</h1>;
  
  return (
    requests && (
      <div className="flex justify-center items-center flex-col">
        <h1 className="mb-5 mt-2 text-3xl">Connection Requests</h1>

        {requests.map((request) => {
          const { _id, firstName, lastName, age, gender, photoURL, about } =
            request.fromUserId;
          
          const {_id : requestId} = request 

          return (
            <div
              key={_id}
              className="bg-base-300 flex justify-between items-center w-1/2 my-2 py-3 px-10"
            >
              <div>
                <img
                  src={photoURL}
                  alt="photo"
                  className="w-32 h-32 rounded-full"
                />
              </div>
              <div className="ml-5">
                <h2 className="text-lg">{firstName + " " + lastName}</h2>
                {age && gender && (
                  <span>
                    {age} {gender}
                  </span>
                )}
                <p>{about}</p>
              </div>
              <div>
                <button
                  className="btn btn-primary mx-3"
                  onClick={(e) => handleReviewRequest(e, "rejected",requestId)}
                >
                  Ignore
                </button>
                <button
                  className="btn btn-secondary mx-3"
                  onClick={(e) => handleReviewRequest(e, "accepted",requestId)}
                >
                  Accept
                </button>
              </div>
            </div>
          );
        })}
      </div>
    )
  );
}

export default Requests

// /review/:status/:requestId