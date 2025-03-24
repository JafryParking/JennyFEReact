import React, { useState, useEffect } from "react";
import styles from "../pages/user.module.css";
import liststyles from "./listallCars.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FaParking, FaStopCircle} from "react-icons/fa";
import { backendURL } from '../../config';

export const ListAllCars = ({ appUser, setAppUser, cars }) => {
    const [userCars, setUserCars] = useState([]);
    useEffect(() => {
        setUserCars(cars);
    }, []); // Runs only on mount
    
    const { register, reset, handleSubmit } = useForm();

    const addCar = (data) => {
        
        axios.post(`${backendURL}/addCar`, data)
            .then(response => {
                setUserCars(response.data);
                reset();        
            })
            .catch(error => {
                console.log(error.response.data);
                alert(error.response.data);
                reset();
            });
    }


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
            {userCars.map((car, index) => {
                let isParked = appUser?.isParked?.some(parked => parked.licencePlate === car.licencePlate) || false;
                return (
                    <div key={index} className={styles.listedCar}>
                        <button
                            className={isParked ? styles.parked : styles.notParked}
                            onClick={() => toggleParkThisCar(car.licencePlate)}
                        >
                            {isParked ? <FaStopCircle size={24} /> : <FaParking size={24} />}
                        </button>
                        <div className={isParked ? styles.carParked : styles.carNotParked}>
                            {car.licencePlate}
                        </div>
                    </div>
                );
            })}
            {/* Also print form to add new car */}

            <form className={liststyles.addCar} onSubmit={handleSubmit(addCar)}>
                <label htmlFor="licensePlate">Add car:</label>
                <input type="text" placeholder="abc123" {...register("LicensePlate")}  />
                <input type="hidden" value={appUser.id}  {...register("UserID")} />
                <button type="submit">Save</button>
            </form>

        </div>
    );

};
