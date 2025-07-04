import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Login"
import Body from "./components/Body";
import Profile from "./components/Profile"
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Premium from "./components/Premium";
import Chat from "./components/Chat";

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Login />} />
          <Route path="/feed" element={<Body />}>
            <Route path="" element={<Feed />} />
            <Route path="profile" element={<Profile />} />
            <Route path="connections" element={<Connections />} />
            <Route path="premium" element={<Premium />} />
            <Route path="requests" element={<Requests />} />
            <Route path="chat/:targetUserId" element={<Chat />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
