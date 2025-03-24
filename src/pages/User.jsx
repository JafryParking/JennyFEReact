import { useParams } from 'react-router';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { backendURL } from '../../config';
import '../App.css';
import styles from './user.module.css';
import { ListAllCars } from '../components/ListAllCars.jsx';
import { ListParkingHistory } from '../components/ListParkingHistory.jsx';
import { UserContext } from '../contexts/UserContext.jsx';

const User = () => {
    const { appUser, setAppUser } = useContext(UserContext);
    let { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    
    const showPopup = (message) => {
        alert(message);
    };

    // Update URL when id changes
    useEffect(() => {
        if (id) {
            setIsLoading(true);
            axios.get(`${backendURL}/user/${id}`)
                .then(response => {
                    setAppUser(response.data);
                    sessionStorage.setItem("persistedUser", JSON.stringify(response.data));
                })
                .catch(error => {
                    console.error("Error fetching user data:", error);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, [id]);

    const DisplayUserDetails = () => {
        let fee = new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(appUser.parkingFeesOwed);
        return (
            <>
                <h1 id={appUser.id}>{appUser.userName}</h1>
                <div>
                    <p>Parking Fees: {fee} kr</p>
                </div>
                {isLoading && <p className={styles.loadingMessage}>⏳ Loading...</p>}
                {<ListParkingHistory userHistory={appUser.parkingHistory} />}
                {<ListAllCars appUser={appUser} setAppUser={setAppUser} cars={appUser.cars} />}
            </>
        )
    }

    return (
        <div className={styles.userPage}>
            {id && appUser && appUser.id !== 0 ? <DisplayUserDetails /> : <h1>No such user</h1>}
        </div>
    )
}

export default User;