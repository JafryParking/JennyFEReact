import {useState, useEffect} from 'react';
import axios from 'axios';
import { backendURL } from '../../config';
import {NewUserForm} from '../components/NewUserForm.jsx';


export const Register = () => {

    const [newUser, setNewUser] = useState(null);

    // Send new user to backend, when newUser is set.
    useEffect(() => {
        if (newUser !== null) {
            axios.post(`${backendURL}/addUser`, newUser)
                .then(response => {
                    if (response.status === 200) {
                        console.log("Success:", response.data); // Handle successful response
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

    // function registerUser() {
    //     let hardcodedUser = {username: "Karl", password: "password", email: 'karl@yahoo.se', licensePlate: 'nnn999'}
    //     console.log(hardcodedUser);
    //     // Kommenterar bort så det inte reggas nya användare hela tiden medan jag testar.
    //     setNewUser(hardcodedUser);
    // }

    return (
        <div id="registerPage">
            <h1>Register</h1>
            <NewUserForm setNewUser={setNewUser} />
        </div>
    )
}