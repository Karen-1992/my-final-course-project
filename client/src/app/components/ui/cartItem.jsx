import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { getProductById } from "../../store/products";
import getArtFromId from "../../utils/getArtFromId";
import Counter from "../common/counter";
import productService from "../../services/product.service";
import { getPriceWithDiscount } from "../../utils/getPriceWithDiscount";

const CartItem = ({
    productId,
    quantity,
    onRemove,
    onDecrement,
    onIncrement
}) => {
    const product = useSelector(getProductById(productId));
    async function getOneProduct(id) {
        const { content } = await productService.getOneProduct(id);
        return content;
    }
    getOneProduct(productId);
    const data = {
        productId,
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
        <div className="d-flex justify-content-between border-bottom">
            <div
                style={{
                    width: "150px"
                }}
            >
                <img
                    className="img-fluid"
                    src={product.thumbnail}
                    alt={product.thumbnail}
                />
            </div>
            <div>
                <h4>{product.title}</h4>
                <p>В наличии</p>
                <p>Остаток {product.stock}</p>
                <p>Код товара: {getArtFromId(productId)}</p>
            </div>
            <div>
                <Counter
                    quantity={quantity}
                    onDecrement={handleDecrement}
                    onIncrement={handleIncrement}
                />
                <p>{finalPrice * quantity}$</p>
            </div>
            <div>
                <button className="btn btn-danger" onClick={onRemove}>
                    Удалить
                </button>
            </div>
        </div>
    );
};

CartItem.propTypes = {
    productId: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    onRemove: PropTypes.func,
    onIncrement: PropTypes.func,
    onDecrement: PropTypes.func
};

export default CartItem;
