import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "../../../store/cart";
import { getProductsList } from "../../../store/products";
import ProductItem from "../../ui/productItem";
import { nanoid } from "nanoid";

const ProductsListPage = () => {
    const dispatch = useDispatch();
    const products = useSelector(getProductsList());
    const cropProducts = products.slice(0, 16);
    const handleAddToCart = (id) => {
        const data = {
            _id: nanoid(),
            productId: id,
            quantity: 1
        };
        dispatch(addProductToCart(data));
    };
    return (
        <div className="container">
            <h1>ProductsListPage</h1>
            <div className="d-flex flex-wrap justify-content-evenly p-2">
                {cropProducts.map(product => (
                    <ProductItem
                        {...product}
                        onAddToCart={() => handleAddToCart(product._id)}
                        key={product._id}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductsListPage;
