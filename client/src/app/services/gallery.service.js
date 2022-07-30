import httpService from "./http.service";

const galleryEndpoint = "gallery/";

const galleryService = {
    get: async () => {
        const { data } = await httpService.get(galleryEndpoint);
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.put(
            galleryEndpoint + payload._id,
            payload
        );
        return data;
    }
};
export default galleryService;
