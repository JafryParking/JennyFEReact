import { useParams } from 'react-router';
import { useState, useEffect } from 'react'
import axios from 'axios';

export const User = () => {
    let { id } = useParams();
    console.log(id);
    const [allUsers, setAllUsers] = useState(null);
    const [getUrl, setGetUrl] = useState("https://localhost:7198/");
    
    // Update URL when id changes
    useEffect(() => {
        if (id) {
            setGetUrl(`https://localhost:7198/user/${id}`);
        }
    }, [id]);

    // Fetch data when URL changes
    useEffect(() => {
        axios.get(getUrl)
            .then(response => {
                setAllUsers(response.data);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, [getUrl]);

    return (
        <div>

    <h1>Users</h1>

    <p>{allUsers}</p>
        </div>
    )
}