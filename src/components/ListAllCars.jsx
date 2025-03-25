import React, { useState, useEffect } from "react";
import styles from "../pages/user.module.css";
import liststyles from "./listallCars.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FaParking, FaStopCircle} from "react-icons/fa";
import { MdLocalParking } from "react-icons/md";
import { backendURL } from '../../config';
import { useTogglePark } from "./ToggleParking";


export const ListAllCars = ({ appUser, setAppUser, cars }) => {
    const [userCars, setUserCars] = useState([]);
    
    useEffect(() => {
        setUserCars(cars);
    }, []); // Runs only on mount
    
    
    const toggleParkThisCar = useTogglePark();
    // const toggleParkThisCar = (regPlate) => {
    //     let isParkedNow = appUser?.isParked?.some(parked => parked.regPlate === regPlate) || false;  
    //     if (!isParkedNow) {
    //         // Not parked > Sent to backend to start Parking
    //         axios({
    //             method: 'post',
    //             url: `${backendURL}/startParking`,
    //             data: {
    //               userID: appUser.id,
    //               regPlate: regPlate
    //             }
    //           })
    //           .then(response => {
    //             setAppUser(response.data);
    //           })
    //           .catch(error => {
    //             console.error("Error fetching data:", error);
    //         });
    //     } else {
    //         // Car is parked -> Sent to backend to stop parking
    //         axios.get(`${backendURL}/stopParking/${regPlate}`)
    //             .then(response => {
    //                 let fee = new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(response.data.fee);
    //                 alert(`${fee} kr added to your account.`);
    //                 setAppUser(response.data.user);
    //             })
    //             .catch(error => {
    //                 console.error("Error fetching data:", error);
    //             });
    //     }
    // }

    return (
        <>
            {userCars.map((car, index) => {
                let isParked = appUser?.isParked?.some(parked => parked.regPlate === car.regPlate) || false;
                return (
                    <div key={index} className={styles.listedCar}>
                        <button
                            className={isParked ? styles.parked : styles.notParked}
                            onClick={() => toggleParkThisCar(car.regPlate)}
                        >
                            {isParked ? <FaStopCircle size={40} /> : <MdLocalParking  size={40} />}
                        </button>
                        <div className={isParked ? styles.carParked : styles.carNotParked}>
                            {car.regPlate}
                        </div>
                    </div>
                );
            })}


        </>
    );

};
