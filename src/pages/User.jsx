import { useParams } from 'react-router';
import { useState, useEffect, useDebugValue } from 'react'
import axios from 'axios';
import { backendURL } from '../../config';
import '../App.css';

export const User = () => {
    let { id } = useParams();
    
    const [allUsers, setAllUsers] = useState(null);
        
    // Update URL when id changes
    useEffect(() => {
        if (id) {
            axios.get(`${backendURL}/user/${id}`)
                .then(response => {
                    setAllUsers(response.data);
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                });
        }
    }, [id]);
    
    const ListAllCars = ({cars}) => {
        console.log(cars)
        if (!cars) {
            return (
                <div>Add cars</div>
            );
        }
        return (
            <div id="cars">
            {cars.map(car => {
                return (<div class="car">{car.licencePlate}</div>)
            })}
        </div>
        )
     }

    const DisplayUserDetails = ({user}) => {
        let fee = new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(user.parkingFeesOwed);
        return (
            <>
                <h1>({user.id}) {user.userName}</h1>
                <div>
                    <p>parkingFeesOwed: {fee} kr</p>
                </div>
                {<ListAllCars cars={user.cars} />}
        </>
        )
      }

    return (
        <div>
            {id && allUsers ? <DisplayUserDetails user={allUsers} /> : 'No such user'}
        </div>
    )
}