import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {BASE_URL} from "../utils/constants"
import Card from './Card'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../app/feedSlice'

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector(state => state.feed)

  const [toastMessage, setToastMessage] = useState("")
  const [isError,setIsError] = useState(false)
  
  const fetchFeedData = async () => {
    setIsError(false);
    try {
      const response = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      if (response.status === 200) {
        dispatch(addFeed(response.data.data));
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
    fetchFeedData();
  }, [])

  if (!feed) return <div className='flex justify-center my-10'>Loading...</div>
  
  if(feed.length === 0) return <div className="flex justify-center my-10">No Feed found</div>;
  return (
    <>
      {feed && (
        <div className="flex justify-center items-center m-4">
          {feed.length > 0 && <Card user={feed[0]} />}
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

export default Feed