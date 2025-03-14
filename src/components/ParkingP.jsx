import styles from './parkingp.module.css';
import { useNavigate } from 'react-router';

export const ParkingP = ({appUser}) => {
    const navigate = useNavigate();

    function InitiateStartParking(){
        navigate("start-parking");
    }
    const PrintP=({appUser}) => {
        if (appUser) {
            return ('P')
            }
    }
    return (
        <div className={styles.bigP} onClick={InitiateStartParking}>
            <PrintP appUser={appUser} />
        </div>
    )
}