import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProductToCart } from "../../../store/cart";
import { clearFavorite, getFavoriteList, getFavoriteLoadingStatus, toggleFavorite } from "../../../store/favorites";
import { getProductsByIds } from "../../../store/products";
import history from "../../../utils/history";
import ProductItem from "../../ui/productItem";

const FavoritesPage = () => {
    const isFavoLoading = useSelector(getFavoriteLoadingStatus());
    const dispatch = useDispatch();
    const favoritesIds = useSelector(getFavoriteList());
    const favoritesList = useSelector(getProductsByIds(favoritesIds));
    const handleClear = () => {
        dispatch(clearFavorite());
    };
    const handleAddToCart = (data) => {
        dispatch(addProductToCart(data));
    };
    const handleToggleFavorite = (id) => {
        dispatch(toggleFavorite(id));
    };
    const handleOpenProductPage = (productId) => {
        history.push(`/products/${productId}`);
    };
    if (!isFavoLoading) {
        return (
            <div className="d-flex flex-column px-3">
                <div className="d-flex justify-content-between mb-5">
                    <h1>FavoritesPage</h1>
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
                            onToggleFavorite={() => handleToggleFavorite(favProduct._id)}
                            onOpenProductPage={() => handleOpenProductPage(favProduct._id)}
                        />
                    ))}
                </div>
            </div>
        );
    } else {
        return "LOading...";
    }
};

export default FavoritesPage;
