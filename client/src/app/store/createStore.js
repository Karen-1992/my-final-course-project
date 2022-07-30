import { combineReducers, configureStore } from "@reduxjs/toolkit";
import usersReducer from "./users";
import categoriesReducer from "./categories";
import productsReducer from "./products";
import galleryReducer from "./gallery";
import cartReducer from "./cart";

const rootReducer = combineReducers({
    users: usersReducer,
    categories: categoriesReducer,
    gallery: galleryReducer,
    products: productsReducer,
    cart: cartReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
