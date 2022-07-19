import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productsReducer from "./products";
import usersReducer from "./users";

const rootReducer = combineReducers({
    products: productsReducer,
    users: usersReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
