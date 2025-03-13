import {NavLink, Outlet} from 'react-router';
import { useState } from 'react';
import '../Navbar.css'; // Lägg till en CSS-fil för styling

export const Navbar = ({appUser}) => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="navbar">
            <div className="logo">Jafry Parking</div>
            <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                ☰
            </button>
            <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
                <NavLink to="/" >Home</NavLink>
                <NavLink to="register" >Register</NavLink>
                <NavLink to="login" >Login</NavLink>
                
                <NavLink to={`/user/${appUser ? appUser.userID: 0}`}>
                    {appUser ? appUser.userName : 'Not logged in'}</NavLink>
                
            </div>
            <Outlet />
        </nav>
    )
}