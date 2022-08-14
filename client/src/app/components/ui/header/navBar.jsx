import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCartQuantity } from "../../../store/cart";
import { getFavoriteQuantity } from "../../../store/favorites";
import { getIsAdmin, getIsLoggedIn } from "../../../store/users";
import ImageComponent from "../../common/imageComponent";
import logo from "../../../assets/images/logo.png";
import NavProfile from "../navProfile";
import NavItemWithCount from "../../common/navItemWithCount";
import PropTypes from "prop-types";
import SearchQuerry from "../../common/searhQuerry";

const NavBar = ({ onSearchQuery }) => {
    const cartQuantity = useSelector(getCartQuantity());
    const favoritesQuantity = useSelector(getFavoriteQuantity());
    const isLoggedIn = useSelector(getIsLoggedIn());
    const isAdmin = useSelector(getIsAdmin());
    return (
        <div>
            <nav className="bg-light p-4">
                <div className="d-flex align-self-center justify-content-between">
                    <div className="d-flex align-self-center wrap-nowrap">
                        <Link to="/">
                            <ImageComponent
                                height="60px"
                                width="60px"
                                src={logo}
                                classes="rounded-circle"
                            />
                        </Link>
                    </div>
                    <SearchQuerry onSearchQuery={onSearchQuery} />
                    <div className="d-flex align-self-center gap-3">
                        {isLoggedIn && isAdmin && (
                            <Link
                                className="nav-link"
                                to="/dashboard"
                            >
                                <i className="bi bi-gear fs-3"></i>
                            </Link>
                        )}
                        {isLoggedIn ? (
                            <div className="d-flex gap-3">
                                <Link
                                    className="position-relative"
                                    to="/cabinet/favorites"
                                >
                                    <NavItemWithCount
                                        quantity={favoritesQuantity}
                                        title="Избранное"
                                        iconClasses="bi bi-heart + fs-3"
                                    />
                                </Link>
                                <Link
                                    className="position-relative"
                                    to="/cart"
                                >
                                    <NavItemWithCount
                                        quantity={cartQuantity}
                                        title="Корзина"
                                        iconClasses="bi bi-cart3 + fs-3"
                                    />
                                </Link>
                                <NavProfile />
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="nav-link d-flex"
                            >
                                <i className="bi bi-person px-1"></i>
                                <span>Войти</span>
                            </Link>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
};

NavBar.propTypes = {
    onSearchQuery: PropTypes.func
};

export default NavBar;
