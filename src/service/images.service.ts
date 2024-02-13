import { axiosInstance } from "../shared/api/config";
import { Images } from "../shared/types";

export const imagesService = {
    getImages: async (data: {
        limit: number;
    }): Promise<{
        photos: Images[];
    }> => {
        const response = await axiosInstance.get("/photos", {
            params: {
                limit: data.limit,
            },
        });
        return response.data;
    },
};
