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
        favoritesRequested: (state) => {
            state.isLoading = true;
        },
        favoritesReceived: (state, action) => {
            if (action.payload) {
                state.entities = action.payload;
            } else {
                state.entities = [];
            }
            state.isLoading = false;
        },
        favoritesRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        favoriteAdded: (state, action) => {
            state.entities.push(action.payload);
        },
        favoriteRemoved: (state, action) => {
            state.entities = state.entities.filter(c => c.productId !== action.payload);
        },
        favoritesCleared: (state) => {
            state.entities = [];
        }
    }
});

const { reducer: favoriteReducer, actions } = favoriteSlice;
const {
    favoritesRequested,
    favoritesReceived,
    favoritesRequestFailed,
    favoriteAdded,
    favoriteRemoved,
    favoritesCleared
} = actions;

const addFavoriteRequested = createAction("favorite/addFavoriteRequested");
const removeFavoriteRequested = createAction("favorite/removeFavoriteRequested");
const clearFavoriteRequested = createAction("favorite/clearfavoriteRequested");

export const loadFavoritetList = () => async (dispatch) => {
    dispatch(favoritesRequested());
    try {
        const { content } = await favoriteService.get();
        dispatch(favoritesReceived(content));
    } catch (error) {
        dispatch(favoritesRequestFailed(error.message));
    }
};

export const addProductToFavorite = ({ _id }) => async (dispatch, getState) => {
    if (localStorageService.getUserId() === null) {
        return history.push("/login");
    }
    dispatch(addFavoriteRequested());
    const data = {
        productId: _id
    };
    try {
        const { entities } = getState().favorites;
        const productIndex = entities.findIndex(e => e.productId === data.productId);
        if (productIndex === -1) {
            const { content } = await favoriteService.add(data);
            dispatch(favoriteAdded(content));
        }
    } catch (error) {
        dispatch(favoritesRequestFailed(error.message));
    }
};

export const removeProductFromFavorite = (payload) => async (dispatch) => {
    dispatch(removeFavoriteRequested());
    try {
        const { content } = await favoriteService.remove(payload);
        if (content === null) {
            return dispatch(favoriteRemoved(payload));
        }
        dispatch(favoriteRemoved({ content, payload }));
    } catch (error) {
        dispatch(favoritesRequestFailed(error.message));
    }
};

export const clearFavorite = () => async (dispatch) => {
    dispatch(clearFavoriteRequested());
    try {
        await favoriteService.clear();
        dispatch(favoritesCleared());
    } catch (error) {
        dispatch(favoritesRequestFailed(error.message));
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
