import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { getProductById } from "../../store/products";
import getArtFromId from "../../utils/getArtFromId";

const CartItem = ({ productId, quantity, onRemove }) => {
    const product = useSelector(getProductById(productId));
    return (
        <div className="border-bottom">
            <div>
                <input type="checkbox" name="" id="" />
            </div>
            <div>
                <img src="" alt="" />
            </div>
            <div>
                <h3>{product.title}</h3>
                <span>В наличии</span>
                <span>Остаток {product.stock}</span>
                <p>Код товара: {getArtFromId(productId)}</p>
            </div>
            <h1>{quantity}</h1>
            <p>{product.brand}</p>
            <button onClick={onRemove}>Удалить</button>
        </div>
    );
};

CartItem.propTypes = {
    productId: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    onRemove: PropTypes.func.isRequired
};

export default CartItem;
