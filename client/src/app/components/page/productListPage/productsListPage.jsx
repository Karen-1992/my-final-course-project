import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "../../../store/cart";
import { addProductToFavorite } from "../../../store/favorites";
import { getProductsList } from "../../../store/products";
import history from "../../../utils/history";
import ProductItem from "../../ui/productItem";

const ProductsListPage = () => {
    const dispatch = useDispatch();
    const products = useSelector(getProductsList());
    const cropProducts = products.slice(0, 16);
    const handleAddToCart = (data) => {
        dispatch(addProductToCart(data));
    };
    const handleAddToFavorites = (data) => {
        dispatch(addProductToFavorite(data));
    };
    const handleOpenProductPage = (productId) => {
        history.push(`products/${productId}`);
    };
    return (
        <div>
            <h1>ProductsListPage</h1>
            <div className="d-flex flex-wrap justify-content-evenly p-2">
                {cropProducts.map(product => (
                    <ProductItem
                        {...product}
                        onAddToCart={() => handleAddToCart(product)}
                        onAddToFavorites={() => handleAddToFavorites(product)}
                        key={product._id}
                        onOpenProductPage={() => handleOpenProductPage(product._id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductsListPage;
