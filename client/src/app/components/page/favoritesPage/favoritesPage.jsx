import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import productService from "../../../services/product.service";
import { addProductToCart } from "../../../store/cart";
import { clearFavorite, getFavoriteList, toggleFavorite } from "../../../store/favorites";
import history from "../../../utils/history";
import ClearButton from "../../common/clearButton";
import Loader from "../../common/loader";
import ProductItem from "../../ui/productItem";

const FavoritesPage = () => {
    const dispatch = useDispatch();
    const favoritesIds = useSelector(getFavoriteList());
    const [favoritesList, setFavoritesList] = useState();
    useEffect(() => {
        getProducts(favoritesIds).then(res => setFavoritesList(res));
    }, [favoritesIds]);
    async function getProducts(ids) {
        const result = [];
        if (ids) {
            for (const id of ids) {
                const { productId } = id;
                const { content } = await productService.getOneProduct(productId);
                result.push(content);
            }
        }
        return result;
    }
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
            {favoritesIds.length > 0 ? (
                <>
                    {favoritesList ? (
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
                                            onOpenProductPage={handleOpenProductPage}
                                        />
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <Loader />
                    )}
                </>
            ) : (
                <div>
                    <p>У нас столько замечательных товаров,
                    а в Избранном у Вас – пусто</p>
                    <Link to="/products">Перейти в каталог</Link>
                </div>
            )}
        </div>
    );
};

export default FavoritesPage;
