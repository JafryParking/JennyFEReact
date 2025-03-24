import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from "react-hook-form";

import { backendURL } from '../../config';
import axios from 'axios';
import { useAtom } from 'jotai';
import { userAtom } from '../atoms/userAtom';

const Login = () => {
    const [ appUser, setAppUser ]  = useAtom(userAtom);

    const navigate = useNavigate();

    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => setNewUser(data);

    const [newUser, setNewUser] = useState(null);

    // Send new user to backend, when newUser is set.
    useEffect(() => {

        if (newUser !== null) {
            newUser && axios.post(`${backendURL}/user/login`, newUser, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then(response => {
                    if (response.status === 200) {
                        response.data && navigate(`../user/${response.data.userID}`);
                        setAppUser(response.data);
                    }
                })
                .catch(error => {
                    alert(error.response ? error.response.data : error.message);
                });
        }
    }, [newUser]);

    // Login for the static 3 buttons
    const refAction = (id, name, car) => {
        let newUser = { Id: id, userName: name, cars: [{ licencePlate: car }] };
        setAppUser(newUser);
        console.log(newUser);
        sessionStorage.setItem("persistedUser", JSON.stringify(newUser));
        navigate(`../user/${newUser.Id}`);
    }

    return (
        <div>
            <h1>Login</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <input placeholder='Username' type="text" {...register("UserName")} />
                <input placeholder='password' type="password" {...register("Password")} />
                <input type="submit" value="Login" />
            </form>

            <button onClick={() => refAction(1, "Jenny", "")}>Login user 1</button>
            <button onClick={() => refAction(2, "Fredric", "")}>Login user 2</button>
            <button onClick={() => refAction(3, "Jane", "")}>Login user 3</button>
            {appUser != null && <p>{appUser.userName}</p>}

        </div>
    )
}

export default Login;  // Lägg till denna rad för att exportera som standard