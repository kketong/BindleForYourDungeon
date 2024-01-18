import { NavMenu } from './components/NavMenu';
import { Outlet, } from "react-router-dom";
export default function Layout() {
    return (
        <div>
            <NavMenu />
            <Outlet />
        </div>
    );
}