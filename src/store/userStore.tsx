import { makeAutoObservable, runInAction } from "mobx";
import { userService } from "../service";
import { User } from "../shared/types";

class UserStore {
    user: User | null = null;
    isLoading = false;
    isError = false;

    constructor() {
        makeAutoObservable(this);
    }

    getUser = async (id: string) => {
        this.isLoading = true;
        try {
            const response = await userService.getUserById({
                id: id,
            });
            runInAction(() => {
                this.isLoading = false;
                this.user = response.user;
            });
        } catch (error) {
            this.isError = true;
            this.isLoading = false;
        }
    };
}

export default new UserStore();
