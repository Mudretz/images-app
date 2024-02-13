import {axiosInstance} from '../shared/api/config';
import {Images} from '../shared/types';

export const imagesService = {
  getImages: async (): Promise<{
    photos: Images[];
  }> => {
    const response = await axiosInstance.get('/photos');
    return response.data;
  },
};
