import { useState, useEffect } from 'react'
import axios from 'axios';

export const User = () => {
    const [allUsers, setAllUsers] = useState(null);
    // https://localhost:7198/

    useEffect(() => {
        axios.get("https://localhost:7198/")
        .then(response => {
            setAllUsers(response.data)
        })  
    },[]);


    return (
        <div>

    <h1>Users</h1>
    <p>{allUsers}</p>

        </div>
    )
}