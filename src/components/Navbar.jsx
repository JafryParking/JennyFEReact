import { NavLink, Outlet, useLocation, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import '../Navbar.css'; // Lägg till en CSS-fil för styling

import { useAtom } from 'jotai';
import { userAtom } from '../atoms/userAtom';

const Navbar = () => {
    const [appUser, setAppUser] = useAtom(userAtom);
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const LoginOrUserPage = () =>{
        if (appUser&& appUser.id!=null){
            return (
                <>
                <NavLink to={`user/${appUser.id}`}>My page</NavLink>
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
    useEffect(()=>{
        if (appUser == null)
            navigate('/');
    },[appUser])


    return (
    <>
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
        </>
    );
};

export default Navbar;  // Här läggs till standardexporten