import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getCategoriesLoadingStatus, getCategoryById } from "../../store/categories";
import { useLoading } from "../../hooks/useLoading";
import Loader from "../common/loader";

const Category = ({ id }) => {
    const { clientX, clientY } = useLoading();
    const isLoading = useSelector(getCategoriesLoadingStatus());
    const category = useSelector(getCategoryById(id));
    if (!isLoading) {
        return (
            <div className="align-middle">
                <span>
                    {category.name}
                </span>
            </div>
        );
    } else {
        return (
            <Loader
                clientX={clientX}
                clientY={clientY}
            />
        );
    }
};
Category.propTypes = {
    id: PropTypes.string
};
export default Category;
