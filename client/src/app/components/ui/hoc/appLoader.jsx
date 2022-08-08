import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { getIsLoggedIn, getUserLoadingStatus, loadUserData } from "../../../store/users";
import { getFavoriteLoadingStatus, loadFavoritetList } from "../../../store/favorites";
import { getCartLoadingStatus, loadCartList } from "../../../store/cart";
import Loader from "../../common/loader";

const AppLoader = ({ children }) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getIsLoggedIn());
    const userLoadingStatus = useSelector(getUserLoadingStatus());
    const favoritesLoadingStatus = useSelector(getFavoriteLoadingStatus());
    const cartLoadingStatus = useSelector(getCartLoadingStatus());
    const loadingStatus = userLoadingStatus && cartLoadingStatus && favoritesLoadingStatus;
    useEffect(() => {
        if (isLoggedIn) {
            dispatch(loadUserData());
            dispatch(loadCartList());
            dispatch(loadFavoritetList());
        }
    }, [isLoggedIn]);
    if (loadingStatus) {
        return (
            <Loader/>
        );
    }
    return children;
};

AppLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default AppLoader;
