import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import getArtFromId from "../../utils/getArtFromId";
import Counter from "../common/counter";
import { getPriceWithDiscount } from "../../utils/getPriceWithDiscount";
import { getIsFavorite } from "../../store/favorites";
import ImageComponent from "../common/imageComponent";

const CartItem = ({
    product,
    quantity,
    onRemove,
    onDecrement,
    onIncrement,
    onOpen,
    onToggleFavorite
}) => {
    const isFavorite = useSelector(getIsFavorite(product._id));
    const data = {
        productId: product._id,
        quantity,
        ...product
    };
    const handleDecrement = () => {
        onDecrement(data);
    };
    const handleIncrement = () => {
        onIncrement(data);
    };
    const { finalPrice } = getPriceWithDiscount(product.discountPercentage, product.price);
    return (
        <div className="row flex-nowrap border-bottom border-2 mb-4">
            <div
                className="col-3 d-block"
            >
                <ImageComponent
                    src={product.thumbnail}
                    height="200px"
                    onClick={() => onOpen(product._id)}
                />
            </div>
            <div className="col-4 align-self-center">
                <h5
                    onClick={() => onOpen(product._id)}
                    role="button"
                >
                    {product.title}
                </h5>
                <p>Остаток: {product.stock}</p>
                <p>Код товара: {getArtFromId(product._id)}</p>
            </div>
            <div className="col-4 align-self-center fw-light">
                <Counter
                    quantity={quantity}
                    onDecrement={handleDecrement}
                    onIncrement={handleIncrement}
                />
                <div className="d-flex justify-content-center gap-2">
                    <span
                        onClick={onRemove}
                        role="button"
                    >
                        Удалить
                    </span>
                    {!isFavorite && (
                        <>
                            <span>|</span>
                            <span
                                onClick={onToggleFavorite}
                                role="button"
                            >
                                В избранное
                            </span>
                        </>
                    )}
                </div>
            </div>
            <div className="col-1 align-self-center fw-semibold fs-5">
                <p>{finalPrice * quantity}$</p>
            </div>
        </div>
    );
};

CartItem.propTypes = {
    product: PropTypes.object.isRequired,
    quantity: PropTypes.number.isRequired,
    onRemove: PropTypes.func,
    onIncrement: PropTypes.func,
    onDecrement: PropTypes.func,
    onToggleFavorite: PropTypes.func,
    onOpen: PropTypes.func
};

export default CartItem;
