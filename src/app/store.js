import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import feedSlice from "./feedSlice"
import connectionSlice from "./connectionSlice"
import requestSlice from "./requestSlice"

export default configureStore({
  reducer: {
    user: userSlice,
    feed: feedSlice,
    connection: connectionSlice,
    requests: requestSlice,
  },
});