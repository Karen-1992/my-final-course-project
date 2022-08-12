import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCartQuantity } from "../../../store/cart";
import { getFavoriteQuantity } from "../../../store/favorites";
import { getIsAdmin, getIsLoggedIn } from "../../../store/users";
import ImageComponent from "../../common/imageComponent";
import logo from "../../../assets/images/logo.png";
import NavProfile from "../navProfile";
import NavItemWithCount from "../../common/navItemWithCount";
import useDebounce from "../../../hooks/useDebounce";
import productService from "../../../services/product.service";

const NavBar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [results, setResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const debouncedSearchQuery = useDebounce(searchQuery, 1000);
    useEffect(() => {
        if (debouncedSearchQuery) {
            setIsSearching(true);
            productService.getQuery({ query: searchQuery }).then(res => setResults(res));
        } else {
            setResults([]);
        }
    }, [debouncedSearchQuery]);
    const handleSearchQuery = ({ target }) => {
        setSearchQuery(target.value);
    };
    if (isSearching) {
        console.log(results);
    } else {
        console.log("loading");
    }
    const cartQuantity = useSelector(getCartQuantity());
    const favoritesQuantity = useSelector(getFavoriteQuantity());
    const isLoggedIn = useSelector(getIsLoggedIn());
    const isAdmin = useSelector(getIsAdmin());
    return (
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
                <div className="input-group-lg w-100 align-self-center px-5 d-flex">
                    <input onChange={(e) => handleSearchQuery(e)} className="form-control" type="search" placeholder="Search" />
                    <button onClick={(e) => handleSearchQuery(e)} className="btn btn-outline-success" type="submit">Search</button>
                </div>
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
    );
};

export default NavBar;
