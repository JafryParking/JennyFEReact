import styles from '../pages/user.module.css';
import { useEffect, useState } from 'react';

function formatDateTime(dateString) {
    let date = new Date(dateString);
    let now = new Date();
    let year = date.getFullYear();
    let month = date.toLocaleString('en-US', { month: 'short' }); 
    let day = date.getDate();
    let hours = date.getHours().toString().padStart(2, '0'); // Ensure two-digits
    let minutes = date.getMinutes().toString().padStart(2, '0'); // Ensure two-digits
    // If the year is the current year, omit it
    let showYear = year !== now.getFullYear();
    // Format string based on condition
    return showYear
        ? `${month} ${day}, ${year} @ ${hours}:${minutes}`
        : `${month} ${day} @ ${hours}:${minutes}`;
}
export const ListParkingHistory = ({userHistory}) => {
    const [history, setHistory] = useState();
    
    useEffect(()=>{
        setHistory(userHistory);
    },[])

    const [sortOption, setSortOption] = useState("regPlate"); // Default sort by date
        
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
                <option value="date">Date Parked</option>
                <option value="dateRev">Date Parked (oldest first)</option>
                <option value="regPlate">Reg Plate</option>
            </select>
            </label>
        <ul className={styles.parkingHistory}>
            {history.map((park, index) => { 
                return (            
                    <li key={index}><em>{park.parkedCar.regPlate} :</em> {formatDateTime(park.startTime)} - {formatDateTime(park.endTime)}</li>
                )
            })}
        </ul>
     </section>
    )}
    return (
        <p>No parking history</p>
    )
}