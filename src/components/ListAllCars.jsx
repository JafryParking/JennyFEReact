import React, { useState, useEffect } from "react";
import styles from "../pages/user.module.css";
import { FaStopCircle } from "react-icons/fa";
import { MdLocalParking } from "react-icons/md";
import { useTogglePark } from "./ToggleParking";

// -----------------------------------------------------------------------------
//     Usage <ListAllCars appUSer={} cars={} />
//
//  Component to list all cars for a user, set up a hook to start/stop parking
//  Displays different icon if a car is parked or not
// -----------------------------------------------------------------------------
export const ListAllCars = ({ appUser, cars }) => {
    const [userCars, setUserCars] = useState([]);
    
    useEffect(() => {
        setUserCars(cars);
    }, []); // Runs only on mount
    
    const toggleParkThisCar = useTogglePark();

    return (
        <>
            {userCars.map((car, index) => {
                let isParked = appUser?.isParked?.some(parked => parked.regPlate === car.regPlate) || false;
                return (
                    <div key={index} className={styles.listedCar}>
                        <button className={isParked ? styles.parked : styles.notParked}
                            aria-label={`Park car ${car.regPlate}`}
                            onClick={() => toggleParkThisCar(car)} >
                            {isParked ? <FaStopCircle size={40} /> : <MdLocalParking  size={40} />}
                        </button>
                        <div className={isParked ? styles.carParked : styles.carNotParked}>
                            {car.regPlate} {car.name ? car.name : ''}
                        </div>
                    </div>
                );
            })}
        </>
    );

};
