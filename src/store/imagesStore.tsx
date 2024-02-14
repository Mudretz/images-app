import { makeAutoObservable, runInAction } from "mobx";
import { imagesService } from "../service";
import { Images } from "../shared/types";

class ImagesStore {
    images: Images[] = [];
    filterImages: Images[] = [];
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

    getFilterImages = (value: string) => {
        if (value) {
            this.filterImages = this.images.filter((item) =>
                item.title.toLowerCase().includes(value.trim().toLowerCase()),
            );
        } else {
            this.filterImages = [];
        }
    };
}

export default new ImagesStore();
