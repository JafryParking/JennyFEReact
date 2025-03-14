import styles from './user.module.css';
import { ListAllCars } from '../components/ListAllCars.jsx';
export const StartParking = ({appUser}) => {

    if (appUser) {
    return (
        <>
        <h1>Start Parking</h1>
        {appUser.userName}'s cars:
        <ListAllCars appUser={appUser} cars={appUser.cars}/>
        </>
    )}
     else {return <h1>Start Parking-No user</h1>}
}