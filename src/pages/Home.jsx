import React, { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";  // Korrigera import från 'react-router' till 'react-router-dom'
import { UserContext } from "../contexts/UserContext";

const Home = () => {
  const appUser = useContext(UserContext);
  
  const navigate = useNavigate();

  useEffect(() => {
    if (appUser && appUser.id !== undefined) {
      navigate("start-parking");
    }
  }, [appUser]); // Körs bara när appUser ändras

  appUser && console.log(appUser);
  if (appUser || appUser.id === 0) {
    return (
      <div className="home-container">
        <Link to="register">Register</Link> or <Link to="login">Login</Link>
      </div>
    );
  }

  return null; // Förhindrar rendering innan navigeringen sker
};

export default Home;  // Exportera komponenten som default