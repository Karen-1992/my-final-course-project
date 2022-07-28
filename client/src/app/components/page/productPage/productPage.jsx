import React from "react";
import PropTypes from "prop-types";

const ProductPage = ({ productId }) => {
    return (
        <h1>ProductPage</h1>
    );
};

ProductPage.propTypes = {
    productId: PropTypes.string.isRequired
};

export default ProductPage;
