import { useAtom } from "jotai";
import React from "react";
import { Link } from "react-router-dom";  // Korrigera import från 'react-router' till 'react-router-dom'
import { userAtom } from "../atoms/userAtom";
import { ListAllCars } from "../components/ListAllCars";
import styles from './user.module.css';
import { ParkingTimer } from "../components/ParkingTimer";

const Home = () => {
  const [appUser, setAppUser] = useAtom(userAtom);
   

  // appUser && console.log(appUser);
  if (!appUser || appUser.id === 0 || appUser.id == undefined) {
    return (
      <div className="home-container">
        {/* Pretty logo here */}

        <Link to="register"><h2>Register</h2></Link> 
        
        <Link to="login"><h2>Login</h2></Link>
      
      </div>
    );
  } else {
      if (appUser.isParked[0])
         return (<div className={styles.userPage}>  
          <ParkingTimer 
            isParkingActive={true} 
            regPlate={appUser.isParked[0].regPlate} 
          />
          </div>)
      else
      return <div className={styles.userPage}><h2>My cars</h2><ListAllCars appUser={appUser} cars={appUser.cars} /></div>
    

  }

};

export default Home;  // Exportera komponenten som default