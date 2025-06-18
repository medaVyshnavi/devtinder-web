import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login"
import Body from "./components/Body";
import Profile from "./components/Profile"
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Login />} />
          <Route path="/feed" element={<Body />}>
            <Route path="" element={<Feed />} />
            <Route path="profile" element={<Profile />} />
            <Route path="connections" element={<Connections />} />
            <Route path="requests" element={<Requests />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
