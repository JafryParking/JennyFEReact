import {useState, useEffect} from 'react';
import axios from 'axios';
import { backendURL } from '../../config';


export const Register = () => {

    const [newUser, setNewUser] = useState(null);

    // Send new user to backend, when newUser is set.
    useEffect(() => {
        if (newUser !== null) {
            axios.post(`${backendURL}/addUser`, newUser)
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                });
        }
    }, [newUser]);

    function registerUser() {
        let hardcodedUser = {username: "Karl", password: "password", email: 'karl@yahoo.se', licensePlate: 'nnn999'}
        console.log(hardcodedUser);
        // Kommenterar bort så det inte reggas nya användare hela tiden medan jag testar.
        // setNewUser(hardcodedUser);
    }

    return (
        <div id="registerPage">
            <h1>Register</h1>
            <button onClick={registerUser}>REGISTER</button>
        </div>
    )
}