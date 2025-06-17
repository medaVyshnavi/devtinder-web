import axios from 'axios'
import React, { useEffect } from 'react'
import {BASE_URL} from "../utils/constants"
import { useDispatch, useSelector } from 'react-redux'
import {addConnections} from "../app/connectionSlice"

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector(state => state.connection)
  const fetchConnection = async () => {
    try {
        const response = await axios.get(BASE_URL + "/user/connections", { withCredentials: true })
        dispatch(addConnections(response.data.data));
      } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
    fetchConnection();
  }, [])
  
  if (!connections) return;

  if(connections.length === 0 ) return <h1>You dont have any connections</h1>
  
  return (
    connections && (
      <div className="flex justify-center items-center flex-col">
        <h1 className='mb-5 mt-2 text-3xl'>Connections</h1>

        {connections.map((connection) => {
          const { firstName, lastName, age, gender, photoURL,about } = connection;

          return (
            <div className="bg-base-300 flex justify-start items-center w-1/2 my-2 py-3 px-10">
              <div>
                <img
                  src={photoURL}
                  alt="photo"
                  className="w-32 h-32 rounded-full"
                />
              </div>
              <div className='ml-5'>
                <h2>{firstName + " " + lastName}</h2>
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
    )
  );
}

export default Connections