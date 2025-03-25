import { useCallback, useEffect, useState } from "react";
import styles from '../pages/user.module.css';
import axios from "axios";
import { backendURL } from '../../config';
import {  FaStopCircle} from "react-icons/fa";
import { useTogglePark } from "./ToggleParking";
import { formatDoubleToKr } from "../formatHelpers/formatHelperFunctions";

// -----------------------------------------------------------------------------
//     Usage <ParkingTimer isParkingActive={bool} regPlate={car.regPlate} />
//
//   Starts a timer when a user has clicked to park a car.  Fetches currently 
//   owed from the back-end and updates. 
// 
//   To fix: Resets the timer if you reload the page
// -----------------------------------------------------------------------------

export const ParkingTimer = ({ isParkingActive, regPlate }) => {
    const [elapsedTime, setElapsedTime] = useState(0); // Time in seconds
    const [cost, setCost] = useState(0); // Dynamisk kostnad
    
    const togglePark = useTogglePark();
    const toggleParkThisCar = useCallback(() => togglePark(regPlate), [togglePark, regPlate]);

    useEffect(() => {
        let interval = null;
        if (isParkingActive && regPlate) {
            interval = setInterval(() => {
                setElapsedTime(prev => prev + 1);
                axios.get(`${backendURL}/currentlyParked/${regPlate}`)
                    .then(response => {
                        setCost(response.data);
                    })
                    .catch(error => {
                        console.error("Error fetching parking cost:", error);
                    });
            }, 1000);
        } else { 
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isParkingActive, regPlate]);

    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;

    return (
        <div className={styles.timerContainer}>
            <p>Parking time: {minutes} min {seconds} sec</p>
            <p>Cost: {formatDoubleToKr(cost)} kr</p>
        
            <div className={styles.listedCar}>
                <button className={styles.parked}
                     onClick={toggleParkThisCar}>
                        <FaStopCircle size={40} /> 
                </button>
                <div className={styles.carParked}>{regPlate}</div></div>
        </div>
    );
};
