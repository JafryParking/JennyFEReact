import { useForm } from "react-hook-form";
import liststyles from "./listallCars.module.css";
import axios from "axios";
import { backendURL } from "../../config";
import { useAtom } from "jotai";
import { userAtom } from "../atoms/userAtom";

// -----------------------------------------------------------------------------
//     Usage: <AddNewCar userID={} />
//
//  Component to print form for adding a new car, and sending it to the backend. 
//  Updates appUser state to autmatically re-render the page
// 
//   To fix: error displaying wierd?
// -----------------------------------------------------------------------------
export const AddNewCar = ({userID}) => {
    const [appUser, setAppUser] = useAtom(userAtom);
    const { register, reset, handleSubmit, formState:{errors} } = useForm();

    const addCar = (input) => {
        axios.post( `${backendURL}/addCar`, input )
            .then(response => {
                if (response.status === 200 && response.data) {
                    setAppUser(prev => ({
                        ...prev,
                        cars: response.data
                    }));
                }
            })
            .catch(error => {
                alert(error.response.data);
            }).finally(()=> reset());
    }

return (
            <form className={liststyles.addCar} onSubmit={handleSubmit(addCar)}>
                    <label htmlFor="regPlate">Add car:</label>
                    <input type="text" placeholder="abc123" name="regPlate" {...register("regPlate", {required:true, minLength:6})}  />
                    <input type="hidden" value={userID} name="UserID" {...register("UserID")} />
                    <button type="submit">Save</button>
                    {errors.regPlate && <p>Cars need at least 6 symbols</p>}
                </form>
)
}