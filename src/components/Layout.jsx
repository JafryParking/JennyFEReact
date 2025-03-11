import {NavLink, Outlet} from 'react-router';

export const Layout = () => {
    return (
        <div id='sitebox'> 
        <div className='left'>
            <NavLink to="/">Home </NavLink>
            <NavLink to="/user/1">User 1 </NavLink>
            <NavLink to="park">Park </NavLink>
        </div>
        <div className='right'>
            <Outlet />
        </div>
        </div>
    )
}