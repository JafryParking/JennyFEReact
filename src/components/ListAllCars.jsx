import { useState, useEffect } from "react";
import styles from "../pages/user.module.css";

export const ListAllCars = ({ appUser, cars }) => {
    
    const toggleParkThisCar = (licencePlate) => {
        let isParkedNow = appUser?.isParked?.some(parked => parked.licencePlate === licencePlate) || false;  
        if (!isParkedNow) {
            // Sent to backend
            console.log(`Parking car ${licencePlate} for user ${appUser.id} (${appUser.userName})`);
        } else {
            // Sent to backend
            console.log(`Unparking car ${licencePlate} for user ${appUser.id} (${appUser.userName})`);
        }
    }

    return (
        <div id="cars">
            {cars.map((car, index) => {
                let isParked = appUser?.isParked?.some(parked => parked.licencePlate === car.licencePlate) || false;
                return (
                    <div key={index} className={styles.listedCar}>
                        <button
                            onClick={() => toggleParkThisCar(car.licencePlate)}
                        >
                            {isParked ? "Unpark this car" : "Park this car"}
                        </button>
                        <div className={isParked ? styles.carParked : styles.carNotParked}>
                            {car.licencePlate}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
