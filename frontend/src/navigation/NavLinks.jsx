import { NavLink } from "react-router-dom"
import "./NavLinks.css";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext/AuthContext";
const NavLinks = () => {
    const auth = useContext(AuthContext);
    return (
        <nav>
            <ul>
                {auth.isLoggedIn ?
                <>
                    <li>
                        <button onClick={auth.logout}>Logout</button>
                    </li>
                    <li>
                        <NavLink to="/add">Add</NavLink>
                    </li>
                </>
                
                : <li>
                        <NavLink to="/login">Login</NavLink>
                    </li>}
                
                <li>
                    <NavLink to="/">List</NavLink>
                </li>
            </ul>  
        </nav>
    );
};

export default NavLinks;