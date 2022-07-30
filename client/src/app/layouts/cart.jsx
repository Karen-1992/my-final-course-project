import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/ui/cartItem";
import { getCartList, removeProductFromCart } from "../store/cart";

const Cart = () => {
    const dispatch = useDispatch();
    const cartList = useSelector(getCartList());
    const handleRemove = (id) => {
        console.log(id);
        dispatch(removeProductFromCart(id));
    };
    return (
        <div className="d-flex flex-column p-3">
            <div className="d-flex justify-content-between p-3">
                <div>
                    <input type="checkbox" name="selectAll" id="all" />
                    <label
                        htmlFor="all"
                        className="px-2"
                    >
                        Выбрать все
                    </label>
                </div>
                <div>
                    <span>Удалить выбранное</span>
                </div>
            </div>
            <div className="d-flex flex-column">
                {cartList.map(p => (
                    <CartItem
                        key={p._id}
                        productId={p.productId}
                        quantity={p.quantity}
                        onRemove={() => handleRemove(p.productId)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Cart;
