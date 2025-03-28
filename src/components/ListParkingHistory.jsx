import styles from '../pages/user.module.css';
import { useEffect, useState } from 'react';
import { MdDirectionsCar , MdPayment , MdKeyboardDoubleArrowRight  } from "react-icons/md";
import { formatDateTime, formatDoubleToKr } from '../formatHelpers/formatHelperFunctions';

// -----------------------------------------------------------------------------
//     Usage <ListParkingHistory userHistory={appUser.parkingHistory} />
//
//  Prints out the list of parking history of a user. Adds a drop down sorting
//  option to display the list sorted by carPlate or date parked.
// 
//  Default sorting option: show only the five latest parking periods
// -----------------------------------------------------------------------------

export const ListParkingHistory = ({userHistory}) => {
    const [history, setHistory] = useState();
    const [sortOption, setSortOption] = useState("lastFive"); // Default sort 

    // Default sort on mount - last five parking periods.
    useEffect(()=>{
        userHistory && setHistory( [...userHistory]
            .sort((a, b) => new Date(b.endTime) - new Date(a.endTime))
            .slice(0, 5));
    },[])
    
    const sortList = (option) => {
        setSortOption(option);
    
        let sortedHistory;
        switch (option) {
            case "date":
                sortedHistory = [...userHistory].sort((a, b) => new Date(b.endTime) - new Date(a.endTime));
                break;
            case "regPlate":
                sortedHistory = [...userHistory].sort((a, b) => b.parkedCar.regPlate.localeCompare(a.parkedCar.regPlate));
            case "dateRev":
                sortedHistory = [...userHistory].sort((a, b) => new Date(a.endTime) - new Date(b.endTime));
                break;
            case "lastFive":
                sortedHistory = [...userHistory].sort((a, b) => new Date(b.endTime) - new Date(a.endTime)).slice(0, 5);
                break;
            default:
                sortedHistory = userHistory;
        }
        setHistory(sortedHistory);
    };
    
    if (history) {
    return (
        <section>
             <label className={styles.sortLabel} htmlFor="sortSelect">Sort by: 
             <select className={styles.sortSelect} value={sortOption} onChange={(e) => sortList(e.target.value)}>
                <option value="lastFive">Last 5 parking periods</option>
                <option value="date">List all by Date Parked</option>
                <option value="dateRev">List all by Date Parked (oldest first)</option>
                <option value="regPlate">List all by Reg Plate</option>
            </select>
            </label>
        <ul className={styles.parkingHistory}>
            {history.map((park) => { 
                return (            
                         <li key={park.startTime} className={styles.parkingGrid}>
                        <span className={styles.regPlate}> 
                            <MdDirectionsCar size="14"/> {park.parkedCar.regPlate}</span>
                        <span className={styles.parkingFee}>
                            <MdPayment size="14" /> {formatDoubleToKr(park.parkingFee)} kr
                        </span>
                            <span className={styles.parkingTime}>{formatDateTime(park.startTime)}
                            <MdKeyboardDoubleArrowRight  size="14" /> {formatDateTime(park.endTime)} </span>
                    </li>
                )
            })}
        </ul>
     </section>
    )}
    return (
        <section><p>No parking history</p></section>
    )
}