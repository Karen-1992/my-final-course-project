import { combineReducers, configureStore } from "@reduxjs/toolkit";
import usersReducer from "./users";
import categoriesReducer from "./categories";
import productsReducer from "./products";
import cartReducer from "./cart";
import favoriteReducer from "./favorites";
import commentsReducer from "./comments";

const rootReducer = combineReducers({
    users: usersReducer,
    categories: categoriesReducer,
    products: productsReducer,
    cart: cartReducer,
    favorites: favoriteReducer,
    comments: commentsReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
