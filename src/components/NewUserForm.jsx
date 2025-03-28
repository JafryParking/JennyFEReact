import styles from '../pages/user.module.css';
import {useForm} from "react-hook-form";

// -----------------------------------------------------------------------------
//     Usage <NewUserForm setNewUser={setNewUser} />
// 
//   Prints a react-hook-form to request new user information. Validates data
//   and sets a newUser to be dealt with on the Register 
// 
// -----------------------------------------------------------------------------
export const NewUserForm = ({ setNewUser }) => {

    const {register, handleSubmit, formState:{errors}} = useForm();

    const onSubmit = (data) => setNewUser(data);
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input placeholder='Username' type="text" {...register("userName", {required: true})} />
                    {errors.userName && <p className={styles.formError}>Username must be filled in</p>}
                <input placeholder='password'type="password" {...register("password", {required: true})}/>
                    {errors.password && <p className={styles.formError}>Password field must be filled in</p>}
                <input placeholder='Email' type="email" {...register("email", {required: true})}/>
                    {errors.email && <p className={styles.formError}>Email field must be filled in</p>}
                <div>
                    <input placeholder='Licence plate' type="text" {...register("regPlate")}/>
                    <input placeholder='Car nickname' type="text" {...register("name")}/>
                </div>
                <input type="submit" value="Add new User"/>
            </form>
        </div>
    )

}
