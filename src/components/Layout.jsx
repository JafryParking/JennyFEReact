import {Outlet} from 'react-router';

export const Layout = () => {
    return (
        <div>
            <h2>Layout</h2>
            <Outlet />
        </div>
    )
}