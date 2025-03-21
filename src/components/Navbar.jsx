import { NavLink, Outlet, useLocation } from 'react-router';
import { useState, useEffect } from 'react';
import '../Navbar.css'; // Lägg till en CSS-fil för styling
import { UserContext } from '../contexts/UserContext';

const Navbar = () => {
    const [appUser, setAppUser] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    
    useEffect(() => {
        let savedUser = sessionStorage.getItem("persistedUser");
        if (savedUser) {
            setAppUser(savedUser ? JSON.parse(savedUser) : null);
        }
    }, []); // Runs only on mount

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
        sessionStorage.setItem("persistedUser", JSON.stringify(null));
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


    </UserContext.Provider>
    );
};

export default Navbar;  // Här läggs till standardexporten