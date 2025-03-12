import {useState} from 'react';

export const Login = ({appUser,setAppUser}) => {

    const refAction =  ({id}, {name}, {car}) => {
            let newCollection = { userID: {id}, name: {name}, licencePlate: {car} };
            setAppUser(prevUser => ({ ...prevUser, userID: 1, name: "John Doe", licencePlate: "ABC123" }));
            sessionStorage.setItem("persistedUser", JSON.stringify(newCollection));
        }


    return (
        <div>
            <h2>Login</h2>
            <button onClick={() => refAction(1,"test","test")}>LOGIN ME</button>
            {appUser != null && <p>{JSON.stringify(appUser)}</p>}

        </div>
    )
}