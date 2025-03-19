import styles from './parkingp.module.css';
import { useNavigate } from 'react-router';

export const ParkingP = ({appUser}) => {
    const navigate = useNavigate();

    function InitiateStartParking(){
        navigate("start-parking");
    }
    const PrintP=() => {
        if (appUser) {
            return (<p>P</p>)
        }
        else {
            return (
                <p className={styles.notActive}>P</p>
            )
        }
    }
    return (
        <div className={styles.bigP} onClick={InitiateStartParking}>
            <PrintP  />
        </div>
    )
}

export default ParkingP;