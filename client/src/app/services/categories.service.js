import httpService from "./http.service";

const categoriesEndpoint = "category/";

const categoriesService = {
    get: async () => {
        const { data } = await httpService.get(categoriesEndpoint);
        return data;
    }
};
export default categoriesService;
