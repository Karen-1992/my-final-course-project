import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProductToCart } from "../../../store/cart";
import { clearFavorite, getFavoriteList, toggleFavorite } from "../../../store/favorites";
import { getProductById } from "../../../store/products";
import history from "../../../utils/history";
import ProductItem from "../../ui/productItem";

const Favorites = () => {
    const dispatch = useDispatch();
    const favoritesIds = useSelector(getFavoriteList());
    function transformData(idsArray) {
        const result = [];
        for (const item of idsArray) {
            const product = useSelector(getProductById(item.productId));
            result.push(product);
        }
        return result;
    }
    const favoritesList = transformData(favoritesIds);
    const handleClear = () => {
        dispatch(clearFavorite());
    };
    const handleAddToCart = (data) => {
        dispatch(addProductToCart(data));
    };
    const handleAddToFavorites = (id) => {
        dispatch(toggleFavorite(id));
    };
    const handleOpenProductPage = (productId) => {
        history.push(`/products/${productId}`);
    };
    console.log(favoritesList);
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
                {favoritesList.map((favProduct) => (
                    <ProductItem
                        key={favProduct._id}
                        {...favProduct}
                        onAddToCart={() => handleAddToCart(favProduct)}
                        onAddToFavorites={() => handleAddToFavorites(favProduct._id)}
                        onOpenProductPage={() => handleOpenProductPage(favProduct._id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Favorites;
