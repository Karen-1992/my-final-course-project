import React from "react";
import PropTypes from "prop-types";
import ImageComponent from "../common/imageComponent";
import { useSelector } from "react-redux";
import { getCartProductById } from "../../store/cart";
import { getIsFavorite } from "../../store/favorites";
import { getPriceWithDiscount } from "../../utils/getPriceWithDiscount";
import ProductButtons from "../common/productButtons";
import getArtFromId from "../../utils/getArtFromId";

const ProductItemLine = ({
    thumbnail,
    rating,
    _id,
    title,
    price,
    stock,
    discountPercentage,
    onAddToCart,
    onOpenProductPage,
    onToggleFavorite
}) => {
    const isInCart = !!useSelector(getCartProductById(_id));
    const isFavorite = useSelector(getIsFavorite(_id));
    const { discountValue, finalPrice } = getPriceWithDiscount(discountPercentage, price);
    return (
        <div key={_id} className="row border-bottom">
            <div role="button" onClick={onOpenProductPage} className="col">
                <ImageComponent
                    src={thumbnail}
                    height="75px"
                />
            </div>
            <div className="col">
                {discountPercentage > 0 && (
                    <span className="bg bg-danger text-white px-2 rounded">
                        {`-${discountPercentage}%`}
                    </span>
                )}
                <p
                    className="fw-semibold pt-2"
                    onClick={onOpenProductPage}
                    role="button"
                >
                    {title}
                </p>
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
            </div>
            <div className="col">
                <div className="d-flex justify-content-between">
                    <div>
                        <i className="bi bi-star"></i>
                        <span className="fw-light"> {rating}</span>
                    </div>
                    <span className="fw-light">Код: {getArtFromId(_id)}</span>
                </div>
                {discountPercentage > 0 ? (
                    <div className="d-flex gap-2 justify-content-center">
                        <span className="fw-semibold">{`${finalPrice}$`}</span>
                        <span className="text-decoration-line-through">{`${price}$`}</span>
                        <span className="fw-semibold text-danger">{`-${discountValue}$`}</span>
                    </div>
                ) : (
                    <span className="fw-bold">{`${price}$`}</span>
                )}
                <div className="d-flex justify-content-between py-2">
                    <ProductButtons
                        isInCart={isInCart}
                        isFavorite={isFavorite}
                        onAddToCart={onAddToCart}
                        onToggleFavorite={onToggleFavorite}
                    />
                </div>
            </div>
        </div>
    );
};

ProductItemLine.propTypes = {
    thumbnail: PropTypes.string,
    rating: PropTypes.number,
    _id: PropTypes.string,
    title: PropTypes.string,
    stock: PropTypes.number,
    discountPercentage: PropTypes.number,
    price: PropTypes.number,
    onAddToCart: PropTypes.func,
    onOpenProductPage: PropTypes.func,
    onToggleFavorite: PropTypes.func
};

export default ProductItemLine;
