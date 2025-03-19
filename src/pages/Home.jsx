import React, { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";  // Korrigera import från 'react-router' till 'react-router-dom'
import { UserContext } from "../contexts/UserContext";

const Home = () => {
  const appUser = useContext(UserContext);
  
  const navigate = useNavigate();

  useEffect(() => {
    if (appUser) {
      navigate("start-parking");
    }
  }, [appUser, navigate]); // Körs bara när appUser ändras

  if (!appUser) {
    return (
      <div className="home-container">
        <Link to="register">Register</Link> or <Link to="login">Login</Link>
      </div>
    );
  }

  return null; // Förhindrar rendering innan navigeringen sker
};

export default Home;  // Exportera komponenten som default