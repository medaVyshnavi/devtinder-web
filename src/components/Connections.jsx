import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {BASE_URL} from "../utils/constants"
import { useDispatch, useSelector } from 'react-redux'
import {addConnections} from "../app/connectionSlice"

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector(state => state.connection)

  const [toastMessage, setToastMessage] = useState("")
  const [isError,setIsError] = useState(false)
  
  const fetchConnection = async () => {
    setIsError(false)
    try {
      const response = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      if (response.status === 200) {
        dispatch(addConnections(response.data.data));
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

  useEffect(() => {
    fetchConnection();
  }, [])
  
  if (!connections) return;

  if(connections.length === 0 ) return (
    <h1 className="flex justify-center items-center m-4">
      You dont have any connections
    </h1>
  );
  
  return (
    <>
      {connections && (
        <div className="flex justify-center items-center flex-col">
          <h1 className="mb-5 mt-2 text-3xl">Connections</h1>

          {connections.map((connection) => {
            const { _id, firstName, lastName, age, gender, photoURL, about } =
              connection;

            return (
              <div
                key={_id}
                className="bg-base-300 flex justify-start items-center w-1/2 my-2 py-3 px-10"
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
              </div>
            );
          })}
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

export default Connections