import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login"
import Body from "./Body";
import Profile from "./components/Profile"

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/login" element={ <Login/>} />
          <Route path="/feed" element={<Body />} >
            <Route path="profile" element={<Profile/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
