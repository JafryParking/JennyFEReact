import { useAtom } from "jotai";
import React from "react";
import { Link } from "react-router-dom";  
import { userAtom } from "../atoms/userAtom";
import { ListAllCars } from "../components/ListAllCars";
import styles from './user.module.css';
import { ParkingTimer } from "../components/ParkingTimer";

// -----------------------------------------------------------------------------
//  If we do not have a user logged in: show register or login links
//  If we have a user show either: 
//    1: Timer and currently parked car 
//      or
//    2: List of all a users cars
// 
// -----------------------------------------------------------------------------
const Home = () => {
  const [appUser, setAppUser] = useAtom(userAtom);
  
  if (!appUser || appUser.id === 0 || appUser.id == undefined) {
    return (
      <div className="home-container">
        {/* Pretty logo here */}

        <Link to="login"><h1>Login</h1></Link>
        
        <Link to="register"><h2>Register</h2></Link> 
        

      
      </div>
    );
  } else {
    
      if (appUser.isParked[0])
         return (<div className={styles.userPage}>
          <h1>My cars</h1>
          <ParkingTimer 
            isParkingActive={true} 
            car={appUser.isParked[0]} 
          />
          </div>)
      else
      return <div className={styles.userPage}>
              <h1>My cars</h1>
              <ListAllCars appUser={appUser} cars={appUser.cars} />
            </div>
  }

};

export default Home;  // Exportera komponenten som default