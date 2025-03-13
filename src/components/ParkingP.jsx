import styles from './parkingp.module.css';
import { useNavigate } from 'react-router';

export const ParkingP = () => {
    const navigate = useNavigate();

    function doStuff(){
        navigate("start-parking");
    }
    return (
        <div className={styles.bigP} onClick={doStuff}>
            P
            </div>
    )
}