import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";  // Korrigera import från 'react-router' till 'react-router-dom'
import { userAtom } from "../atoms/userAtom";
import { ListAllCars } from "../components/ListAllCars";


const Home = () => {
  const [appUser, setAppUser] = useAtom(userAtom);
   
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (appUser && appUser.id !== undefined) {
  //     navigate("user/" + appUser.id);
  //   }
  // }, [appUser]); // Körs bara när appUser ändras

  // appUser && console.log(appUser);
  if (!appUser || appUser.id === 0 || appUser.id == undefined) {
    return (
      <div className="home-container">
        {/* Pretty logo here */}
        <Link to="register">Register</Link> or <Link to="login">Login</Link>
      </div>
    );
  } else {
      if (appUser.isParked[0])
         return <p>Car {appUser.isParked[0].regPlate} is parked -- add more stuff</p>
      else
      return <ListAllCars appUser={appUser} setAppUser={setAppUser} cars={appUser.cars} />
    

  }

  return null; // Förhindrar rendering innan navigeringen sker
};

export default Home;  // Exportera komponenten som default