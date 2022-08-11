import httpService from "./http.service";
const commentEndpoint = "comment/";

const commentService = {
    createComment: async (payload) => {
        const { data } = await httpService.post(commentEndpoint, payload);
        return data;
    },
    getComments: async (productId) => {
        console.log(productId);
        const { data } = await httpService.get(commentEndpoint, {
            params: {
                orderBy: "productId",
                equalTo: `${productId}`
            }
        });
        return data;
    },
    removeComment: async (commentId) => {
        const { data } = await httpService.delete(commentEndpoint + commentId);
        return data;
    }
};
export default commentService;
