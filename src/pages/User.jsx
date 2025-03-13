import { useParams } from 'react-router';
import { useState, useEffect } from 'react'
import axios from 'axios';
import { backendURL } from '../../config';

export const User = () => {
    let { id } = useParams();
    
    const [allUsers, setAllUsers] = useState(null);
        
    // Update URL when id changes
    useEffect(() => {
        if (id) {
            axios.get(`${backendURL}/user/${id}`)
                .then(response => {
                    setAllUsers(response.data);
                    console.log("Response is", response);
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                });
        }
    }, [id]);
    

    return (
        <div>
            <h1>{id ? 'User' : 'Users'}</h1>
            <p>{id && allUsers ? allUsers.userName : 'Loading...'}</p>
            
        </div>
    )
}