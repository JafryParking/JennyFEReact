import axios from "axios";
import { useAtom } from "jotai";
import { userAtom } from "../atoms/userAtom";
import { backendURL } from "../../config";

export const useTogglePark = () => {
    
    const [appUser, setAppUser] = useAtom(userAtom);
    
    const toggleParkThisCar = (regPlate) => {
    
        let isParkedNow = appUser?.isParked?.some(parked => parked.regPlate === regPlate) || false;  
    
        if (!isParkedNow) {
            // Start parking
            axios.post(`${backendURL}/startParking`, {
                userID: appUser.id,
                regPlate: regPlate
            })
            .then(response => {
                setAppUser(response.data);
            })
            .catch(error => {
                console.error("Error starting parking:", error);
            });
        } else {
            // Stop parking
            axios.get(`${backendURL}/stopParking/${regPlate}`)
                .then(response => {
                    let fee = new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(response.data.fee);
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