import {NavLink, Outlet} from 'react-router-dom';
import { useState } from 'react';
import './Navbar.css'; // Lägg till en CSS-fil för styling

export const Layout = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="navbar">
            <div className="logo">Jafry Parking</div>
            <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                ☰
            </button>
            <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
                <NavLink to="/" >Home</NavLink>
                <NavLink to="login" >Login</NavLink>
                <NavLink to="/user/1">User 1</NavLink>
                <NavLink to="park" >Park</NavLink>
            </div>
            <Outlet />
        </nav>
    )
}