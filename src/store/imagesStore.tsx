import { makeAutoObservable, runInAction } from "mobx";
import { imagesService } from "../service";
import { Images } from "../shared/types";

class ImagesStore {
    images: Images[] = [];
    image: Images | null = null;
    limit = 10;

    constructor() {
        makeAutoObservable(this);
    }

    increaseLimit = () => {
        this.limit += 10;
    };

    getImages = async () => {
        try {
            const response = await imagesService.getImages({
                limit: this.limit,
            });
            runInAction(() => {
                this.images = response.photos;
            });
        } catch (error) {}
    };

    getImage = async (id: string) => {
        try {
            const response = await imagesService.getImageById({
                id: id,
            });
            runInAction(() => {
                this.image = response.photo;
            });
        } catch (error) {}
    };
}

export default new ImagesStore();
