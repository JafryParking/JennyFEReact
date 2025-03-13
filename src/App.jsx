import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import {Home} from "./pages/Home.jsx";
import {Login} from "./pages/Login.jsx";
import {Register} from "./pages/Register.jsx";
import {StartParking} from "./pages/StartParking.jsx";
import {StopParking} from "./pages/StopParking.jsx";
import {User} from "./pages/User.jsx";
import {Navbar} from "./components/Navbar.jsx";

const App = () => {
  return (
    <BrowserRouter>
      
      <Routes>
        <Route element={<Navbar />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/start-parking" element={<StartParking />} />
          <Route path="/stop-parking" element={<StopParking />} />
          <Route path="/user/:id" element={<User />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;