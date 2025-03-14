import { useParams } from 'react-router';
import { useState, useEffect, useDebugValue } from 'react'
import axios from 'axios';
import { backendURL } from '../../config';
import '../App.css';
import styles from './user.module.css';
import { ListAllCars } from '../components/ListAllCars.jsx';
import { ListParkingHistory } from '../components/ListParkingHistory.jsx';

export const User = ({appUser, setAppUser}) => {
    let { id } = useParams();
    
    // Update URL when id changes
    useEffect(() => {
        if (id) {
            axios.get(`${backendURL}/user/${id}`)
                .then(response => {
                    
                    setAppUser(response.data);
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                });
        }
    }, [id]);
    
    const DisplayUserDetails = ({user}) => {
        
        let fee = new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(user.parkingFeesOwed);
        return (
            <>
                <h1 id={user.id}>{user.userName}</h1>
                <div>
                    <p>Parking Fees: {fee} kr</p>
                </div>
                {<ListParkingHistory userHistory={user.parkingHistory} />}
                {<ListAllCars appUser={appUser} setAppUser={setAppUser} cars={user.cars} />}
        </>
        )
      }

    return (
        <div className={styles.userPage}>
            {id && appUser ? <DisplayUserDetails user={appUser} /> : 'No such user'}
        </div>
    )
}