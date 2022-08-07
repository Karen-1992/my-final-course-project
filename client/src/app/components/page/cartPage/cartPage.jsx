import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../../ui/cartItem";
import {
    clearCart,
    decrementQuantity,
    getCartList,
    getCartLoadingStatus,
    incrementQuantity,
    removeProductFromCart
} from "../../../store/cart";
import { getTotalPrice } from "../../../store/products";
import { updateUserCash } from "../../../store/users";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { toggleFavorite } from "../../../store/favorites";
import history from "../../../utils/history";
import ClearButton from "../../common/clearButton";
import { useLoading } from "../../../hooks/useLoading";
import Loader from "../../common/loader";

const CartPage = () => {
    const { clientX, clientY } = useLoading();
    const dispatch = useDispatch();
    const cartList = useSelector(getCartList());
    const cartLoading = useSelector(getCartLoadingStatus());
    const totalPrice = useSelector(getTotalPrice(cartList));
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
    function getTotalQuantity() {
        let quantity = 0;
        if (cartList) {
            for (const item of cartList) {
                quantity += item.quantity;
            }
        }
        return quantity;
    }
    const totalQuantity = getTotalQuantity();
    const handleFinishShopping = () => {
        dispatch(updateUserCash(totalPrice));
        toast.success("Поздравляем с покупкой");
        dispatch(clearCart());
    };
    const handleToggleFavorite = (id) => {
        dispatch(toggleFavorite(id));
    };
    const handleOpenProductPage = (id) => {
        history.push(`/products/${id}`);
    };
    return (
        <div className="container pt-3">
            {!cartLoading ? (
                <div className="row">
                    {cartList.length > 0 ? (
                        <>
                            <div className="col-9">
                                {cartList.map((p) => (
                                    <CartItem
                                        key={p._id}
                                        productId={p.productId}
                                        quantity={p.quantity}
                                        onRemove={() => handleRemove(p.productId)}
                                        onDecrement={handleDecrement}
                                        onIncrement={handleIncrement}
                                        onToggleFavorite={() => handleToggleFavorite(p.productId)}
                                        onOpen={() => handleOpenProductPage(p.productId)}
                                    />
                                ))}
                            </div>
                            <div className="col-3">
                                <div className="d-flex justify-content-center">
                                    <ClearButton
                                        onClick={handleClear}
                                        classes="fw-light mb-2"
                                        label="Очистить корзину"
                                    />
                                </div>
                                <div className="shadow-sm p-3 mb-5 bg-body rounded">
                                    <h3>Ваш заказ</h3>
                                    <p>
                                        Количество товаров:
                                        <span className="fw-semibold fs-4"> {totalQuantity}</span>
                                    </p>
                                    <p>
                                        Итого к оплате:
                                        <span className="fw-semibold fs-4"> {totalPrice}$</span>
                                    </p>
                                    <button
                                        onClick={handleFinishShopping}
                                        className="w-100 btn btn-success"
                                    >
                                        Купить
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <h2>В корзине еще нет товаров</h2>
                            <div>
                                Выберите нужный Вам товар из
                                <Link to="/products"> каталога интернет-магазина</Link>
                            </div>
                        </>
                    )}
                </div>
            ) : (
                <Loader
                    clientX={clientX}
                    clientY={clientY}
                />
            )}
        </div>
    );
};

export default CartPage;
