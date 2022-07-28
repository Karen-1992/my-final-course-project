import { createSlice } from "@reduxjs/toolkit";
import productService from "../services/product.service";

const initialState = {
    entities: null,
    isLoading: true,
    error: null,
    dataLoaded: false
};
const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        productsRequested: (state) => {
            state.isLoading = true;
        },
        productsReceived: (state, action) => {
            state.entities = action.payload;
            state.dataLoaded = true;
            state.isLoading = false;
        },
        productsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: ProductsReducer, actions } = productsSlice;
const {
    productsRequested,
    productsReceived,
    productsRequestFailed
} = actions;

export const loadProductsList = () => async (dispatch) => {
    dispatch(productsRequested());
    try {
        const { content } = await productService.get();
        dispatch(productsReceived(content));
    } catch (error) {
        dispatch(productsRequestFailed(error.message));
    }
};

export const getProductsList = () => (state) => state.products.entities;

export const getProductById = (productId) => (state) => {
    if (state.products.entities) {
        return state.products.entities.find((u) => u._id === productId);
    }
};

export const getDataStatus = () => (state) => state.products.dataLoaded;
export const getProductsLoadingStatus = () => (state) => state.products.isLoading;

export default ProductsReducer;
