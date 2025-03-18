import styles from './user.module.css';
import { ListAllCars } from '../components/ListAllCars.jsx';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext.jsx';

export const StartParking = () => {
const  {appUser, setAppUser} = useContext(UserContext);

    if (appUser) {
    return (
        <>
        <h1>Start Parking</h1>
        {appUser.userName}'s cars:
        <ListAllCars appUser={appUser} setAppUser={setAppUser} cars={appUser.cars}/>
        </>
    )}
     else {return <h1>Start Parking-No user</h1>}
}