import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router';

export const Login = ({appUser,setAppUser}) => {
    const navigate = useNavigate();
    const refAction =  (id, name, car) => {
        let newUser = { Id: id, userName: name, cars: [{ licencePlate: car }] };

            setAppUser(newUser);
            sessionStorage.setItem("persistedUser", JSON.stringify(newUser));
            navigate(`../user/${newUser.Id}`);
        }
        useEffect(() => {
            // console.log("Updated AppUser:", appUser);
        }, [appUser]);

    return (
        <div>
            <h1>Login</h1>
            <button onClick={() => refAction(1,"Jenny","")}>Login user 1</button>
            <button onClick={() => refAction(2,"Fredric","")}>Login user 2</button>
            <button onClick={() => refAction(3,"Jane","")}>Login user 3</button>
            {appUser != null && <p>{appUser.userName}</p>}

        </div>
    )
}
