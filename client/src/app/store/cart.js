import { createAction, createSlice } from "@reduxjs/toolkit";
import cartService from "../services/cart.service";
// import productService from "../services/product.service";
// import { getUserId } from "../services/localStorage.service";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        cartRequested: (state) => {
            state.isLoading = true;
        },
        cartReceived: (state, action) => {
            if (action.payload) {
                state.entities = action.payload;
            } else {
                state.entities = [];
            }
            state.isLoading = false;
        },
        cartRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        productAdded: (state, action) => {
            state.entities.push(action.payload);
            // const index = state.entities.findIndex((c) => c.productId === action.payload.productId);
            // if (index === -1) {
            //     state.entities.push(action.payload);
            // } else {
            //     state.entities[index].quantity += 1;
            // }
        },
        productQuantityIncremented: (state, action) => {
            const index = state.entities.findIndex((c) => c.productId === action.payload.productId);
            state.entities[index].quantity += 1;
        },
        productQuantityDecremented: (state, action) => {
            const index = state.entities.findIndex((c) => c.productId === action.payload.productId);
            const prevQuantity = state.entities[index].quantity;
            if (prevQuantity > 1) {
                state.entities[index].quantity -= 1;
            }
        },
        productRemoved: (state, action) => {
            state.entities = state.entities.filter(c => c.productId !== action.payload);
        },
        cartCleared: (state) => {
            state.entities = [];
        }
    }
});

const { reducer: cartReducer, actions } = cartSlice;
const {
    cartRequested,
    cartReceived,
    cartRequestFailed,
    productAdded,
    productRemoved,
    cartCleared,
    productQuantityIncremented
} = actions;

const addProductRequested = createAction("cart/addProductRequested");
const removeProductRequested = createAction("cart/removeProductRequested");
const clearCartRequested = createAction("cart/clearCartRequested");

export const loadCartList = () => async (dispatch) => {
    dispatch(cartRequested());
    try {
        const { content } = await cartService.get();
        dispatch(cartReceived(content));
    } catch (error) {
        dispatch(cartRequestFailed(error.message));
    }
};

export const addProductToCart = (payload) => async (dispatch, getState) => {
    dispatch(addProductRequested());
    try {
        const { entities } = getState().cart;
        const productIndex = entities.findIndex(e => e.productId === payload.productId);
        // const { content2 } = await productService.update({
        //     stock: "dgfnthrg"
        // });
        if (productIndex === -1) {
            const { content } = await cartService.add(payload);
            dispatch(productAdded(content));
        } else {
            const newPayload = {
                ...payload,
                quantity: entities[productIndex].quantity + 1
            };
            const { content } = await cartService.add(newPayload);
            dispatch(productQuantityIncremented(content));
        }
    } catch (error) {
        dispatch(cartRequestFailed(error.message));
    }
};

export const removeProductFromCart = (payload) => async (dispatch) => {
    dispatch(removeProductRequested());
    try {
        const { content } = await cartService.remove(payload);
        if (content === null) {
            return dispatch(productRemoved(payload));
        }
        dispatch(productRemoved({ content, payload }));
    } catch (error) {
        dispatch(cartRequestFailed(error.message));
    }
};
export const clearCart = () => async (dispatch) => {
    dispatch(clearCartRequested());
    try {
        await cartService.clear();
        dispatch(cartCleared());
    } catch (error) {
        dispatch(cartRequestFailed(error.message));
    }
};
export const getCartQuantity = () => (state) => state.cart.entities.length;
export const getCartList = () => (state) => state.cart.entities;
export const getCartLoadingStatus = () => (state) =>
    state.cart.isLoading;
export const getCartById = (id) => (state) => {
    if (state.cart.entities) {
        return state.cart.entities.find((p) => p._id === id);
    }
};

export default cartReducer;
