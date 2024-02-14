import { makeAutoObservable, runInAction } from "mobx";
import { imagesService } from "../service";
import { Images } from "../shared/types";

class ImagesStore {
    images: Images[] = [];
    image: Images | null = null;
    isLoading = false;
    isError = false;
    limit = 10;

    constructor() {
        makeAutoObservable(this);
    }

    increaseLimit = () => {
        this.limit += 10;
    };

    getImages = async () => {
        this.isLoading = true;
        try {
            const response = await imagesService.getImages({
                limit: this.limit,
            });
            runInAction(() => {
                this.images = response.photos;
                this.isLoading = false;
            });
        } catch (error) {
            this.isLoading = false;
            this.isError = true;
        }
    };

    getImage = async (id: string) => {
        this.isLoading = true;
        try {
            const response = await imagesService.getImageById({
                id: id,
            });
            runInAction(() => {
                this.image = response.photo;
                this.isLoading = false;
            });
        } catch (error) {
            this.isLoading = false;
            this.isError = true;
        }
    };
}

export default new ImagesStore();
