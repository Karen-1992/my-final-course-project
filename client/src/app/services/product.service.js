import httpService from "./http.service";

const productEndpoint = "products/";

const productService = {
    get: async () => {
        const { data } = await httpService.get(productEndpoint);
        return data;
    },
    getOneProduct: async (productId) => {
        const { data } = await httpService.get(productEndpoint +
            productId);
        return data;
    },
    create: async (payload) => {
        console.log(payload);
        const { data } = await httpService.post(
            productEndpoint,
            payload
        );
        return data;
    },
    remove: async (payload) => {
        const { data } = await httpService.delete(productEndpoint + payload);
        return data;
    },
    update: async (payload) => {
        const { data } = await httpService.patch(
            productEndpoint + payload._id,
            payload
        );
        return data;
    }
};
export default productService;
