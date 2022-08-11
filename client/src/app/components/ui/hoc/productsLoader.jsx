import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataStatus, loadProductsList } from "../../../store/products";
import PropTypes from "prop-types";
import Loader from "../../common/loader";

const ProductsLoader = ({ children }) => {
    const dispatch = useDispatch();
    const dataStatus = useSelector(getDataStatus());
    useEffect(() => {
        // dispatch(loadCommentsList());
        if (!dataStatus) {
            dispatch(loadProductsList());
        }
    }, []);
    if (!dataStatus) {
        return (
            <Loader/>
        );
    }
    return children;
};

ProductsLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default ProductsLoader;
