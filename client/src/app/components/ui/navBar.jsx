import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../../store/users";
import NavProfile from "./navProfile";

const NavBar = () => {
    const isLoggedIn = useSelector(getIsLoggedIn());
    return (
        <nav className="navbar bg-light mb-3">
            <div className="container-fluid">
                <ul className="nav">
                    <li className="nav-item">
                        <Link className="nav-link " aria-current="page" to="/">
                            Main
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            className="nav-link "
                            aria-current="page"
                            to="/products"
                        >
                            Products
                        </Link>
                    </li>
                    {isLoggedIn && (
                        <li className="nav-item">
                            <Link
                                className="nav-link "
                                aria-current="page"
                                to="/favorites"
                            >
                                Favorites
                            </Link>
                        </li>
                    )}
                </ul>
                <div className="nav">
                    {isLoggedIn ? (
                        <NavProfile />
                    ) : (
                        <Link
                            className="nav-link "
                            aria-current="page"
                            to="/login"
                        >
                            Login
                        </Link>
                    )}
                    {isLoggedIn && (
                        <Link
                            className="nav-link "
                            aria-current="page"
                            to="/cart"
                        >
                            Cart
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
