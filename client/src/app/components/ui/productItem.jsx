import React from "react";
import PropTypes from "prop-types";
import getArtFromId from "../../utils/getArtFromId";
import { useSelector } from "react-redux";
import { getCartProductById } from "../../store/cart";
import {
    getIsFavorite
} from "../../store/favorites";
import { getPriceWithDiscount } from "../../utils/getPriceWithDiscount";

const ProductItem = ({
    thumbnail,
    rating,
    _id,
    title,
    price,
    stock,
    discountPercentage,
    onAddToCart,
    onOpenProductPage,
    onAddToFavorites
}) => {
    const inCart = useSelector(getCartProductById(_id));
    const isFavorite = useSelector(getIsFavorite(_id));
    const { discountValue, finalPrice } = getPriceWithDiscount(discountPercentage, price);
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
            <div className="d-flex">
                <div
                    style={{
                        height: "10px",
                        width: "10px"
                    }}
                    className={"bg rounded-5 d-block my-auto mx-1 bg-" + (stock > 0 ? "success" : "danger")}
                >
                </div>
                <span>{stock > 0 ? "В наличии" : "Нет в наличии"}</span>
            </div>
            <div className="text-center p-2">
                <div className="d-flex justify-content-between">
                    <div>
                        <i className="bi bi-star"></i>
                        <span> {rating}</span>
                    </div>
                    <span>Артикул: {getArtFromId(_id)}</span>
                </div>
                <p
                    className="fw-bold"
                    onClick={onOpenProductPage}
                    role="button"
                >
                    {title}
                </p>
                <div className="d-flex gap-2 justify-content-center">
                    <span className="fw-bold">{`${finalPrice}$`}</span>
                    <span className="text-decoration-line-through">{`${price}$`}</span>
                    <span className="fw-bold text-danger">{`-${discountValue}$`}</span>
                </div>
                <div className="d-flex justify-content-between">
                    <button
                        onClick={onAddToCart}
                        type="button"
                        className={
                            "w-75 btn btn-" +
                            (inCart ? "outline-danger" : "danger")
                        }
                    >
                        {!inCart ? "В корзину" : "В корзине"}
                    </button>
                    <h3 onClick={onAddToFavorites}>
                        <i
                            className={
                                "bi bi-heart" + (isFavorite ? "-fill" : "")
                            }
                            role="button"
                        ></i>
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
    stock: PropTypes.number,
    discountPercentage: PropTypes.number,
    price: PropTypes.number,
    onAddToCart: PropTypes.func,
    onOpenProductPage: PropTypes.func,
    onAddToFavorites: PropTypes.func
};

export default ProductItem;
