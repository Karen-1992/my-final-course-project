import React from "react";
import PropTypes from "prop-types";
import ProductItemLine from "./productItemLine";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../../store/cart";
import { toggleFavorite } from "../../store/favorites";
import history from "../../utils/history";

const SearchOverlay = ({ items, isSearching, clearSearchQuery }) => {
    const dispatch = useDispatch();
    const handleAddToCart = (data) => {
        dispatch(addProductToCart(data));
    };
    const handleToggleFavorite = (id) => {
        dispatch(toggleFavorite(id));
    };
    const handleOpenProductPage = (productId) => {
        clearSearchQuery();
        history.push(`products/${productId}`);
    };
    return (
        <div
            className="w-75 d-flex flex-column mx-auto shadow px-2 pt-2 gap-3"
        >
            {isSearching ? (
                <>
                    {items ? items.map(item => (
                        <ProductItemLine
                            key={item._id}
                            {...item}
                            onAddToCart={() => handleAddToCart(item)}
                            onToggleFavorite={() =>
                                handleToggleFavorite(item._id)
                            }
                            onOpenProductPage={() =>
                                handleOpenProductPage(item._id)
                            }
                        />
                    )) : (
                        <p>Ничего не найдено</p>
                    )}
                </>
            ) : (
                "Loading..."
            )}
        </div>
    );
};

SearchOverlay.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    isSearching: PropTypes.bool,
    clearSearchQuery: PropTypes.func
};

export default SearchOverlay;
