import React, {useState}from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import {Home} from "./pages/Home.jsx";
import {Login} from "./pages/Login.jsx";
import {Register} from "./pages/Register.jsx";
import {StartParking} from "./pages/StartParking.jsx";
import {StopParking} from "./pages/StopParking.jsx";
import {User} from "./pages/User.jsx";
import {Navbar} from "./components/Navbar.jsx";

const App = () => {
  // needed for Login
  const [appUser, setAppUser] = useState(null);
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Navbar appUser={appUser}/>}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login appUser={appUser} setAppUser={setAppUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/start-parking" element={<StartParking />} />
          <Route path="/stop-parking" element={<StopParking />} />
          <Route path="/user/:id" element={<User appUser={appUser} setAppUser={setAppUser}/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;