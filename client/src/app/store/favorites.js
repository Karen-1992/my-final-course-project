import { createAction, createSlice } from "@reduxjs/toolkit";
import favoriteService from "../services/favorite.service";
import history from "../utils/history";
import localStorageService from "../services/localStorage.service";

const favoriteSlice = createSlice({
    name: "favorites",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        favoriteRequested: (state) => {
            state.isLoading = true;
        },
        favoriteReceived: (state, action) => {
            if (action.payload) {
                state.entities = action.payload;
            } else {
                state.entities = [];
            }
            state.isLoading = false;
        },
        favoriteRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        productAdded: (state, action) => {
            state.entities.push(action.payload);
        },
        productRemoved: (state, action) => {
            state.entities = state.entities.filter(c => c.productId !== action.payload);
        },
        favoriteCleared: (state) => {
            state.entities = [];
        }
    }
});

const { reducer: favoriteReducer, actions } = favoriteSlice;
const {
    favoriteRequested,
    favoriteReceived,
    favoriteRequestFailed,
    productAdded,
    productRemoved,
    favoriteCleared
} = actions;

const addProductRequested = createAction("favorite/addProductRequested");
const removeProductRequested = createAction("favorite/removeProductRequested");
const clearFavoriteRequested = createAction("favorite/clearfavoriteRequested");

export const loadFavoritetList = () => async (dispatch) => {
    dispatch(favoriteRequested());
    try {
        const { content } = await favoriteService.get();
        dispatch(favoriteReceived(content));
    } catch (error) {
        dispatch(favoriteRequestFailed(error.message));
    }
};

export const addProductToFavorite = ({ _id }) => async (dispatch, getState) => {
    if (localStorageService.getUserId() === null) {
        return history.push("/login");
    }
    dispatch(addProductRequested());
    const data = {
        productId: _id
    };
    try {
        const { entities } = getState().favorites;
        const productIndex = entities.findIndex(e => e.productId === data.productId);
        if (productIndex === -1) {
            const { content } = await favoriteService.add(data);
            dispatch(productAdded(content));
        }
    } catch (error) {
        dispatch(favoriteRequestFailed(error.message));
    }
};

export const removeProductFromFavorite = (payload) => async (dispatch) => {
    dispatch(removeProductRequested());
    try {
        const { content } = await favoriteService.remove(payload);
        if (content === null) {
            return dispatch(productRemoved(payload));
        }
        dispatch(productRemoved({ content, payload }));
    } catch (error) {
        dispatch(favoriteRequestFailed(error.message));
    }
};

export const clearFavorite = () => async (dispatch) => {
    dispatch(clearFavoriteRequested());
    try {
        await favoriteService.clear();
        dispatch(favoriteCleared());
    } catch (error) {
        dispatch(favoriteRequestFailed(error.message));
    }
};
export const getFavoriteQuantity = () => (state) => {
    if (state.favorites.entities) {
        return state.favorites.entities.length;
    }
    return 0;
};
export const getFavoriteList = () => (state) => state.favorites.entities;
export const getFavoriteLoadingStatus = () => (state) =>
    state.favorites.isLoading;
export const getFavoriteProductById = (id) => (state) => {
    if (state.favorites.entities) {
        return state.favorites.entities.find((p) => p.productId === id);
    }
};

export default favoriteReducer;
