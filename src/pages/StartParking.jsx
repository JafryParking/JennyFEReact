export const StartParking = ({appUser}) => {
    if (appUser) {
    return (
        
        <>
        <h1>Start Parking</h1>
        {appUser.userName}'s cars:
        </>
    )}
     else {return <h1>Start Parking-No user</h1>}
}