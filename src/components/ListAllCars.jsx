import { useState, useEffect } from "react";
import styles from "../pages/user.module.css";

const PARKED_CARS_KEY = "parkedCars"; // Key for local storage

export const ListAllCars = ({ appUser, cars }) => {
    const [parkedCars, setParkedCars] = useState({}); // Store parked cars
    console.log(appUser);
    
  // Load parked cars from sessionStorage OR appUser when the component mounts
  useEffect(() => {
    const savedParkedCars = sessionStorage.getItem(PARKED_CARS_KEY);

    if (savedParkedCars) {
        setParkedCars(JSON.parse(savedParkedCars));
    } 
    if (appUser?.isParked) {
        console.log('we have parked cars from backend');
        // Convert appUser.isParked (list of plates) into an object
        const parkedCarsFromUser = Object.fromEntries(
            appUser.isParked.map((plate) => [plate, true])
        );
        setParkedCars(parkedCarsFromUser);
        sessionStorage.setItem(PARKED_CARS_KEY, JSON.stringify(parkedCarsFromUser)); // Save immediately
        
        
        console.log("parkedCard", parkedCars);



    }
}, [appUser]); // Runs when appUser changes

    
    // Save parked cars to local storage whenever they change
    // useEffect(() => {
    //     sessionStorage.setItem(PARKED_CARS_KEY, JSON.stringify(parkedCars));
    // }, [parkedCars]);

    const toggleParkThisCar = (licencePlate) => {
        setParkedCars((prev) => {
            const updatedState = { ...prev, [licencePlate]: !prev[licencePlate] }; // Toggle state
            sessionStorage.setItem(PARKED_CARS_KEY, JSON.stringify(updatedState)); // Save immediately
            return updatedState;
        });

        // Logging AFTER state update (fix stale state issue)
        setTimeout(() => {
            const isParkedNow = JSON.parse(sessionStorage.getItem(PARKED_CARS_KEY))[licencePlate]; // Read latest state
            if (isParkedNow) {
                // Sent to backend
                console.log(`Parking car ${licencePlate} for user ${appUser.id} (${appUser.userName})`);
            } else {
                // Sent to backend
                console.log(`Unparking car ${licencePlate} for user ${appUser.id} (${appUser.userName})`);
            }
        }, 200); // Small delay to ensure state update is complete
    };

    return (
        <div id="cars">
            {cars.map((car, index) => {
                const isParked = parkedCars[car.licencePlate] || false; // Check parked state
                return (
                    <div key={index} className={styles.listedCar}>
                        <button
                            className={isParked ? styles.parked : styles.notParked} // doesn't re-render
                            onClick={() => toggleParkThisCar(car.licencePlate)}
                        >
                            {isParked ? "Unpark this car" : "Park this car"}
                        </button>
                        <div className={styles.car}>
                            {car.licencePlate} {isParked ? "(P)" : ""}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
