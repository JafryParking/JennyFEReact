import styles from '../pages/user.module.css';

export const ListAllCars = ({cars}) => {
    if (!cars || cars.length < 1) {
        return (
            <div>Add cars - print form here</div>
        );
    } else
    return (
        <div id="cars">
        {cars.map((car, index) => { 
            return (
                <div key={index} className={styles.car}>{car.licencePlate}</div>
            )
        })}
        </div>
    )



}