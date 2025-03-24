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
    
    const { register, reset, handleSubmit, formState:{errors} } = useForm();

    const addCar = (input) => {
        
        axios({method: 'post',
            url : `${backendURL}/addCar`, 
            data: input
            })
            .then(response => {
                if (response.status === 200 && response.data) {
                setUserCars(response.data);
                reset();        
                }
            })
            .catch(error => {
                console.log(error.response.data);
                alert(error.response.data);
                reset();
            });
    }


    const toggleParkThisCar = (regPlate) => {
        let isParkedNow = appUser?.isParked?.some(parked => parked.regPlate === regPlate) || false;  
        if (!isParkedNow) {
            // Not parked > Sent to backend to start Parking
            axios({
                method: 'post',
                url: `${backendURL}/startParking`,
                data: {
                  userID: appUser.id,
                  regPlate: regPlate
                }
              })
              .then(response => {
                setAppUser(response.data);
              })
              .catch(error => {
                console.error("Error fetching data:", error);
            });
        } else {
            // Car is parked -> Sent to backend to stop parking
            axios.get(`${backendURL}/stopParking/${regPlate}`)
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
                let isParked = appUser?.isParked?.some(parked => parked.regPlate === car.regPlate) || false;
                return (
                    <div key={index} className={styles.listedCar}>
                        <button
                            className={isParked ? styles.parked : styles.notParked}
                            onClick={() => toggleParkThisCar(car.regPlate)}
                        >
                            {isParked ? <FaStopCircle size={40} /> : <FaParking size={40} />}
                        </button>
                        <div className={isParked ? styles.carParked : styles.carNotParked}>
                            {car.regPlate}
                        </div>
                    </div>
                );
            })}
            {/* Also print form to add new car */}

            <form className={liststyles.addCar} onSubmit={handleSubmit(addCar)}>
                <label htmlFor="regPlate">Add car:</label>
                <input type="text" placeholder="abc123" name="regPlate" {...register("regPlate", {required:true, minLength:6})}  />
                <input type="hidden" value={appUser.id} name="UserID" {...register("UserID")} />
                <button type="submit">Save</button>
                {errors.regPlate && <p>Cars need at least 6 symbols</p>}
            </form>

        </div>
    );

};
