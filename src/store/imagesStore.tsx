import {makeAutoObservable, runInAction} from 'mobx';
import {Images} from '../shared/types';
import {imagesService} from '../service';

class ImagesStore {
  images: Images[] = [];
  isLoading = false;
  isError = false;

  constructor() {
    makeAutoObservable(this);
  }

  getImages = async () => {
    try {
      this.isLoading = true;
      const response = await imagesService.getImages();
      console.log(response);
      runInAction(() => {
        this.images = response.photos;
        this.isLoading = false;
      });
    } catch {
      this.isLoading = false;
      this.isError = false;
    }
  };
}

export default new ImagesStore();
