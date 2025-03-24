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

    const { register, handleSubmit, formState:{errors} } = useForm();

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



    return (
        <div>
            <h1>Login</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <input placeholder='Username' type="text" {...register("UserName", {required:true})} />
                <input placeholder='password' type="password" {...register("Password")} />
                <input type="submit" value="Login" />
            </form>

    

        </div>
    )
}

export default Login;  // Lägg till denna rad för att exportera som standard