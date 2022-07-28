import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataStatus, loadProductsList } from "../../../store/products";
import PropTypes from "prop-types";
import {
    getIsLoggedIn,
    // getUserLoadingStatus,
    loadUserData
} from "../../../store/users";
import { loadCategoriesList } from "../../../store/categories";

const ProductsLoader = ({ children }) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getIsLoggedIn());
    // const userStatusLoading = useSelector(getUserLoadingStatus());
    const dataStatus = useSelector(getDataStatus());
    useEffect(() => {
        if (!dataStatus) {
            dispatch(loadProductsList());
            dispatch(loadCategoriesList());
        }
        if (isLoggedIn) dispatch(loadUserData());
    }, [isLoggedIn]);

    // useEffect(() => {
    //     if (!dataStatus) {
    //         dispatch(loadProductsList());
    //         dispatch(loadCategoriesList());
    //         dispatch(loadUserInfo());
    //     }
    // }, []);
    if (!dataStatus) return "Loading";
    return children;
};

ProductsLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default ProductsLoader;
