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
                <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink>
                <NavLink to="login" className={({ isActive }) => (isActive ? 'active' : '')}>Login</NavLink>
                <NavLink to="/user/1" className={({ isActive }) => (isActive ? 'active' : '')}>User 1</NavLink>
                <NavLink to="park" className={({ isActive }) => (isActive ? 'active' : '')}>Park</NavLink>
            </div>
            <Outlet />
        </nav>
    )
}