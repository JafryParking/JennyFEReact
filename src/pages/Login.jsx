import {useState, useEffect} from 'react';

export const Login = ({appUser,setAppUser}) => {

    const refAction =  (id, name, car) => {
        let newUser = { userID: id, userName: name, cars: [{ licencePlate: car }] };

            setAppUser(newUser );
            sessionStorage.setItem("persistedUser", JSON.stringify(newUser));
            
        }
        useEffect(() => {
            console.log("Updated AppUser:", appUser);
        }, [appUser]);

    return (
        <div>
            <h1>Login</h1>
            <button onClick={() => refAction(1,"JennyEvertsson","abc123")}>LOGIN ME</button>
            {appUser != null && <p>{JSON.stringify(appUser)}</p>}

        </div>
    )
}
