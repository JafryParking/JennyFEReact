import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { backendURL } from '../../config';
import { NewUserForm } from '../components/NewUserForm.jsx';

export const Register = () => {
    const navigate = useNavigate();

    const [newUser, setNewUser] = useState(null);

    // Send new user to backend, when newUser is set.
    useEffect(() => {
        if (newUser !== null) {
            axios.post(`${backendURL}/addUser`, newUser)
                .then(response => {
                    if (response.status === 200) {
                        response.data && navigate(`../user/${response.data.userID}`);
                    }
                })
                .catch(error => {
                    if (error.response) {
                        // The server responded with a status outside 2xx
                        if (error.response.status === 400) {
                            alert(error.response.data);
                        } else {
                            console.error(`Unexpected Error (${error.response.status}):`, error.response.data);
                        }
                    }
                });
        }
    }, [newUser]);

    return (
        <div id="registerPage">
            <h1>Register</h1>
            <NewUserForm setNewUser={setNewUser} />
        </div>
    )
}

export default Register;  // Lägg till exporten här