import {useState, useEffect} from 'react';
import axios from 'axios';
import { backendURL } from '../../config';


export const Register = () => {

    const [newUser, setNewUser] = useState(null);

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

    function doit() {
        // Kommenterar bort så det inte reggas nya användare hela tiden medan jag testar.
        // setNewUser({username: "Karl", password: "password", email: 'karl@yahoo.se', licensePlate: 'nnn999'});
    }

    return (
        <div id="registerPage">
            <h1>Register</h1>
            <button onClick={doit}>REGISTER</button>
        </div>
    )
}