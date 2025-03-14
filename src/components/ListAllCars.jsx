import { useState, useEffect } from "react";
import styles from "../pages/user.module.css";
import axios from "axios";
import { backendURL } from '../../config';

export const ListAllCars = ({ appUser, setAppUser, cars }) => {
    
    const toggleParkThisCar = (licencePlate) => {
        let isParkedNow = appUser?.isParked?.some(parked => parked.licencePlate === licencePlate) || false;  
        if (!isParkedNow) {
            // Sent to backend
            axios({
                method: 'post',
                url: `${backendURL}/startParking`,
                data: {
                  userID: appUser.id,
                  licensePlate: licencePlate
                }
              })
              .then(response => {
                setAppUser(response.data);
              })
              .catch(error => {
                console.error("Error fetching data:", error);
            });
            console.log(`Parking car ${licencePlate} for user ${appUser.id} (${appUser.userName})`);
        } else {
            // Sent to backend
            axios.get(`${backendURL}/stopParking/${licencePlate}`)
                .then(response => {
                    let fee = new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(response.data.fee);
                    alert(`${fee} kr added to your account.`);
                    setAppUser(response.data.user);
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                });
        }
    }

    return (
        <div id="cars">
            {cars.map((car, index) => {
                let isParked = appUser?.isParked?.some(parked => parked.licencePlate === car.licencePlate) || false;
                return (
                    <div key={index} className={styles.listedCar}>
                        <button
                            className={isParked ? styles.parked : styles.notParked}
                            onClick={() => toggleParkThisCar(car.licencePlate)}
                        >
                            {isParked ? "U" : "P"}
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
