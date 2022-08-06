import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addProductToCart } from "../../../store/cart";
import { clearFavorite, getFavoriteList, getFavoriteLoadingStatus, toggleFavorite } from "../../../store/favorites";
import { getProductsByIds } from "../../../store/products";
import history from "../../../utils/history";
import ClearButton from "../../common/clearButton";
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
    return (
        <div className="d-flex flex-column px-3">
            {!isFavoLoading ? (
                <>
                    {favoritesList.length > 0 ? (
                        <>
                            <div className="d-flex justify-content-end mb-2">
                                <ClearButton
                                    onClick={handleClear}
                                    classes="fw-light mb-2"
                                    label="Очистить"
                                />
                            </div>
                            <div className="row row-cols-1 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-sm-1 g-lg-4">
                                {favoritesList.map((favProduct) => (
                                    <div key={favProduct._id}>
                                        <ProductItem
                                            {...favProduct}
                                            onAddToCart={() => handleAddToCart(favProduct)}
                                            onToggleFavorite={() => handleToggleFavorite(favProduct._id)}
                                            onOpenProductPage={() => handleOpenProductPage(favProduct._id)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div>
                            <p>У нас столько замечательных товаров,
                            а в Избранном у Вас – пусто</p>
                            <Link to="/products">Перейти в каталог</Link>
                        </div>
                    )}
                </>
            ) : (
                "Loading..."
            )}
        </div>
    );
};

export default FavoritesPage;
