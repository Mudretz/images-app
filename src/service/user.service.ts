import { axiosInstance } from "../shared/api/config";
import { User } from "../shared/types";

export const userService = {
    getUserById: async (data: {
        id: string;
    }): Promise<{
        user: User;
    }> => {
        const response = await axiosInstance.get(`/users/${data.id}`);
        return response.data;
    },
};
