import { createSlice } from "@reduxjs/toolkit";
import galleryService from "../services/gallery.service";
import isOutDated from "../utils/isOutDated";

const gallerySlice = createSlice({
    name: "gallery",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        galleryRequested: (state) => {
            state.isLoading = true;
        },
        galleryReceived: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        galleryRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: galleryReducer, actions } = gallerySlice;
const { galleryRequested, galleryReceived, galleryRequestFailed } =
    actions;

export const loadGalleryList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().gallery;
    if (isOutDated(lastFetch)) {
        dispatch(galleryRequested());
        try {
            const { content } = await galleryService.get();
            dispatch(galleryReceived(content));
        } catch (error) {
            dispatch(galleryRequestFailed(error.message));
        }
    }
};

export const getGallery = () => (state) => state.gallery.entities;
export const getGalleryLoadingStatus = () => (state) =>
    state.gallery.isLoading;
export const getGalleryById = (id) => (state) => {
    if (state.gallery.entities) {
        const { images } = state.gallery.entities.find((p) => p.productId === id);
        return images;
    }
};

export default galleryReducer;
