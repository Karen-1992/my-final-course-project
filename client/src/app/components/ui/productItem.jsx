import React from "react";
import PropTypes from "prop-types";
import getArtFromId from "../../utils/getArtFromId";

const ProductItem = ({
    thumbnail, rating,
    _id,
    title,
    price,
    discountPercentage,
    onAddToCart
}) => {
    return (
        <div
            className="d-flex flex-column justify-content-between mb-3 shadow"
            style={{
                // height: "200px"
                width: "200px"
            }}
        >
            <div className="p-1">
                <span className="bg bg-danger text-white p-1 rounded">-{discountPercentage}%</span>
            </div>
            <div>
                <img
                    src={thumbnail}
                    className="img-fluid"
                    alt={thumbnail}
                    // style={{
                    //     // height: "200px"
                    //     width: "200px"
                    // }}
                ></img>
            </div>
            <div className="text-center p-2">
                <div className="d-flex justify-content-between">
                    <div>
                        <i className="bi bi-star"></i>
                        <span> {rating}</span>
                    </div>
                    <span>Артикул: {getArtFromId(_id)}</span>
                </div>
                <p className="fw-bold">{title}</p>
                <h3>{price}</h3>
                <div className="d-flex justify-content-between">
                    <button
                        onClick={onAddToCart}
                        type="button"
                        className="w-75 btn btn-danger"
                    >
                        В корзину
                    </button>
                    <h3>
                        <i className="bi bi-heart" role="button"></i>
                    </h3>
                </div>
            </div>
        </div>
    );
};

ProductItem.propTypes = {
    thumbnail: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    discountPercentage: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    onAddToCart: PropTypes.func.isRequired
};

export default ProductItem;
