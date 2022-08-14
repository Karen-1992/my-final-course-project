import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../../ui/cartItem";
import {
    clearCart,
    decrementQuantity,
    getCartList,
    incrementQuantity,
    removeProductFromCart
} from "../../../store/cart";
import { getCurrentUserData, updateUser } from "../../../store/users";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { toggleFavorite } from "../../../store/favorites";
import ClearButton from "../../common/clearButton";
import productService from "../../../services/product.service";
import { getPriceWithDiscount } from "../../../utils/getPriceWithDiscount";
import Loader from "../../common/loader";
import history from "../../../utils/history";

const CartPage = () => {
    const dispatch = useDispatch();
    // const history = useHistory();
    const cartListIds = useSelector(getCartList());
    const userData = useSelector(getCurrentUserData());
    const [cartList, setCartList] = useState();
    const totalPrice = getTotalPrice(cartList);
    useEffect(() => {
        getProducts(cartListIds).then(res => setCartList(res));
    }, [cartListIds]);
    async function getProducts(ids) {
        const result = [];
        if (cartListIds) {
            for (const id of ids) {
                const { productId } = id;
                const { content } = await productService.getOneProduct(productId);
                result.push({ ...content, quantity: id.quantity });
            }
        }
        return result;
    }
    function getTotalPrice(list) {
        if (list) {
            let result = 0;
            for (const product of cartList) {
                const { finalPrice } = getPriceWithDiscount(product.discountPercentage, product.price);
                result += finalPrice * product.quantity;
            }
            return result;
        }
    };
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
        if (userData.cash > totalPrice) {
            const currentCash = userData.cash;
            const cash = currentCash - totalPrice;
            toast.success("Поздравляем с покупкой");
            dispatch(updateUser({ cash }));
            dispatch(clearCart());
        } else {
            toast.error("Недостаточно средств, пополните денежные средства");
        }
    };
    const handleToggleFavorite = (id) => {
        dispatch(toggleFavorite(id));
    };
    const handleOpenProductPage = (productId, category) => {
        history.push(`/products/${productId}`);
    };
    return (
        <div className="container pt-3">
            {cartList ? (
                <>
                    {cartList.length > 0 ? (
                        <div className="row">
                            <div className="col-9">
                                {cartList.map((p) => (
                                    <CartItem
                                        key={p._id}
                                        product={p}
                                        quantity={p.quantity}
                                        onRemove={() => handleRemove(p._id)}
                                        onDecrement={handleDecrement}
                                        onIncrement={handleIncrement}
                                        onToggleFavorite={() => handleToggleFavorite(p._id)}
                                        onOpen={handleOpenProductPage}
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
                        </div>
                    ) : (
                        <>
                            <h2>В корзине еще нет товаров</h2>
                            <div>
                                Выберите нужный Вам товар из
                                <Link to="/products"> каталога интернет-магазина</Link>
                            </div>
                        </>
                    )}
                </>
            ) : (
                <Loader />
            )}
        </div>
    );
};

export default CartPage;
