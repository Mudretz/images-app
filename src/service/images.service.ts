import { axiosInstance } from "../shared/api/config";
import { Images } from "../shared/types";

export const imagesService = {
    getImages: async (data: {
        limit: number;
    }): Promise<{
        photos: Images[];
    }> => {
        const response = await axiosInstance.get("/photos/", {
            params: {
                limit: data.limit,
            },
        });
        return response.data;
    },
    getImageById: async (data: {
        id: string;
    }): Promise<{
        photo: Images;
    }> => {
        const response = await axiosInstance.get(`/photos/${data.id}`);
        return response.data;
    },
    getImagesByUser: async (data: {
        id: string;
    }): Promise<{
        photo: Images;
    }> => {
        const response = await axiosInstance.get(`/users/${data.id}`);
        return response.data;
    },
};
