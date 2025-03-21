import { useState, useEffect } from "react";
import styles from "../pages/user.module.css";
import liststyles from "./listallCars.module.css";
import axios from "axios";
import { FaParking, FaStopCircle} from "react-icons/fa";
import { backendURL } from '../../config';

export const ListAllCars = ({ appUser, setAppUser, cars }) => {
    const [userCars, setUserCars] = useState([]);
    useEffect(() => {
        setUserCars(cars);
    }, []); // Runs only on mount
    

    function addCar(formData) {
        const fulldata = Object.fromEntries(formData);
        axios.post(`${backendURL}/addCar`, fulldata)
            .then(response => {
                setUserCars(response.data);
            })
            .catch(error => {
                alert(error.response.data);
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

            <form className={liststyles.addCar} action={addCar}>
                <label htmlFor="licensePlate">Add car:</label>
                <input placeholder='AAA###' type="text" id="licensePlate" name="licensePlate" />
                <input type="hidden" value={appUser.id} name="userID" />
                <input type="hidden" value={appUser.userName}  name="userName"/>
                <input type="submit" value="Save" />
            </form>

        </div>
    );

};
