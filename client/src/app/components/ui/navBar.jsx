import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../../store/users";
import NavProfile from "./navProfile";
import { getCartQuantity } from "../../store/cart";
import { getFavoriteQuantity } from "../../store/favorites";
import NavItemWithCount from "../common/navItemWithCount";

const NavBar = () => {
    const cartQuantity = useSelector(getCartQuantity());
    const favoritesQuantity = useSelector(getFavoriteQuantity());
    const isLoggedIn = useSelector(getIsLoggedIn());
    return (
        <nav className="navbar bg-light mb-3">
            <div className="container-fluid">
                <ul className="nav">
                    <li className="nav-item">
                        <Link
                            className="nav-link "
                            aria-current="page"
                            to="/initdata"
                        >
                            InitData
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link " aria-current="page" to="/">
                            <div className="d-flex gap-3 px-3">
                                <h4>
                                    <i className="bi bi-shop"></i>
                                </h4>
                                <h4>E-STORE</h4>
                            </div>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            className="nav-link "
                            aria-current="page"
                            to="/products"
                        >
                            Товары
                        </Link>
                    </li>
                    {isLoggedIn && (
                        <li className="nav-item">
                            <Link
                                className="nav-link "
                                aria-current="page"
                                to="/dashboard"
                            >
                                Admin
                            </Link>
                        </li>
                    )}
                </ul>
                {isLoggedIn && (
                    <ul className="nav">
                        <li className="nav-item">
                            <Link
                                className="nav-link position-relative"
                                aria-current="page"
                                to="/cabinet/favorites"
                            >
                                <NavItemWithCount
                                    quantity={favoritesQuantity}
                                    title="Избранное"
                                    iconClasses="bi bi-heart"
                                />
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className="nav-link position-relative"
                                aria-current="page"
                                to="/cart"
                            >
                                <NavItemWithCount
                                    quantity={cartQuantity}
                                    title="Корзина"
                                    iconClasses="bi bi-cart3"
                                />
                            </Link>
                        </li>
                    </ul>
                )}
                <div className="d-flex">
                    {isLoggedIn ? (
                        <NavProfile />
                    ) : (
                        <Link
                            className="nav-link "
                            aria-current="page"
                            to="/login"
                        >
                            <h4>
                                <i className="bi bi-person"></i>
                            </h4>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
