import { NavMenu } from './NavMenu';
import { Outlet } from "react-router-dom";
export default function Root() {
    return (
        <div>
            <NavMenu />
            <Outlet />
        </div>
    );
}