import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";  // Update the path to not include ".jsx"
import Login from "./pages/Login";
import Register from "./pages/Register";
import StartParking from "./pages/StartParking";
import StopParking from "./pages/StopParking";
import User from "./pages/User";
import Navbar from "./components/Navbar.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Navbar />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/start-parking" element={<StartParking />} />
          <Route path="/user/:id" element={<User />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;