import axios from 'axios'
import React, { useEffect } from 'react'
import {BASE_URL} from "../utils/constants"
import Card from './Card'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../app/feedSlice'

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector(state => state.feed)

  const fetchFeedData = async() => {
    const response = await axios.get(BASE_URL + "/user/feed", { withCredentials: true })
    dispatch(addFeed(response.data.data))
  }

  useEffect(() => {
    fetchFeedData();
  }, [])

  return feed && (
    <div className='flex justify-center items-center m-4'>
      <Card user={feed[0] } />
    </div>
  )
}

export default Feed