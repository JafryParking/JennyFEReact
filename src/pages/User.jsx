import { useParams } from 'react-router';
import { useState, useEffect} from 'react';
import axios from 'axios';
import { backendURL } from '../../config';
import '../App.css';
import { BsArchive } from "react-icons/bs";
import { MdDirectionsCar } from "react-icons/md";
import styles from './user.module.css';
import { ListAllCars } from '../components/ListAllCars.jsx';
import { ListParkingHistory } from '../components/ListParkingHistory.jsx';
import { useAtom } from 'jotai';
import { userAtom } from '../atoms/userAtom.jsx';
import { ParkingTimer } from '../components/ParkingTimer.jsx';
import { AddNewCar } from '../components/AddNewCar.jsx';
import { showCarListAtom, showHistoryAtom } from '../atoms/userPreference.jsx';

// -----------------------------------------------------------------------------
//   
//   Shows all user details to user. Remembers setting to show the list
//   of Cars or Parking History
//   
// -----------------------------------------------------------------------------

const User = () => {
    const [ appUser, setAppUser ]  = useAtom(userAtom);
    let { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    
    // Update URL when id changes
    useEffect(() => {
        if (id && appUser) {
            setIsLoading(true);
            axios.get(`${backendURL}/user/${id}`)
                .then(response => {
                    setAppUser(response.data);
                })
                .catch(error => {
                    console.error("Error fetching user data:", error);
                    setAppUser(null);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } else {
            setAppUser(null);
        }
    }, [id]);

    const DisplayUserDetails = () => {
        const [showCars, setShowCars] = useAtom(showCarListAtom);
        const [showHistory, setShowHistory] = useAtom(showHistoryAtom);
        function toggleHistory(){
            setShowHistory(!showHistory);
        }
        function toggleCarList(){
            setShowCars(!showCars);
        }
        return (
            <>
                <h1>{appUser.userName}</h1>

                {/* Toggle buttons to show/hide History and Car list  */}
                <div className={styles.toggleButtonDiv}>
                    <button className={showHistory ? styles.active:""}
                        onClick={toggleHistory}><BsArchive size={40} /></button>
                    <button className={showCars ? styles.active:""}
                        onClick={toggleCarList}><MdDirectionsCar size={40} /></button>
                </div>

                {/* Display parking timer if a car is currently parked */}
                {appUser?.isParked && appUser.isParked.length > 0 && (
                    <ParkingTimer 
                        isParkingActive={true} 
                        regPlate={appUser.isParked[0].regPlate} 
                    />
                )}
                <div>
                    <p className={styles.parkingFee}>Parking Fees: {new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(appUser.parkingFeesOwed)} kr</p>
                </div>
                {isLoading && <p className={styles.loadingMessage}>⏳ Loading...</p>}
                {!isLoading && showHistory && <ListParkingHistory userHistory={appUser.parkingHistory} />}
                {!isLoading && showCars && <div id="cars" >
                        <ListAllCars appUser={appUser} cars={appUser.cars} />
                        {/* Also print form to add new car */}
                        <AddNewCar userID={appUser.id}/>
                    </div>}
                {!showCars && !showHistory && <p>Choose to show either History or Cars on the buttons above</p>}
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