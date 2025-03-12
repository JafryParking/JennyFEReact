export const Home = ({appUser}) => {
    return (
        <>
        <h1>Jafry Parking App</h1>

        {appUser != null && <p>{JSON.stringify(appUser)}</p>}

        </>
    )
}