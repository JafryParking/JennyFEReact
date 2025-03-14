import styles from './user.module.css';
export const StartParking = ({appUser}) => {

     const ListAllCars = () => {
            if (!appUser.cars || appUser.cars.length < 1) {
                return (
                    <div>Add cars - print form here</div>
                );
            } else
            return (
                <div id="cars">
                {appUser.cars.map((car, index) => { 
                    return (
                        <div key={index} className={styles.car}>{car.licencePlate}</div>
                    )
                })}
               </div>
            )
         }

    if (appUser) {
    return (
        
        <>
        <h1>Start Parking</h1>
        {appUser.userName}'s cars:
        <ListAllCars />
        </>
    )}
     else {return <h1>Start Parking-No user</h1>}
}