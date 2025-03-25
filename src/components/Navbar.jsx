import { NavLink, Outlet, useLocation, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import '../Navbar.css'; 
import logo from '../assets/jafry_parking_logo.svg';
import { useAtom } from 'jotai';
import { userAtom } from '../atoms/userAtom';

// -----------------------------------------------------------------------------
//     Usage 
// 
// -----------------------------------------------------------------------------

const Navbar = () => {
    const [appUser, setAppUser] = useAtom(userAtom);
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const LogMeOut = () => {
        setAppUser(null);
    };

    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        if (appUser == null) navigate('/');
    }, [appUser]);

    const LoginOrUserPage = () => {
        if (appUser && appUser.id != null) {
            return (
                <>
                    <NavLink to={`user/${appUser.id}`}>{appUser.userName}</NavLink>
                    <button onClick={LogMeOut} className="logout-btn">Log out</button>
                </>
            );
        } else {
            return (
                <>
                    <NavLink to="register" className="nav-item">Register</NavLink>
                    <NavLink to="login" className="nav-item login-btn">Login</NavLink>
                </>
            );
        }
    };

    return (
        <>
            <nav className="navbar">
                <div className="logo">
                    <NavLink to="/" aria-label="Go to Home">
                        <img src={logo} alt="Jafry Parking Logo" style={{ height: '40px' }} />
                    </NavLink>
                </div>
                <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
                    ☰
                </button>
                <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
                    <NavLink to="/" >Home</NavLink>
                    <LoginOrUserPage />
                </div>
            </nav>
            <Outlet />
        </>
    );
};

export default Navbar;