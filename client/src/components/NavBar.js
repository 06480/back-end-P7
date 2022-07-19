import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";
import Logout from "./Log/Logout";

const NavBar = () => {
    const uid = useContext(UidContext);

    return(
<nav>
    <div className="nav-container">
        <div className="logo">
            <NavLink exact to="/">
                <div className="logo">
                    <h3>Groupomania</h3>
                </div>
            </NavLink>
        </div>
        {uid ? (
            <ul>
                <li></li>
                <li className="welcome">
                    <NavLink exact to="/profil">
                        <h5>Bienvenue valeur</h5>
                    </NavLink>
                </li>
                <Logout />
            </ul>
        ) : (
            <ul>
                <li></li>
                <NavLink exact to="/profil">
                    <img src="./img/icons/login.svg" alt="login"/>
                </NavLink>
            </ul>
        )}
    </div>
</nav>
        
    );
};

export default NavBar;