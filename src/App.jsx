import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Park from "./pages/Park";
import Register from "./pages/Register";
import StartParking from "./pages/StartParking";
import StopParking from "./pages/StopParking";
import User from "./pages/User";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      
      <Routes>
        <Route element={<Navbar />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/start-parking" element={<StartParking />} />
          <Route path="/stop-parking" element={<StopParking />} />
          <Route path="/user" element={<User />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;