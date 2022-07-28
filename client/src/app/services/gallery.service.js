import httpService from "./http.service";

const galleryEndpoint = "gallery/";

const galleryService = {
    get: async () => {
        const { data } = await httpService.get(galleryEndpoint);
        return data;
    }
};
export default galleryService;
