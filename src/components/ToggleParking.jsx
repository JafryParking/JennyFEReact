import axios from "axios";
import { useAtom } from "jotai";
import { userAtom } from "../atoms/userAtom";
import { backendURL } from "../../config";
import { formatDoubleToKr } from "../formatHelpers/formatHelperFunctions";

// -----------------------------------------------------------------------------
//     Usage const toggleParkThisCar = useTogglePark() 
//       &   onClick={() => toggleParkThisCar(car)} 
// 
//   Custom hook to start and stop parking of a car. Sends to back-end 
//   and pops up an alert when parking stopped and you have a fee total.
//   
// -----------------------------------------------------------------------------
export const useTogglePark = () => {
    const [appUser, setAppUser] = useAtom(userAtom);
    
    const toggleParkThisCar = (car) => {
    
        let isParkedNow = appUser?.isParked?.some(parked => parked.regPlate === car.regPlate) || false;  
    
        if (!isParkedNow) {
            // Start parking
            axios.post(`${backendURL}/startParking`, {
                userID: appUser.id,
                regPlate: car.regPlate
            })
            .then(response => {
                setAppUser(response.data);
            })
            .catch(error => {
                console.error("Error starting parking:", error);
            });
        } else {
            // Stop parking
            axios.get(`${backendURL}/stopParking/${car.regPlate}`)
                .then(response => {
                    let fee = formatDoubleToKr(response.data.fee);
                    alert(`${fee} kr added to your account.`);
                    setAppUser(response.data.user);
                })
                .catch(error => {
                    console.error("Error stopping parking:", error);
                });
        }
    };

    return toggleParkThisCar;
};