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

export const ParkingTimer = ({ isParkingActive, car }) => {
    const [elapsedTime, setElapsedTime] = useState(0); // Time in seconds
    const [cost, setCost] = useState(0); // Dynamisk kostnad
    const [upToDate, setUpToDate] = useState(true);
    const togglePark = useTogglePark();
    const toggleParkThisCar = useCallback(() => togglePark(car), [togglePark, car]);

    useEffect(() => {
        let interval = null;
        if (isParkingActive && car.regPlate) {
            interval = setInterval(() => {
                setElapsedTime(prev => prev + 1);
                axios.get(`${backendURL}/currentlyParked/${car.regPlate}`)
                    .then(response => {
                        setCost(response.data);
                        setUpToDate(true);
                    })
                    .catch((error) => {
                        console.log(error);
                        setUpToDate(false);
                    });
            }, 1000);
        } else { 
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isParkingActive, car]);

    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;

    return (
        <div className={styles.timerContainer}>
            <p>Parking time: {minutes} min {seconds} sec</p>
            <p className={upToDate ? undefined : "notUpToDate"}>Cost: {formatDoubleToKr(cost)} kr {upToDate ? undefined : "Cost not accurate"}</p>
        
            <div className={styles.listedCar}>
                <button className={styles.parked}
                     onClick={toggleParkThisCar}>
                        <FaStopCircle size={40} /> 
                </button>
                <div className={styles.carParked}>{car.regPlate} {car.name}</div></div>
        </div>
    );
};
