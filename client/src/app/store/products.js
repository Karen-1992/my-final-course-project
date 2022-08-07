import { createAction, createSlice } from "@reduxjs/toolkit";
import productService from "../services/product.service";
import { getPriceWithDiscount } from "../utils/getPriceWithDiscount";

const initialState = {
    entities: null,
    currentProduct: null,
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
        },
        productCreated: (state, action) => {
            state.entities.push(action.payload);
        },
        productRemoved: (state, action) => {
            state.entities = state.entities.filter(
                (c) => c._id !== action.payload
            );
        },
        productUpdateSuccessed: (state, action) => {
            state.entities[
                state.entities.findIndex((p) => p._id === action.payload._id)
            ] = action.payload;
        },
        oneProductGot: (state, action) => {
            state.currentProduct = action.payload;
        }
    }
});

const { reducer: ProductsReducer, actions } = productsSlice;
const {
    productsRequested,
    productsReceived,
    productsRequestFailed,
    productRemoved,
    productUpdateSuccessed,
    productCreated
} = actions;

const productRemoveRequested = createAction("products/productRemoveRequested");
const removeProductFailed = createAction("products/removeProductFailed");
const productCreateRequested = createAction("products/productCreateRequested");
const productCreateFailed = createAction("products/productCreateFailed");
const productUpdateRequested = createAction("products/productUpdateRequested");
const productUpdateFailed = createAction("products/productUpdateFailed");

export const loadProductsList = () => async (dispatch) => {
    dispatch(productsRequested());
    try {
        const { content } = await productService.get();
        dispatch(productsReceived(content));
    } catch (error) {
        dispatch(productsRequestFailed(error.message));
    }
};

export const removeProduct = (payload) => async (dispatch) => {
    dispatch(productRemoveRequested());
    try {
        const { content } = await productService.remove(payload);
        if (!content) {
            return dispatch(productRemoved(payload));
        }
        dispatch(productRemoved({ content, payload }));
    } catch (error) {
        dispatch(removeProductFailed(error.message));
    }
};

export const updateProduct = (payload) => async (dispatch) => {
    dispatch(productUpdateRequested());
    try {
        const { content } = await productService.update(payload);
        dispatch(productUpdateSuccessed(content));
    } catch (error) {
        dispatch(productCreateFailed(error.message));
    }
};

export const createProduct = (payload) => async (dispatch) => {
    dispatch(productCreateRequested());
    try {
        const { content } = await productService.create(payload);
        dispatch(productCreated(content));
    } catch (error) {
        dispatch(productUpdateFailed(error.message));
    }
};

// export const getProductFromServer = (payload) => async (dispatch) => {
//     try {
//         dispatch(productsRequested);
//         console.log(payload);
//         const { content } = await productService.getOneProduct(payload);
//         console.log(content);
//     } catch (error) {
//         console.log(error);
//         dispatch(productsRequestFailed);
//     }
// };

export const getProductsList = () => (state) => state.products.entities;

export const getProductById = (productId) => (state) => {
    if (state.products.entities) {
        return state.products.entities.find((p) => p._id === productId);
    }
};

export const getDataStatus = () => (state) => state.products.dataLoaded;
export const getProductsLoadingStatus = () => (state) => state.products.isLoading;

export const getProductsByIds = (idsArr) => (state) => {
    const result = [];
    if (idsArr) {
        for (const idsItem of idsArr) {
            for (const product of state.products.entities) {
                if (idsItem.productId === product._id) {
                    result.push(product);
                }
            }
        }
    }
    return result;
};
export const getTotalPrice = (idsArr) => (state) => {
    let result = 0;
    if (idsArr) {
        for (const item of idsArr) {
            for (const product of state.products.entities) {
                if (item.productId === product._id) {
                    const { finalPrice } = getPriceWithDiscount(product.discountPercentage, product.price);
                    result += finalPrice * item.quantity;
                }
            }
        }
    }
    return result;
};

export default ProductsReducer;
