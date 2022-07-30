import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartLoadingStatus, loadCartList } from "../../../store/cart";
import PropTypes from "prop-types";
import {
    getIsLoggedIn
} from "../../../store/users";

const CartLoader = ({ children }) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getIsLoggedIn());
    const dataStatus = useSelector(getCartLoadingStatus());
    useEffect(() => {
        if (isLoggedIn) dispatch(loadCartList());
    }, [isLoggedIn]);
    if (dataStatus) return "Loading";
    return children;
};

CartLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default CartLoader;
