import React, {useEffect} from "react";
import { Link, useNavigate } from "react-router";

export const Home = ({appUser}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (appUser) {
      navigate("start-parking");
    }
  }, [appUser, navigate]); // Run only when appUser changes

  if (!appUser) {
    return (
      <div className="home-container">
        <Link to="register"> Register </Link> or <Link to="login">Login</Link>
      </div>
    );
  }

  return null; // Prevents rendering anything before navigation happens
};