import { useEffect, useState } from "react";
import styles from '../pages/user.module.css';
import axios from "axios";
import { backendURL } from '../../config';

export const ParkingTimer = ({ isParkingActive, regPlate }) => {
    const [elapsedTime, setElapsedTime] = useState(0); // Time in seconds
    const [cost, setCost] = useState(0); // Dynamisk kostnad

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
            <p>Cost: {new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(cost)} kr</p>
        </div>
    );
};
