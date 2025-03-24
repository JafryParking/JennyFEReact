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
    
    useEffect( () => {
        appUser==null && navigate('/')
    },[appUser])
    // const startParking = async (licencePlate) => {
    //     setIsLoading(true);
    //     try {
    //         const response = await axios.post(`${backendURL}/startParking`, { licencePlate });
    //         if (response.status === 200) {
    //             showPopup("🚗 Parking started successfully!");
    //             setAppUser((prevUser) => ({
    //                 ...prevUser,
    //                 parkingHistory: [...prevUser.parkingHistory, response.data]
    //             }));
    //         } else {
    //             showPopup("❌ Failed to start parking");
    //         }
    //     } catch (error) {
    //         console.error("Error starting parking:", error);
    //         showPopup("⚠️ Error occurred while starting parking");
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    // const stopParking = async (licencePlate) => {
    //     setIsLoading(true);
    //     try {
    //         const response = await axios.get(`${backendURL}/stopParking/${licencePlate}`);
    //         if (response.status === 200) {
    //             showPopup("🅿️ Parking stopped successfully!");
    //             setAppUser((prevUser) => ({
    //                 ...prevUser,
    //                 parkingHistory: prevUser.parkingHistory.map((entry) =>
    //                     entry.isRunning ? { ...entry, isRunning: false, endTime: new Date().toISOString() } : entry
    //                 )
    //             }));
    //         } else {
    //             showPopup("❌ Failed to stop parking");
    //         }
    //     } catch (error) {
    //         console.error("Error stopping parking:", error);
    //         showPopup("⚠️ Error occurred while stopping parking");
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    // const toggleParking = (licencePlate) => {
    //     const runningParking = appUser.parkingHistory.find((entry) => entry.isRunning);
    //     if (runningParking) {
    //         stopParking(licencePlate);
    //     } else {
    //         startParking(licencePlate);
    //     }
    // };

    const DisplayUserDetails = () => {
        let fee = new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(appUser.parkingFeesOwed);
        return (
            <>
                <h1 id={appUser.id}>{appUser.userName}</h1>
                <div>
                    <p>Parking Fees: {fee} kr</p>
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