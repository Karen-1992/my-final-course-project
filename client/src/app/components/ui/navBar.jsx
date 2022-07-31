import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../../store/users";
import NavProfile from "./navProfile";
import { getCartQuantity } from "../../store/cart";

const NavBar = () => {
    const cartQuantity = useSelector(getCartQuantity());
    const isLoggedIn = useSelector(getIsLoggedIn());
    return (
        <nav className="navbar bg-light mb-3">
            <div className="container-fluid">
                <ul className="nav">
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
                            Продукты
                        </Link>
                    </li>
                </ul>
                {isLoggedIn && (
                    <ul className="nav">
                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                aria-current="page"
                                to="/cabinet/favorites"
                            >
                                <div className="text-center">
                                    <h4>
                                        <i className="bi bi-heart"></i>
                                    </h4>
                                    <p>Избранное</p>
                                </div>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className="nav-link position-relative"
                                aria-current="page"
                                to="/cart"
                            >
                                <div className="text-center">
                                    <h4>
                                        <i className="bi bi-cart3">
                                        </i>
                                    </h4>
                                    <p>Корзина</p>
                                </div>
                                {cartQuantity > 0 && (
                                    <span
                                        className="position-absolute top-0 start-100 translate-middle
                                            badge rounded-pill bg-dark"
                                    >
                                        {cartQuantity}
                                    </span>
                                )}
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
