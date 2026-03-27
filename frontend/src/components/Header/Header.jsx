import { NavLink } from "react-router-dom";
import "./Header.css";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import { useContext } from "react";
import controllerGif from "../../assets/Controller-idle.gif";
import NavLinks from "../../navigation/NavLinks";

function Header() {
    const auth = useContext(AuthContext);
    return (
        <header className="header">
            <ul>
                <li>
                    <p>Bibliothèque de Jeux de Société</p>
                </li>
                
                <li>
                    <img src={controllerGif} alt="Controller" />
                </li>
                <li>
                    <NavLinks />
                </li>
            </ul>  
        </header>
    );
}

export default Header;