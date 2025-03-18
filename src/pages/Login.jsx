import {useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router';
import {useForm} from "react-hook-form";
import { UserContext } from '../contexts/UserContext';

export const Login = () => {
    const {appUser, setAppUser} = useContext(UserContext);
    
    const navigate = useNavigate();

        const {register, handleSubmit} = useForm();

        const onSubmit = (data) => setNewUser(data);


        const [newUser, setNewUser] = useState(null);
    
        // Send new user to backend, when newUser is set.
        useEffect(() => {
            if (newUser !== null) {
                axios.post(`${backendURL}/login`, newUser)
                    .then(response => {
                        if (response.status === 200) {
                            // response.data && navigate(`../user/${response.data.userID}`);
                            response.data && console.log(response.data);
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

        // Login for the static 3 buttons
        const refAction =  (id, name, car) => {
            let newUser = { Id: id, userName: name, cars: [{ licencePlate: car }] };
                setAppUser(newUser);
                sessionStorage.setItem("persistedUser", JSON.stringify(newUser));
                navigate(`../user/${newUser.Id}`);
            }
    

    return (
        <div>
            <h1>Login</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <input placeholder='Username' type="text" {...register("userName")} />
                <input placeholder='password'type="password" {...register("password")}/>
                <input placeholder='Email' type="email" {...register("email")}/>
                <input type="submit" value="Login"/>
            </form>



            <button onClick={() => refAction(1,"Jenny","")}>Login user 1</button>
            <button onClick={() => refAction(2,"Fredric","")}>Login user 2</button>
            <button onClick={() => refAction(3,"Jane","")}>Login user 3</button>
            {appUser != null && <p>{appUser.userName}</p>}

        </div>
    )
}
