import { NavLink, Outlet, useLocation } from 'react-router';
import { useState, useEffect } from 'react';
import { ParkingP } from './ParkingP';
import '../Navbar.css'; // Lägg till en CSS-fil för styling
import { UserContext } from '../contexts/UserContext';

export const Navbar = () => {
    const [appUser, setAppUser] = useState(null);

    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    
    const LoginOrUserPage = () =>{
        if (appUser){
            return (
                <>
                <NavLink to={`user/${appUser.id}`}>{appUser.userName}</NavLink>)
                <button onClick={LogMeOut}>Log out</button>
                </>
                )
            }
        else {
            return (
                <>
                <NavLink to="register" >Register</NavLink>
                <NavLink to="login" >Login</NavLink>
                </>
            );
        }
    };
    // Stäng menyn vid sidbyte
    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname]);

    const LogMeOut = () =>{
        setAppUser(null);
    }
    
    return (
    <UserContext.Provider value={{appUser, setAppUser}}>
        <nav className="navbar">
            <div className="logo">Jafry Parking</div>
            <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                ☰
            </button>
            <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
                <NavLink to="/" >Home</NavLink>
                
                <LoginOrUserPage />
            
            </div>
        </nav>
        {/* Pages content goes here */}
        <Outlet />

        {/* Big P parking sign - made into a Component*/}
        <ParkingP appUser={appUser}/>
    </UserContext.Provider>
    );
};