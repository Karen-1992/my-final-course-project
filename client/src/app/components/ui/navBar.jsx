import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <ul className="nav">
            <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                    Home
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/edit">
                    Edit
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/login">
                    Login
                </Link>
            </li>
        </ul>
    );
};

export default NavBar;
