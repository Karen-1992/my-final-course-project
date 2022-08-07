import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataStatus, loadProductsList } from "../../../store/products";
import PropTypes from "prop-types";
import { getIsLoggedIn, loadUserData } from "../../../store/users";
import { loadCategoriesList } from "../../../store/categories";
import { loadCartList } from "../../../store/cart";
import { loadFavoritetList } from "../../../store/favorites";
import { useLoading } from "../../../hooks/useLoading";
import Loader from "../../common/loader";

const AppLoader = ({ children }) => {
    const { clientX, clientY } = useLoading();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getIsLoggedIn());
    const dataStatus = useSelector(getDataStatus());
    useEffect(() => {
        if (!dataStatus) {
            dispatch(loadProductsList());
            dispatch(loadCategoriesList());
            if (isLoggedIn) {
                dispatch(loadCartList());
                dispatch(loadFavoritetList());
            }
        }
        if (isLoggedIn) dispatch(loadUserData());
    }, [isLoggedIn]);
    if (!dataStatus) {
        return (
            <Loader
                clientX={clientX}
                clientY={clientY}
            />
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
