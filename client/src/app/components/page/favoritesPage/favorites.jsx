import React from "react";
import { useDispatch, useSelector } from "react-redux";
import localStorageService from "../../../services/localStorage.service";
import { addProductToCart } from "../../../store/cart";
import { getProductById } from "../../../store/products";
import ProductItem from "../../ui/productItem";

const Favorites = () => {
    const dispatch = useDispatch();
    const favoritesList = localStorageService.getFavorites();
    const handleClear = () => {
        localStorageService.setFavorites();
    };
    const handleAddToCart = (data) => {
        dispatch(addProductToCart(data));
    };
    const handleAddToFavorites = (id) => {
        localStorageService.addFavorites(id);
        // dispatch(addProductToFavorite(data));
    };
    const handleOpenProductPage = (productId) => {
        history.push(`products/${productId}`);
    };
    return (
        <div className="d-flex flex-column px-3">
            <div className="d-flex justify-content-between mb-5">
                <h1>Favorites</h1>
                <button
                    className="btn btn-lg btn-primary"
                    onClick={handleClear}
                >
                    ClearFavorites
                </button>
            </div>
            <div className="d-flex flex-wrap gap-3">
                {favoritesList.map(f => (
                    <ProductItem
                        key={f}
                        {...useSelector(getProductById(f))}
                        onAddToCart={() => handleAddToCart(f)}
                        onAddToFavorites={() => handleAddToFavorites(f)}
                        onOpenProductPage={() => handleOpenProductPage(f)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Favorites;
