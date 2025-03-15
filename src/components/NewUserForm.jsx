import {useForm} from "react-hook-form";

export const NewUserForm = ({ setNewUser }) => {

    const {register, handleSubmit} = useForm();

    const onSubmit = (data) => setNewUser(data);
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input placeholder='Username' type="text" {...register("userName")} />
                <input placeholder='password'type="password" {...register("password")}/>
                <input placeholder='Email' type="email" {...register("email")}/>
                <input placeholder='Licence plate' type="text" {...register("firstCar")}/>
                <input type="submit" value="Add new User"/>
            </form>
        </div>
    )

}
