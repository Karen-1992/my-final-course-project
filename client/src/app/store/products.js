import { createSlice } from "@reduxjs/toolkit";
import productsService from "../services/products.service";

const productsSlice = createSlice({
    name: "products",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        dataLoaded: false
    },
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

const { reducer: productsReducer, actions } = productsSlice;
const { productsRequested, productsReceived, productsRequestFailed } =
    actions;

export const loadProductsList = () => async (dispatch) => {
    dispatch(productsRequested());
    try {
        const { content } = await productsService.get();
        dispatch(productsReceived(content));
    } catch (error) {
        dispatch(productsRequestFailed(error.message));
    }
};

export const getProducts = () => (state) => state.products.entities;
export const getDataStatus = () => (state) => state.products.dataLoaded;
export const getProductsLoadingStatus = () => (state) =>
    state.products.isLoading;
// export const getProductsById = (id) => (state) => {
//     if (state.products.entities) {
//         return state.products.entities.find((p) => p._id === id);
//     }
// };

export default productsReducer;
