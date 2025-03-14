import { NavLink, Outlet, useLocation } from 'react-router';
import { useState, useEffect } from 'react';
import { ParkingP } from './ParkingP';
import '../Navbar.css'; // Lägg till en CSS-fil för styling

export const Navbar = ({ appUser }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    // Stäng menyn vid sidbyte
    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname]);

    return (
    <>
        <nav className="navbar">
            <div className="logo">Jafry Parking</div>
            <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                ☰
            </button>
            <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
                <NavLink to="/" >Home</NavLink>
                <NavLink to="register" >Register</NavLink>
                <NavLink to="login" >Login</NavLink>
                
                <NavLink to={`/user/${appUser ? appUser.userID : 0}`}>
                    {appUser ? appUser.userName : 'Not logged in'}
                </NavLink>
            </div>
        </nav>
        {/* Pages content goes here */}
        <Outlet />

        {/* Big P parking sign - made into a Component*/}
        <ParkingP appUser={appUser}/>
    </>
    );
};