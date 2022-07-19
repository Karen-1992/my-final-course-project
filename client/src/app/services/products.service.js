import httpService from "./http.service";
import localStorageService from "./localStorage.service";

const productsEndpoint = "products/";

const productsService = {
    get: async () => {
        const { data } = await httpService.get(productsEndpoint);
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.put(
            productsEndpoint + payload._id,
            payload
        );
        return data;
    },
    getCurrentProducts: async () => {
        const { data } = await httpService.get(
            productsEndpoint + localStorageService.getProductsId()
        );
        return data;
    },
    update: async (payload) => {
        const { data } = await httpService.patch(
            productsEndpoint + localStorageService.getProductsId(),
            payload
        );
        return data;
    }
};
export default productsService;
