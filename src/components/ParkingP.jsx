import styles from './parkingp.module.css';
import { useNavigate } from 'react-router';

export const ParkingP = ({appUser}) => {
    const navigate = useNavigate();

    function doStuff(){
        navigate("start-parking");
    }
    const PrintP=({appUser}) => {
        if (appUser) {
            console.log(appUser.cars);
            return ('P')

            }
            
            
    }
    return (
        <div className={styles.bigP} onClick={doStuff}>
            <PrintP appUser={appUser} />
        </div>
    )
}