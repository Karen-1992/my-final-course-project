import httpService from "./http.service";
import localStorageService from "./localStorage.service";

const productEndpoint = "product/";

const productService = {
    get: async () => {
        const { data } = await httpService.get(productEndpoint);
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.put(
            productEndpoint + payload._id,
            payload
        );
        return data;
    },
    getCurrentProduct: async () => {
        const { data } = await httpService.get(
            productEndpoint + localStorageService.getProductId()
        );
        return data;
    },
    update: async (payload) => {
        const { data } = await httpService.patch(
            productEndpoint + localStorageService.getProductId(),
            payload
        );
        return data;
    }
};
export default productService;
