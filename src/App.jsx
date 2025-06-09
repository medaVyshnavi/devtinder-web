import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login"
import Body from "./Body";
import Profile from "./components/Profile"
import HomePage from "./components/HomePage"

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<HomePage/>}/>
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
