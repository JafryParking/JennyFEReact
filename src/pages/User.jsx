import { useNavigate, useParams } from 'react-router';
import { useState, useEffect} from 'react';
import axios from 'axios';
import { backendURL } from '../../config';
import '../App.css';
import styles from './user.module.css';
import { ListAllCars } from '../components/ListAllCars.jsx';
import { ListParkingHistory } from '../components/ListParkingHistory.jsx';
import { useAtom } from 'jotai';
import { userAtom } from '../atoms/userAtom.jsx';


const ParkingTimer = ({ isParkingActive, ratePerMinute }) => {
    const [elapsedTime, setElapsedTime] = useState(0); // time in seconds

    useEffect(() => {
        let interval = null;
        if (isParkingActive) {
            interval = setInterval(() => {
                setElapsedTime(prev => prev + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isParkingActive]);

    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    const cost = ((elapsedTime / 60) * ratePerMinute).toFixed(2);

    return (
        <div className={styles.timerContainer}>
            <div className={styles.timerProgress} style={{ width: `${Math.min((elapsedTime / 3600) * 100, 100)}%` }}></div>
            <p>Parkeringstid: {minutes} min {seconds} sek</p>
            <p>Kostnad: {cost} kr</p>
        </div>
    );
};

const User = () => {
    const [ appUser, setAppUser ]  = useAtom(userAtom);
    let { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const showPopup = (message) => {
        alert(message);
    };

    // Update URL when id changes
    useEffect(() => {
        if (id && appUser) {
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
        return (
            <>
                <h1 id={appUser.id}>{appUser.userName}</h1>
                {/* Display parking timer if a car is currently parked */}
                {appUser?.isParked && appUser.isParked.length > 0 && (
                    <ParkingTimer 
                        isParkingActive={true} 
                        ratePerMinute={1} 
                    />
                )}
                <div>
                    <p>Parking Fees: {new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(appUser.parkingFeesOwed)} kr</p>
                </div>
                {isLoading && <p className={styles.loadingMessage}>⏳ Loading...</p>}
                {!isLoading && <ListParkingHistory userHistory={appUser.parkingHistory} />}
                {!isLoading && <ListAllCars appUser={appUser} setAppUser={setAppUser} cars={appUser.cars} />}
            </>
        )
    }

    return (
        <div className={styles.userPage}>
            {(appUser && !isLoading) ? <DisplayUserDetails /> : <h1>Loading...</h1>}
        </div>
    )
}

export default User;