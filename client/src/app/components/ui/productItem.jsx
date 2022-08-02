import React from "react";
import PropTypes from "prop-types";
import getArtFromId from "../../utils/getArtFromId";
import { useSelector, useDispatch } from "react-redux";
import { getCartProductById } from "../../store/cart";
import { getFavoriteProductById, removeProductFromFavorite } from "../../store/favorites";

const ProductItem = ({
    thumbnail, rating,
    _id,
    title,
    price,
    discountPercentage,
    onAddToCart,
    onOpenProductPage,
    onAddToFavorites
}) => {
    const dispatch = useDispatch();
    const inCart = useSelector(getCartProductById(_id));
    const isFavorite = useSelector(getFavoriteProductById(_id));
    const toggleFavorite = () => {
        if (!isFavorite) {
            onAddToFavorites();
        } else {
            dispatch(removeProductFromFavorite(_id));
        }
    };
    return (
        <div
            className="d-flex flex-column justify-content-between mb-3 shadow"
            style={{
                width: "200px"
            }}
        >
            <div className="p-1">
                {discountPercentage > 0 && (
                    <span className="bg bg-danger text-white p-1 rounded">
                        {`-${discountPercentage}%`}
                    </span>
                )}
            </div>
            <div onClick={onOpenProductPage} role="button">
                <img
                    src={thumbnail}
                    className="img-fluid"
                    alt={thumbnail}
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
                <p className="fw-bold" onClick={onOpenProductPage} role="button">{title}</p>
                <h3>{`${price}$`}</h3>
                <div className="d-flex justify-content-between">
                    <button
                        onClick={onAddToCart}
                        type="button"
                        className={"w-75 btn btn-" + (inCart ? "outline-danger" : "danger")}
                    >
                        {!inCart ? (
                            "В корзину"
                        ) : (
                            "В корзине"
                        )}
                    </button>
                    <h3 onClick={toggleFavorite}>
                        <i className={"bi bi-heart" + (isFavorite ? "-fill" : "")} role="button"></i>
                    </h3>
                </div>
            </div>
        </div>
    );
};

ProductItem.propTypes = {
    thumbnail: PropTypes.string,
    rating: PropTypes.number,
    _id: PropTypes.string,
    title: PropTypes.string,
    discountPercentage: PropTypes.number,
    price: PropTypes.number,
    onAddToCart: PropTypes.func,
    onOpenProductPage: PropTypes.func,
    onAddToFavorites: PropTypes.func
};

export default ProductItem;
