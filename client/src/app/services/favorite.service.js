import httpService from "./http.service";
import localStorageService from "./localStorage.service";

const favoriteEndpoint = "favorites/";

const favoriteService = {
    get: async () => {
        const { data } = await httpService.get(
            favoriteEndpoint + localStorageService.getUserId()
        );
        return data;
    },
    remove: async (payload) => {
        const { data } = await httpService.delete(
            favoriteEndpoint + localStorageService.getUserId() + `/${payload}`
        );
        return data;
    },
    clear: async () => {
        const { data } = await httpService.delete(
            favoriteEndpoint + localStorageService.getUserId()
        );
        return data;
    },
    add: async (payload) => {
        const { data } = await httpService.put(
            favoriteEndpoint + localStorageService.getUserId() + `/${payload.productId}`,
            payload
        );
        return data;
    }
};
export default favoriteService;
