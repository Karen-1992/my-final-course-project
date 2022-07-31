import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/ui/cartItem";
import { clearCart, decrementQuantity, getCartList, incrementQuantity, removeProductFromCart } from "../store/cart";

const Cart = () => {
    const dispatch = useDispatch();
    const cartList = useSelector(getCartList());
    const handleRemove = (id) => {
        dispatch(removeProductFromCart(id));
    };
    const handleDecrement = (data) => {
        dispatch(decrementQuantity(data));
    };
    const handleIncrement = (data) => {
        dispatch(incrementQuantity(data));
    };
    const handleClear = () => {
        dispatch(clearCart());
    };
    return (
        <>
            {cartList.length > 0 ? (
                <div className="d-flex flex-column p-3">
                    <div className="d-flex justify-content-end py-2">
                        <button
                            className="btn btn-outline-danger"
                            onClick={handleClear}
                        >
                            Очистить корзину
                            <i className="bi bi-trash-fill p-2"></i>
                        </button>
                    </div>
                    <div className="d-flex flex-column">
                        {cartList.map(p => (
                            <CartItem
                                key={p._id}
                                productId={p.productId}
                                quantity={p.quantity}
                                onRemove={() => handleRemove(p.productId)}
                                onDecrement={handleDecrement}
                                onIncrement={handleIncrement}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <h1>Корзина пуста</h1>
            )}
        </>
    );
};

export default Cart;
