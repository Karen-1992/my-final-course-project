import httpService from "./http.service";

const categoriesEndpoint = "category/";

const categoriesService = {
    get: async () => {
        const { data } = await httpService.get(categoriesEndpoint);
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.put(
            categoriesEndpoint + payload._id,
            payload
        );
        return data;
    }
};
export default categoriesService;
