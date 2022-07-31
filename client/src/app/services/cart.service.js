import httpService from "./http.service";
import localStorageService from "./localStorage.service";

const cartEndpoint = "cart/";

const cartService = {
    get: async () => {
        const { data } = await httpService.get(
            cartEndpoint + localStorageService.getUserId()
        );
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.put(
            cartEndpoint + payload._id,
            payload
        );
        return data;
    },
    remove: async (payload) => {
        const { data } = await httpService.delete(
            cartEndpoint + localStorageService.getUserId() + `/${payload}`
        );
        return data;
    },
    clear: async () => {
        const { data } = await httpService.delete(
            cartEndpoint + localStorageService.getUserId()
        );
        return data;
    },
    update: async (payload) => {
        const { data } = await httpService.patch(
            cartEndpoint + localStorageService.getUserId() + `/${payload.productId}`,
            payload
        );
        return data;
    },
    add: async (payload) => {
        const { data } = await httpService.put(
            cartEndpoint + localStorageService.getUserId() + `/${payload.productId}`,
            payload
        );
        return data;
    }
};
export default cartService;
