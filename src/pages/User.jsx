import { useParams } from 'react-router';
import { useState, useEffect, useDebugValue } from 'react'
import axios from 'axios';
import { backendURL } from '../../config';
import '../App.css';

export const User = () => {
    let { id } = useParams();
    
    const [allUsers, setAllUsers] = useState(null);
        
    // Update URL when id changes
    useEffect(() => {
        if (id) {
            axios.get(`${backendURL}/user/${id}`)
                .then(response => {
                    setAllUsers(response.data);
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
                <h1>{user.userName}</h1>
                <div>
                    <p>User ID: {user.id}</p>
                    <p>parkingFeesOwed: {fee} kr</p>
                </div>
        </>
        )
      }

    return (
        <div>
            
            {id && allUsers ? <DisplayUserDetails user={allUsers} /> : '<p></p>Loading...</p>'}
        </div>
    )
}