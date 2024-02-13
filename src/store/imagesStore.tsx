import { makeAutoObservable, runInAction } from "mobx";
import { imagesService } from "../service";
import { Images } from "../shared/types";

class ImagesStore {
    images: Images[] = [];
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
            // Обновляем состояние внутри runInAction, чтобы MobX мог отследить изменения
            runInAction(() => {
                this.images = response.photos;
            });
        } catch (error) {
            // Обработка ошибок, если это необходимо
            console.error("Failed to load images", error);
        }
    };
}

export default new ImagesStore();
