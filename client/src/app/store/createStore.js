import { combineReducers, configureStore } from "@reduxjs/toolkit";
import usersReducer from "./users";
import categoriesReducer from "./categories";
import productsReducer from "./products";
import galleryReducer from "./gallery";

const rootReducer = combineReducers({
    users: usersReducer,
    categories: categoriesReducer,
    gallery: galleryReducer,
    products: productsReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
